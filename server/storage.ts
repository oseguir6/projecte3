import { type Contact, type InsertContact, type Visit, type LoginCredentials, type Project, type InsertProject, type Technology, type InsertTechnology } from "@shared/schema";
import fs from "fs";
import path from "path";

const ADMIN_CREDENTIALS = {
  username: "vwolf",
  password: "prueba"
};

// Ensure data directory exists
const DATA_DIR = path.join(process.cwd(), "data");
const CONTACTS_FILE = path.join(DATA_DIR, "contacts.json");
const VISITS_FILE = path.join(DATA_DIR, "visits.json");
const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");
const TECHNOLOGIES_FILE = path.join(DATA_DIR, "technologies.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

export interface IStorage {
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  validateCredentials(credentials: LoginCredentials): Promise<boolean>;
  trackVisit(page: string): Promise<Visit>;
  getVisits(): Promise<Visit[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: InsertProject): Promise<Project>;
  deleteProject(id: number): Promise<void>;
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | null>;
  createTechnology(technology: InsertTechnology): Promise<Technology>;
  updateTechnology(id: number, technology: InsertTechnology): Promise<Technology>;
  deleteTechnology(id: number): Promise<void>;
  getTechnologies(): Promise<Technology[]>;
  getTechnology(id: number): Promise<Technology | null>;
}

export class MemStorage implements IStorage {
  private contacts: Map<number, Contact>;
  private visits: Map<number, Visit>;
  private projects: Map<number, Project>;
  private technologies: Map<number, Technology>;
  private currentContactId: number;
  private currentVisitId: number;
  private currentProjectId: number;
  private currentTechnologyId: number;

  constructor() {
    this.contacts = new Map();
    this.visits = new Map();
    this.projects = new Map();
    this.technologies = new Map();
    this.loadData();
    this.currentContactId = Math.max(1, ...Array.from(this.contacts.keys()), 0) + 1;
    this.currentVisitId = Math.max(1, ...Array.from(this.visits.keys()), 0) + 1;
    this.currentProjectId = Math.max(1, ...Array.from(this.projects.keys()), 0) + 1;
    this.currentTechnologyId = Math.max(1, ...Array.from(this.technologies.keys()), 0) + 1;
  }

  private loadData() {
    try {
      if (fs.existsSync(CONTACTS_FILE)) {
        const contactsData = JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf-8'));
        contactsData.forEach((contact: Contact) => {
          contact.createdAt = new Date(contact.createdAt!);
          this.contacts.set(contact.id, contact);
        });
      }

      if (fs.existsSync(VISITS_FILE)) {
        const visitsData = JSON.parse(fs.readFileSync(VISITS_FILE, 'utf-8'));
        visitsData.forEach((visit: Visit) => {
          visit.timestamp = new Date(visit.timestamp!);
          this.visits.set(visit.id, visit);
        });
      }

      if (fs.existsSync(PROJECTS_FILE)) {
        const projectsData = JSON.parse(fs.readFileSync(PROJECTS_FILE, 'utf-8'));
        projectsData.forEach((project: Project) => {
          project.createdAt = new Date(project.createdAt!);
          this.projects.set(project.id, project);
        });
      }

      if (fs.existsSync(TECHNOLOGIES_FILE)) {
        const technologiesData = JSON.parse(fs.readFileSync(TECHNOLOGIES_FILE, 'utf-8'));
        technologiesData.forEach((technology: Technology) => {
          technology.createdAt = new Date(technology.createdAt!);
          this.technologies.set(technology.id, technology);
        });
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  private saveData() {
    try {
      fs.writeFileSync(
        CONTACTS_FILE,
        JSON.stringify(Array.from(this.contacts.values()), null, 2)
      );
      fs.writeFileSync(
        VISITS_FILE,
        JSON.stringify(Array.from(this.visits.values()), null, 2)
      );
      fs.writeFileSync(
        PROJECTS_FILE,
        JSON.stringify(Array.from(this.projects.values()), null, 2)
      );
      fs.writeFileSync(
        TECHNOLOGIES_FILE,
        JSON.stringify(Array.from(this.technologies.values()), null, 2)
      );
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  async validateCredentials(credentials: LoginCredentials): Promise<boolean> {
    return credentials.username === ADMIN_CREDENTIALS.username && 
           credentials.password === ADMIN_CREDENTIALS.password;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    this.saveData();
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values())
      .sort((a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0));
  }

  async trackVisit(page: string): Promise<Visit> {
    const id = this.currentVisitId++;
    const visit: Visit = {
      id,
      page,
      timestamp: new Date()
    };
    this.visits.set(id, visit);
    this.saveData();
    return visit;
  }

  async getVisits(): Promise<Visit[]> {
    return Array.from(this.visits.values())
      .sort((a, b) => (b.timestamp?.getTime() ?? 0) - (a.timestamp?.getTime() ?? 0));
  }

  async createProject(project: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const newProject: Project = {
      ...project,
      id,
      createdAt: new Date()
    };
    this.projects.set(id, newProject);
    this.saveData();
    return newProject;
  }

  async updateProject(id: number, project: InsertProject): Promise<Project> {
    const existingProject = this.projects.get(id);
    if (!existingProject) {
      throw new Error('Project not found');
    }

    const updatedProject: Project = {
      ...project,
      id,
      createdAt: existingProject.createdAt
    };
    this.projects.set(id, updatedProject);
    this.saveData();
    return updatedProject;
  }

  async deleteProject(id: number): Promise<void> {
    if (!this.projects.has(id)) {
      throw new Error('Project not found');
    }
    this.projects.delete(id);
    this.saveData();
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values())
      .sort((a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0));
  }

  async getProject(id: number): Promise<Project | null> {
    return this.projects.get(id) || null;
  }

  async createTechnology(technology: InsertTechnology): Promise<Technology> {
    const id = this.currentTechnologyId++;
    const newTechnology: Technology = {
      ...technology,
      id,
      createdAt: new Date()
    };
    this.technologies.set(id, newTechnology);
    this.saveData();
    return newTechnology;
  }

  async updateTechnology(id: number, technology: InsertTechnology): Promise<Technology> {
    const existingTechnology = this.technologies.get(id);
    if (!existingTechnology) {
      throw new Error('Technology not found');
    }

    const updatedTechnology: Technology = {
      ...technology,
      id,
      createdAt: existingTechnology.createdAt
    };
    this.technologies.set(id, updatedTechnology);
    this.saveData();
    return updatedTechnology;
  }

  async deleteTechnology(id: number): Promise<void> {
    if (!this.technologies.has(id)) {
      throw new Error('Technology not found');
    }
    this.technologies.delete(id);
    this.saveData();
  }

  async getTechnologies(): Promise<Technology[]> {
    return Array.from(this.technologies.values())
      .sort((a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0));
  }

  async getTechnology(id: number): Promise<Technology | null> {
    return this.technologies.get(id) || null;
  }
}

export const storage = new MemStorage();