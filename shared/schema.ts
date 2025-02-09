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

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true
}).extend({
  email: z.string().email(),
  message: z.string().min(10)
});

export const loginSchema = z.object({
  username: z.string(),
  password: z.string()
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;
export type Visit = typeof visits.$inferSelect;
export type LoginCredentials = z.infer<typeof loginSchema>;