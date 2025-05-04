import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { users, dailyPlans, timeBlocks } from "../shared/schema";
import { eq } from "drizzle-orm";

// Primary database (ToDoTracker)
const primaryPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const primaryDb = drizzle(primaryPool);

// Secondary database (TimeBlocker)
const secondaryPool = new Pool({
  connectionString: process.env.SECONDARY_DATABASE_URL,
});
const secondaryDb = drizzle(secondaryPool);

async function migrateData() {
  try {
    console.log("Starting data migration...");

    // 1. Get all users from TimeBlocker
    const timeBlockerUsers = await secondaryDb.select().from(users);
    console.log(`Found ${timeBlockerUsers.length} users to migrate`);

    for (const user of timeBlockerUsers) {
      // 2. Check if user exists in primary database
      const existingUser = await primaryDb
        .select()
        .from(users)
        .where(eq(users.googleId, user.googleId))
        .limit(1);

      if (existingUser.length === 0) {
        // 3. Insert user into primary database
        const [newUser] = await primaryDb
          .insert(users)
          .values({
            googleId: user.googleId,
            email: user.email,
            name: user.name,
            credentialsInfo: user.credentialsInfo,
            selectedCalendars: user.selectedCalendars,
          })
          .returning();

        console.log(`Migrated user: ${user.email}`);

        // 4. Get user's daily plans
        const dailyPlans = await secondaryDb
          .select()
          .from(dailyPlans)
          .where(eq(dailyPlans.userId, user.id));

        for (const plan of dailyPlans) {
          // 5. Insert daily plan with new user ID
          const [newPlan] = await primaryDb
            .insert(dailyPlans)
            .values({
              userId: newUser.id,
              date: plan.date,
            })
            .returning();

          // 6. Get time blocks for this plan
          const timeBlocks = await secondaryDb
            .select()
            .from(timeBlocks)
            .where(eq(timeBlocks.dailyPlanId, plan.id));

          // 7. Insert time blocks with new plan ID
          for (const block of timeBlocks) {
            await primaryDb.insert(timeBlocks).values({
              dailyPlanId: newPlan.id,
              title: block.title,
              startTime: block.startTime,
              endTime: block.endTime,
              category: block.category,
              priority: block.priority,
            });
          }
        }
      } else {
        console.log(`User already exists: ${user.email}`);
      }
    }

    console.log("Data migration completed successfully!");
  } catch (error) {
    console.error("Error during migration:", error);
  } finally {
    await primaryPool.end();
    await secondaryPool.end();
  }
}

migrateData(); 