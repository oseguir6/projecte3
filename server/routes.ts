import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, loginSchema, insertProjectSchema, insertTechnologySchema, insertSiteContentSchema, insertBlogSchema, insertTimelineItemSchema } from "@shared/schema";
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

  // Project routes
  app.get("/api/projects", async (req: Request, res: Response) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get("/api/projects/:id", async (req: Request, res: Response) => {
    const project = await storage.getProject(Number(req.params.id));
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  });

  app.post("/api/admin/projects", requireAuth, async (req: Request, res: Response) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(projectData);
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ message: "Invalid project data" });
    }
  });

  app.put("/api/admin/projects/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      const project = await storage.updateProject(Number(req.params.id), projectData);
      res.json(project);
    } catch (error) {
      if (error instanceof Error && error.message === "Project not found") {
        res.status(404).json({ message: "Project not found" });
      } else {
        res.status(400).json({ message: "Invalid project data" });
      }
    }
  });

  app.delete("/api/admin/projects/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      await storage.deleteProject(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error && error.message === "Project not found") {
        res.status(404).json({ message: "Project not found" });
      } else {
        res.status(500).json({ message: "Error deleting project" });
      }
    }
  });

  // Technology routes
  app.get("/api/technologies", async (req: Request, res: Response) => {
    const technologies = await storage.getTechnologies();
    res.json(technologies);
  });

  app.get("/api/technologies/:id", async (req: Request, res: Response) => {
    const technology = await storage.getTechnology(Number(req.params.id));
    if (!technology) {
      return res.status(404).json({ message: "Technology not found" });
    }
    res.json(technology);
  });

  app.post("/api/admin/technologies", requireAuth, async (req: Request, res: Response) => {
    try {
      const technologyData = insertTechnologySchema.parse(req.body);
      const technology = await storage.createTechnology(technologyData);
      res.status(201).json(technology);
    } catch (error) {
      res.status(400).json({ message: "Invalid technology data" });
    }
  });

  app.put("/api/admin/technologies/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const technologyData = insertTechnologySchema.parse(req.body);
      const technology = await storage.updateTechnology(Number(req.params.id), technologyData);
      res.json(technology);
    } catch (error) {
      if (error instanceof Error && error.message === "Technology not found") {
        res.status(404).json({ message: "Technology not found" });
      } else {
        res.status(400).json({ message: "Invalid technology data" });
      }
    }
  });

  app.delete("/api/admin/technologies/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      await storage.deleteTechnology(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error && error.message === "Technology not found") {
        res.status(404).json({ message: "Technology not found" });
      } else {
        res.status(500).json({ message: "Error deleting technology" });
      }
    }
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

  // Blog routes
  app.get("/api/blogs", async (req: Request, res: Response) => {
    try {
      const blogs = await storage.getBlogs();
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ message: "Error getting blogs" });
    }
  });

  app.post("/api/admin/blogs", requireAuth, async (req: Request, res: Response) => {
    try {
      const blogData = insertBlogSchema.parse(req.body);
      const blog = await storage.createBlog(blogData);
      res.status(201).json(blog);
    } catch (error) {
      res.status(400).json({ message: "Invalid blog data" });
    }
  });

  app.put("/api/admin/blogs/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const blogData = insertBlogSchema.parse(req.body);
      const blog = await storage.updateBlog(Number(req.params.id), blogData);
      res.json(blog);
    } catch (error) {
      if (error instanceof Error && error.message === "Blog not found") {
        res.status(404).json({ message: "Blog not found" });
      } else {
        res.status(400).json({ message: "Invalid blog data" });
      }
    }
  });

  app.delete("/api/admin/blogs/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      await storage.deleteBlog(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error && error.message === "Blog not found") {
        res.status(404).json({ message: "Blog not found" });
      } else {
        res.status(500).json({ message: "Error deleting blog" });
      }
    }
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

  // Site Content routes
  app.get("/api/site-content", async (req: Request, res: Response) => {
    const content = await storage.getAllSiteContent();
    res.json(content);
  });

  app.get("/api/site-content/:key", async (req: Request, res: Response) => {
    const value = await storage.getSiteContent(req.params.key);
    res.json({ value });
  });

  // Actualizar la ruta PUT de site-content
  app.put("/api/admin/site-content/:key", requireAuth, async (req: Request, res: Response) => {
    try {
      const contentData = insertSiteContentSchema.parse({
        key: req.params.key,
        value: req.body.value
      });
      const content = await storage.updateSiteContent(contentData.key, contentData.value);
      res.json(content);
    } catch (error) {
      console.error('Error updating site content:', error);
      res.status(400).json({ message: "Invalid content data" });
    }
  });

  // Timeline routes
  app.get("/api/timeline", async (req: Request, res: Response) => {
    try {
      const items = await storage.getTimelineItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Error getting timeline items" });
    }
  });

  app.post("/api/admin/timeline", requireAuth, async (req: Request, res: Response) => {
    try {
      const itemData = insertTimelineItemSchema.parse(req.body);
      const item = await storage.createTimelineItem(itemData);
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ message: "Invalid timeline item data" });
    }
  });

  app.put("/api/admin/timeline/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const itemData = insertTimelineItemSchema.parse(req.body);
      const item = await storage.updateTimelineItem(Number(req.params.id), itemData);
      res.json(item);
    } catch (error) {
      if (error instanceof Error && error.message === "Timeline item not found") {
        res.status(404).json({ message: "Timeline item not found" });
      } else {
        res.status(400).json({ message: "Invalid timeline item data" });
      }
    }
  });

  app.delete("/api/admin/timeline/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      await storage.deleteTimelineItem(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error && error.message === "Timeline item not found") {
        res.status(404).json({ message: "Timeline item not found" });
      } else {
        res.status(500).json({ message: "Error deleting timeline item" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}