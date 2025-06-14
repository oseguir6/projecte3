import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

export const visits = pgTable("visits", {
  id: serial("id").primaryKey(),
  page: text("page").notNull(),
  timestamp: timestamp("timestamp").defaultNow()
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  tags: text("tags").array().notNull(),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

export const technologies = pgTable("technologies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

export const siteContent = pgTable("site_content", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  image: text("image").notNull(),
  tags: text("tags").array().notNull(),
  published: boolean("published").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow()
});

export const timelineItems = pgTable("timeline_items", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'work', 'education', 'project', 'achievement'
  title: text("title").notNull(),
  organization: text("organization").notNull(),
  location: text("location"),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  description: text("description").notNull(),
  technologies: text("technologies").array(),
  current: boolean("current").notNull().default(false),
  sortOrder: serial("sort_order"),
  createdAt: timestamp("created_at").defaultNow()
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true
}).extend({
  email: z.string().email(),
  message: z.string().min(10)
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true
}).extend({
  tags: z.array(z.string()),
  image: z.string().url()
});

export const insertTechnologySchema = createInsertSchema(technologies).omit({
  id: true,
  createdAt: true
}).extend({
  icon: z.string()
});

export const insertSiteContentSchema = createInsertSchema(siteContent).omit({
  id: true,
  createdAt: true
});

export const loginSchema = z.object({
  username: z.string(),
  password: z.string()
});

export const insertBlogSchema = createInsertSchema(blogs).omit({
  id: true,
  createdAt: true
}).extend({
  tags: z.array(z.string()),
  image: z.string().url(),
  published: z.boolean().default(false)
});

export const insertTimelineItemSchema = createInsertSchema(timelineItems).omit({
  id: true,
  createdAt: true,
  sortOrder: true
}).extend({
  type: z.enum(['work', 'education', 'project', 'achievement']),
  technologies: z.array(z.string()).optional(),
  current: z.boolean().default(false)
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;
export type Visit = typeof visits.$inferSelect;
export type LoginCredentials = z.infer<typeof loginSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertTechnology = z.infer<typeof insertTechnologySchema>;
export type Technology = typeof technologies.$inferSelect;
export type InsertSiteContent = z.infer<typeof insertSiteContentSchema>;
export type SiteContent = typeof siteContent.$inferSelect;
export type InsertBlog = z.infer<typeof insertBlogSchema>;
export type Blog = typeof blogs.$inferSelect;
export type InsertTimelineItem = z.infer<typeof insertTimelineItemSchema>;
export type TimelineItem = typeof timelineItems.$inferSelect;

export const defaultSiteContent = [
  { key: "hero.terminal.text", value: "dev@portfolio:~$" },
  { key: "hero.title", value: "Hola, soy Dev" },
  { key: "hero.subtitle", value: "Desarrollador Full Stack" },
  { key: "hero.description", value: "Me especializo en crear experiencias web únicas y funcionales." },
  { key: "hero.button.projects", value: "View Projects" },
  { key: "hero.button.contact", value: "Contact Me" },
  { key: "technologies.title", value: "Technologies" },
  { key: "technologies.subtitle", value: "Tech Stack" },
  { key: "technologies.description", value: "Here are some of the technologies I work with:" },
  { key: "technologies.list", value: "JavaScript,TypeScript,React,Node.js,Python" },
  { key: "projects.title", value: "Featured Projects" },
  { key: "projects.subtitle", value: "Recent Work" },
  { key: "blog.title", value: "Latest Blog Posts" },
  { key: "blog.subtitle", value: "Insights & Tutorials" },
  { key: "about.title", value: "Sobre Mí" },
  { key: "about.subtitle", value: "Mi Historia" },
  { key: "about.description", value: "Soy un desarrollador apasionado por crear soluciones innovadoras." },
  { key: "about.experience", value: "Mi experiencia incluye el desarrollo de aplicaciones web modernas y escalables." },
  { key: "about.skills", value: "React, TypeScript, Node.js, PostgreSQL, AWS" },
  { key: "about.education", value: "Formación continua en tecnologías web modernas" }
];