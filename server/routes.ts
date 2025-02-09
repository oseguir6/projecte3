import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, loginSchema } from "@shared/schema";
import session from "express-session";

declare module "express-session" {
  interface SessionData {
    isAuthenticated?: boolean;
  }
}

export function registerRoutes(app: Express): Server {
  // Setup session middleware
  app.use(
    session({
      secret: "portfolio-secret",
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }
    })
  );

  // Authentication middleware
  const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.isAuthenticated) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };

  // Track page visits
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
      storage.trackVisit(req.path);
    }
    next();
  });

  // Auth routes
  app.post("/api/login", async (req: Request, res: Response) => {
    try {
      const credentials = loginSchema.parse(req.body);
      const isValid = await storage.validateCredentials(credentials);

      if (isValid) {
        req.session.isAuthenticated = true;
        res.json({ message: "Login successful" });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(400).json({ message: "Invalid request" });
    }
  });

  app.post("/api/logout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: "Error logging out" });
      } else {
        res.json({ message: "Logged out successfully" });
      }
    });
  });

  // Protected routes
  app.get("/api/admin/contacts", requireAuth, async (req: Request, res: Response) => {
    const contacts = await storage.getContacts();
    res.json(contacts);
  });

  app.get("/api/admin/visits", requireAuth, async (req: Request, res: Response) => {
    const visits = await storage.getVisits();
    res.json(visits);
  });

  // Contact form route
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.json(contact);
    } catch (error) {
      res.status(400).json({ message: "Invalid contact data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}