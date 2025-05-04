import express from "express";
import session from "express-session";
import { passport } from "./auth";
import { storage } from "./storage";
import { isAuthenticated } from "./middleware";
import { User } from "../shared/schema";

const app = express();

// Middleware
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Auth routes
app.get("/auth/google", passport.authenticate("google", {
  scope: ["profile", "email", "https://www.googleapis.com/auth/calendar.readonly"],
}));

app.get("/google_login/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

app.get("/api/auth/user", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

app.post("/api/auth/logout", (req, res) => {
  req.logout(() => {
    res.json({ success: true });
  });
});

// ToDoTracker routes
app.get("/api/tasks", isAuthenticated, async (req: any, res) => {
  const tasks = await storage.getTasks(req.user.id);
  res.json(tasks);
});

app.post("/api/tasks", isAuthenticated, async (req: any, res) => {
  const task = await storage.createTask({
    ...req.body,
    userId: req.user.id,
  });
  res.json(task);
});

app.put("/api/tasks/:id", isAuthenticated, async (req: any, res) => {
  const task = await storage.updateTask(parseInt(req.params.id), req.body);
  res.json(task);
});

app.delete("/api/tasks/:id", isAuthenticated, async (req: any, res) => {
  await storage.deleteTask(parseInt(req.params.id));
  res.json({ success: true });
});

// TimeBlocker routes
app.get("/api/daily-plans", isAuthenticated, async (req: any, res) => {
  const plans = await storage.getDailyPlans(req.user.id);
  res.json(plans);
});

app.post("/api/daily-plans", isAuthenticated, async (req: any, res) => {
  const plan = await storage.createDailyPlan({
    ...req.body,
    userId: req.user.id,
  });
  res.json(plan);
});

app.get("/api/daily-plans/:id/time-blocks", isAuthenticated, async (req: any, res) => {
  const blocks = await storage.getTimeBlocks(parseInt(req.params.id));
  res.json(blocks);
});

app.post("/api/time-blocks", isAuthenticated, async (req: any, res) => {
  const block = await storage.createTimeBlock(req.body);
  res.json(block);
});

app.put("/api/time-blocks/:id", isAuthenticated, async (req: any, res) => {
  const block = await storage.updateTimeBlock(parseInt(req.params.id), req.body);
  res.json(block);
});

app.delete("/api/time-blocks/:id", isAuthenticated, async (req: any, res) => {
  await storage.deleteTimeBlock(parseInt(req.params.id));
  res.json({ success: true });
});

// Calendar settings
app.get("/api/calendar/settings", isAuthenticated, async (req: any, res) => {
  const user = req.user as User;
  res.json({
    selectedCalendars: user.selectedCalendars || [],
  });
});

app.post("/api/calendar/settings", isAuthenticated, async (req: any, res) => {
  const user = await storage.updateUser(req.user.id, {
    selectedCalendars: req.body.selectedCalendars,
  });
  res.json(user);
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("dist/client"));
  app.get("*", (req, res) => {
    res.sendFile("dist/client/index.html", { root: process.cwd() });
  });
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 