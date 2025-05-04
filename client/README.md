# Unified App Client

This is the client-side application for the unified ToDoTracker and TimeBlocker application.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Setup

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Create a `.env` file in the root directory with the following variables:
```env
VITE_API_URL=http://localhost:3000
```

## Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`.

## Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## Project Structure

- `src/` - Source code
  - `components/` - React components
  - `contexts/` - React contexts (e.g., AuthContext)
  - `types/` - TypeScript type definitions
  - `utils/` - Utility functions
  - `App.tsx` - Main application component
  - `main.tsx` - Application entry point

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- React Query

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

MIT 