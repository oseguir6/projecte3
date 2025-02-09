import { type Contact, type InsertContact, type Visit, type LoginCredentials } from "@shared/schema";

const ADMIN_CREDENTIALS = {
  username: "vwolf",
  password: "prueba"
};

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
    this.currentContactId = 1;
    this.currentVisitId = 1;
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
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async trackVisit(page: string): Promise<Visit> {
    const id = this.currentVisitId++;
    const visit: Visit = {
      id,
      page,
      timestamp: new Date()
    };
    this.visits.set(id, visit);
    return visit;
  }

  async getVisits(): Promise<Visit[]> {
    return Array.from(this.visits.values())
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }
}

export const storage = new MemStorage();