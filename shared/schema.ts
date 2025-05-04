import { pgTable, text, serial, integer, boolean, timestamp, varchar, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Unified User table that supports both applications
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  googleId: text("google_id").notNull().unique(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  // TimeBlocker specific fields
  credentialsInfo: jsonb("credentials_info"), // For Google Calendar access
  selectedCalendars: jsonb("selected_calendars"), // Array of calendar IDs
  createdAt: timestamp("created_at").defaultNow(),
});

// ToDoTracker specific tables
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const columns = pgTable("columns", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  order: integer("order").notNull(),
});

// TimeBlocker specific tables
export const dailyPlans = pgTable("daily_plans", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  date: timestamp("date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const timeBlocks = pgTable("time_blocks", {
  id: serial("id").primaryKey(),
  dailyPlanId: integer("daily_plan_id").references(() => dailyPlans.id),
  title: text("title").notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  category: text("category"),
  priority: text("priority"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Schema types for type safety
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Task = typeof tasks.$inferSelect;
export type InsertTask = typeof tasks.$inferInsert;
export type Column = typeof columns.$inferSelect;
export type InsertColumn = typeof columns.$inferInsert;
export type DailyPlan = typeof dailyPlans.$inferSelect;
export type InsertDailyPlan = typeof dailyPlans.$inferInsert;
export type TimeBlock = typeof timeBlocks.$inferSelect;
export type InsertTimeBlock = typeof timeBlocks.$inferInsert;

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users);
export const insertTaskSchema = createInsertSchema(tasks);
export const insertColumnSchema = createInsertSchema(columns);
export const insertDailyPlanSchema = createInsertSchema(dailyPlans);
export const insertTimeBlockSchema = createInsertSchema(timeBlocks); 