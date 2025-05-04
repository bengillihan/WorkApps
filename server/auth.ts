import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { storage } from "./storage";
import { User } from "../shared/schema";

passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await storage.getUser(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/google_login/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await storage.getUserByGoogleId(profile.id);

        if (!user) {
          // Create new user with both ToDoTracker and TimeBlocker fields
          user = await storage.createUser({
            googleId: profile.id,
            email: profile.emails![0].value,
            name: profile.displayName,
            credentialsInfo: {
              token: accessToken,
              refresh_token: refreshToken,
            },
            selectedCalendars: [],
          });
        } else {
          // Update existing user's credentials if needed
          if (!user.credentialsInfo || user.credentialsInfo.token !== accessToken) {
            user = await storage.updateUser(user.id, {
              credentialsInfo: {
                token: accessToken,
                refresh_token: refreshToken,
              },
            });
          }
        }

        return done(null, user);
      } catch (err) {
        return done(err as Error);
      }
    }
  )
);

export { passport }; 