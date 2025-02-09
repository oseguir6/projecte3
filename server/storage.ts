import { type Contact, type InsertContact, type Visit, type LoginCredentials } from "@shared/schema";
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

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

export interface IStorage {
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  validateCredentials(credentials: LoginCredentials): Promise<boolean>;
  trackVisit(page: string): Promise<Visit>;
  getVisits(): Promise<Visit[]>;
}

export class MemStorage implements IStorage {
  private contacts: Map<number, Contact>;
  private visits: Map<number, Visit>;
  private currentContactId: number;
  private currentVisitId: number;

  constructor() {
    this.contacts = new Map();
    this.visits = new Map();
    this.loadData();
    this.currentContactId = Math.max(1, ...Array.from(this.contacts.keys()), 0) + 1;
    this.currentVisitId = Math.max(1, ...Array.from(this.visits.keys()), 0) + 1;
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
}

export const storage = new MemStorage();