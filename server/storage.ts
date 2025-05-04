import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { eq } from "drizzle-orm";
import {
  users,
  tasks,
  columns,
  dailyPlans,
  timeBlocks,
  User,
  Task,
  Column,
  DailyPlan,
  TimeBlock,
  InsertUser,
  InsertTask,
  InsertColumn,
  InsertDailyPlan,
  InsertTimeBlock,
} from "../shared/schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);

export interface IStorage {
  // Users
  getUser(id: number): Promise<User>;
  getUserByGoogleId(googleId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User>;

  // Tasks (ToDoTracker)
  getTasks(userId: number): Promise<Task[]>;
  getTaskById(id: number): Promise<Task | undefined>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: number, task: Partial<InsertTask>): Promise<Task>;
  deleteTask(id: number): Promise<void>;

  // Columns (ToDoTracker)
  getColumns(): Promise<Column[]>;
  createColumn(column: InsertColumn): Promise<Column>;
  updateColumn(id: number, column: Partial<InsertColumn>): Promise<Column>;
  deleteColumn(id: number): Promise<void>;

  // Daily Plans (TimeBlocker)
  getDailyPlans(userId: number): Promise<DailyPlan[]>;
  getDailyPlanById(id: number): Promise<DailyPlan | undefined>;
  createDailyPlan(plan: InsertDailyPlan): Promise<DailyPlan>;
  updateDailyPlan(id: number, plan: Partial<InsertDailyPlan>): Promise<DailyPlan>;
  deleteDailyPlan(id: number): Promise<void>;

  // Time Blocks (TimeBlocker)
  getTimeBlocks(dailyPlanId: number): Promise<TimeBlock[]>;
  getTimeBlockById(id: number): Promise<TimeBlock | undefined>;
  createTimeBlock(block: InsertTimeBlock): Promise<TimeBlock>;
  updateTimeBlock(id: number, block: Partial<InsertTimeBlock>): Promise<TimeBlock>;
  deleteTimeBlock(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: number): Promise<User> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    if (!user) throw new Error("User not found");
    return user;
  }

  async getUserByGoogleId(googleId: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.googleId, googleId));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }

  async updateUser(id: number, user: Partial<InsertUser>): Promise<User> {
    const [updatedUser] = await db
      .update(users)
      .set(user)
      .where(eq(users.id, id))
      .returning();
    if (!updatedUser) throw new Error("User not found");
    return updatedUser;
  }

  // Tasks (ToDoTracker)
  async getTasks(userId: number): Promise<Task[]> {
    return db.select().from(tasks).where(eq(tasks.userId, userId));
  }

  async getTaskById(id: number): Promise<Task | undefined> {
    const [task] = await db.select().from(tasks).where(eq(tasks.id, id));
    return task;
  }

  async createTask(task: InsertTask): Promise<Task> {
    const [newTask] = await db.insert(tasks).values(task).returning();
    return newTask;
  }

  async updateTask(id: number, task: Partial<InsertTask>): Promise<Task> {
    const [updatedTask] = await db
      .update(tasks)
      .set(task)
      .where(eq(tasks.id, id))
      .returning();
    if (!updatedTask) throw new Error("Task not found");
    return updatedTask;
  }

  async deleteTask(id: number): Promise<void> {
    await db.delete(tasks).where(eq(tasks.id, id));
  }

  // Columns (ToDoTracker)
  async getColumns(): Promise<Column[]> {
    return db.select().from(columns).orderBy(columns.order);
  }

  async createColumn(column: InsertColumn): Promise<Column> {
    const [newColumn] = await db.insert(columns).values(column).returning();
    return newColumn;
  }

  async updateColumn(id: number, column: Partial<InsertColumn>): Promise<Column> {
    const [updatedColumn] = await db
      .update(columns)
      .set(column)
      .where(eq(columns.id, id))
      .returning();
    if (!updatedColumn) throw new Error("Column not found");
    return updatedColumn;
  }

  async deleteColumn(id: number): Promise<void> {
    await db.delete(columns).where(eq(columns.id, id));
  }

  // Daily Plans (TimeBlocker)
  async getDailyPlans(userId: number): Promise<DailyPlan[]> {
    return db.select().from(dailyPlans).where(eq(dailyPlans.userId, userId));
  }

  async getDailyPlanById(id: number): Promise<DailyPlan | undefined> {
    const [plan] = await db.select().from(dailyPlans).where(eq(dailyPlans.id, id));
    return plan;
  }

  async createDailyPlan(plan: InsertDailyPlan): Promise<DailyPlan> {
    const [newPlan] = await db.insert(dailyPlans).values(plan).returning();
    return newPlan;
  }

  async updateDailyPlan(id: number, plan: Partial<InsertDailyPlan>): Promise<DailyPlan> {
    const [updatedPlan] = await db
      .update(dailyPlans)
      .set(plan)
      .where(eq(dailyPlans.id, id))
      .returning();
    if (!updatedPlan) throw new Error("Daily plan not found");
    return updatedPlan;
  }

  async deleteDailyPlan(id: number): Promise<void> {
    await db.delete(dailyPlans).where(eq(dailyPlans.id, id));
  }

  // Time Blocks (TimeBlocker)
  async getTimeBlocks(dailyPlanId: number): Promise<TimeBlock[]> {
    return db.select().from(timeBlocks).where(eq(timeBlocks.dailyPlanId, dailyPlanId));
  }

  async getTimeBlockById(id: number): Promise<TimeBlock | undefined> {
    const [block] = await db.select().from(timeBlocks).where(eq(timeBlocks.id, id));
    return block;
  }

  async createTimeBlock(block: InsertTimeBlock): Promise<TimeBlock> {
    const [newBlock] = await db.insert(timeBlocks).values(block).returning();
    return newBlock;
  }

  async updateTimeBlock(id: number, block: Partial<InsertTimeBlock>): Promise<TimeBlock> {
    const [updatedBlock] = await db
      .update(timeBlocks)
      .set(block)
      .where(eq(timeBlocks.id, id))
      .returning();
    if (!updatedBlock) throw new Error("Time block not found");
    return updatedBlock;
  }

  async deleteTimeBlock(id: number): Promise<void> {
    await db.delete(timeBlocks).where(eq(timeBlocks.id, id));
  }
}

export const storage = new DatabaseStorage(); 