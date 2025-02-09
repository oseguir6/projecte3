import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
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

export const loginSchema = z.object({
  username: z.string(),
  password: z.string()
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;
export type Visit = typeof visits.$inferSelect;
export type LoginCredentials = z.infer<typeof loginSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertTechnology = z.infer<typeof insertTechnologySchema>;
export type Technology = typeof technologies.$inferSelect;