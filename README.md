# Unified Work Apps

A unified application combining Todo and Time Blocking functionality with a single authentication system.

## Features

- User authentication with Google OAuth
- Todo management
- Time blocking
- Modern UI with Tailwind CSS
- TypeScript support
- PostgreSQL database

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- Google OAuth credentials

## Local Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in the required environment variables
4. Start the development server:
   ```bash
   npm run dev
   ```

## Replit Deployment

1. Create a new Replit project
2. Import this repository
3. Set up PostgreSQL database in Replit:
   - Go to the "Tools" tab
   - Click on "Database"
   - Create a new PostgreSQL database
   - Copy the connection string
4. Configure environment variables in Replit:
   - Go to the "Secrets" tab
   - Add the following variables:
     ```
     DATABASE_URL=your_replit_postgres_connection_string
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret
     JWT_SECRET=your_jwt_secret
     ```
5. Install dependencies:
   ```bash
   npm install
   ```
6. Run database migrations:
   ```bash
   npm run migrate
   ```
7. Start the application:
   ```bash
   npm start
   ```

## Project Structure

```
UnifiedApp/
├── client/          # React frontend
├── server/          # Express backend
├── shared/          # Shared types and utilities
├── scripts/         # Database and other scripts
├── package.json     # Project configuration
├── tsconfig.json    # TypeScript configuration
├── vite.config.ts   # Vite configuration
└── tailwind.config.ts # Tailwind CSS configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed the database with sample data

## License

MIT 