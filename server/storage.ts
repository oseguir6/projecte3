import { type Contact, type InsertContact, type Visit, type LoginCredentials, type Project, type InsertProject, type Technology, type InsertTechnology, type SiteContent, type InsertSiteContent } from "@shared/schema";
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
const SITE_CONTENT_FILE = path.join(DATA_DIR, "site_content.json");
const BLOGS_FILE = path.join(DATA_DIR, "blogs.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

const DEFAULT_SITE_CONTENT = {
  "hero.title": "Hola, soy Dev",
  "hero.subtitle": "Desarrollador Full Stack",
  "hero.description": "Me especializo en crear aplicaciones web modernas y escalables",
  "hero.button.projects": "View Projects",
  "hero.button.contact": "Contact Me",
  "hero.terminal.text": "dev@portfolio:~$",
  "technologies.title": "Tecnologías con las que trabajo",
  "technologies.subtitle": "Tech Stack",
  "technologies.list": "JavaScript,TypeScript,React,Node.js,PostgreSQL,Docker,AWS,Linux",
  "projects.title": "Proyectos Destacados",
  "projects.subtitle": "Algunos de mis trabajos más recientes",
  "contact.title": "Contacto",
  "contact.description": "¿Tienes un proyecto en mente? ¡Hablemos!"
};

// Added Blog interface
export interface IBlog {
    id: number;
    title: string;
    content: string;
    image: string;
    tags: string[];
    published: boolean;
    createdAt: Date;
}

export interface InsertBlog {
    title: string;
    content: string;
    image: string;
    tags: string[];
    published: boolean;
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
  // Site Content
  getSiteContent(key: string): Promise<string>;
  updateSiteContent(key: string, value: string): Promise<SiteContent>;
  getAllSiteContent(): Promise<SiteContent[]>;
  // Blog operations
  createBlog(blog: InsertBlog): Promise<IBlog>;
  updateBlog(id: number, blog: InsertBlog): Promise<IBlog>;
  deleteBlog(id: number): Promise<void>;
  getBlogs(): Promise<IBlog[]>;
  getBlog(id: number): Promise<IBlog | null>;
}

export class MemStorage implements IStorage {
  private contacts: Map<number, Contact>;
  private visits: Map<number, Visit>;
  private projects: Map<number, Project>;
  private technologies: Map<number, Technology>;
  private siteContent: Map<string, SiteContent>;
  private blogs: Map<number, IBlog>;
  private currentContactId: number;
  private currentVisitId: number;
  private currentProjectId: number;
  private currentTechnologyId: number;
  private currentSiteContentId: number;
  private currentBlogId: number;

  constructor() {
    this.contacts = new Map();
    this.visits = new Map();
    this.projects = new Map();
    this.technologies = new Map();
    this.siteContent = new Map();
    this.blogs = new Map();
    this.loadData();
    this.currentContactId = Math.max(1, ...Array.from(this.contacts.keys()), 0) + 1;
    this.currentVisitId = Math.max(1, ...Array.from(this.visits.keys()), 0) + 1;
    this.currentProjectId = Math.max(1, ...Array.from(this.projects.keys()), 0) + 1;
    this.currentTechnologyId = Math.max(1, ...Array.from(this.technologies.keys()), 0) + 1;
    this.currentSiteContentId = Math.max(1, ...Array.from(this.siteContent.keys()).map(Number), 0) + 1;
    this.currentBlogId = Math.max(1, ...Array.from(this.blogs.keys()), 0) + 1;
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

      if (fs.existsSync(SITE_CONTENT_FILE)) {
        const contentData = JSON.parse(fs.readFileSync(SITE_CONTENT_FILE, 'utf-8'));
        contentData.forEach((content: SiteContent) => {
          content.createdAt = new Date(content.createdAt!);
          this.siteContent.set(content.key, content);
        });
      } else {
        // Initialize with default content if file doesn't exist
        Object.entries(DEFAULT_SITE_CONTENT).forEach(([key, value]) => {
          const content: SiteContent = {
            id: this.currentSiteContentId++,
            key,
            value,
            createdAt: new Date()
          };
          this.siteContent.set(key, content);
        });
        this.saveData();
      }
      if (fs.existsSync(BLOGS_FILE)) {
        const blogsData = JSON.parse(fs.readFileSync(BLOGS_FILE, 'utf-8'));
        blogsData.forEach((blog: IBlog) => {
          blog.createdAt = new Date(blog.createdAt!);
          this.blogs.set(blog.id, blog);
        });
      }
    } catch (error) {
      console.error('Error loading data:', error);
      // If there's an error, initialize with default content
      Object.entries(DEFAULT_SITE_CONTENT).forEach(([key, value]) => {
        if (!this.siteContent.has(key)) {
          const content: SiteContent = {
            id: this.currentSiteContentId++,
            key,
            value,
            createdAt: new Date()
          };
          this.siteContent.set(key, content);
        }
      });
      this.saveData();
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
      fs.writeFileSync(
        SITE_CONTENT_FILE,
        JSON.stringify(Array.from(this.siteContent.values()), null, 2)
      );
      fs.writeFileSync(
        BLOGS_FILE,
        JSON.stringify(Array.from(this.blogs.values()), null, 2)
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

  // Site Content methods
  async getSiteContent(key: string): Promise<string> {
    const content = this.siteContent.get(key);
    return content?.value || DEFAULT_SITE_CONTENT[key] || '';
  }

  async updateSiteContent(key: string, value: string): Promise<SiteContent> {
    let content = this.siteContent.get(key);

    if (!content) {
      content = {
        id: this.currentSiteContentId++,
        key,
        value,
        createdAt: new Date()
      };
    } else {
      content = {
        ...content,
        value
      };
    }

    this.siteContent.set(key, content);
    this.saveData();
    return content;
  }

  async getAllSiteContent(): Promise<SiteContent[]> {
    // Ensure all default keys exist
    Object.entries(DEFAULT_SITE_CONTENT).forEach(([key, defaultValue]) => {
      if (!this.siteContent.has(key)) {
        const content: SiteContent = {
          id: this.currentSiteContentId++,
          key,
          value: defaultValue,
          createdAt: new Date()
        };
        this.siteContent.set(key, content);
      }
    });
    return Array.from(this.siteContent.values());
  }

  async createBlog(blog: InsertBlog): Promise<IBlog> {
    const id = this.currentBlogId++;
    const newBlog: IBlog = {
      ...blog,
      id,
      createdAt: new Date()
    };
    this.blogs.set(id, newBlog);
    this.saveData();
    return newBlog;
  }

  async updateBlog(id: number, blog: InsertBlog): Promise<IBlog> {
    const existingBlog = this.blogs.get(id);
    if (!existingBlog) {
      throw new Error('Blog not found');
    }

    const updatedBlog: IBlog = {
      ...blog,
      id,
      createdAt: existingBlog.createdAt
    };
    this.blogs.set(id, updatedBlog);
    this.saveData();
    return updatedBlog;
  }

  async deleteBlog(id: number): Promise<void> {
    if (!this.blogs.has(id)) {
      throw new Error('Blog not found');
    }
    this.blogs.delete(id);
    this.saveData();
  }

  async getBlogs(): Promise<IBlog[]> {
    return Array.from(this.blogs.values())
      .sort((a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0));
  }

  async getBlog(id: number): Promise<IBlog | null> {
    return this.blogs.get(id) || null;
  }
}

export const storage = new MemStorage();