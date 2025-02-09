import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.json(contact);
    } catch (error) {
      res.status(400).json({ error: "Invalid contact data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
