export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REGISTER: '/api/auth/register',
    ME: '/api/auth/me',
  },
  TODOS: {
    BASE: '/api/todos',
    BY_ID: (id: string) => `/api/todos/${id}`,
    COMPLETE: (id: string) => `/api/todos/${id}/complete`,
  },
  TIME_BLOCKS: {
    BASE: '/api/time-blocks',
    BY_ID: (id: string) => `/api/time-blocks/${id}`,
    BY_DATE: (date: string) => `/api/time-blocks/date/${date}`,
  },
  USERS: {
    BASE: '/api/users',
    BY_ID: (id: string) => `/api/users/${id}`,
    PROFILE: '/api/users/profile',
  },
};

export const DATE_FORMATS = {
  DATE: 'yyyy-MM-dd',
  TIME: 'HH:mm',
  DATETIME: 'yyyy-MM-dd HH:mm',
  DISPLAY_DATE: 'MMM d, yyyy',
  DISPLAY_TIME: 'h:mm a',
  DISPLAY_DATETIME: 'MMM d, yyyy h:mm a',
};

export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
};

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  TODOS: '/todos',
  TIME_BLOCKS: '/time-blocks',
  SETTINGS: '/settings',
} as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'An unexpected error occurred. Please try again later.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  EMAIL_EXISTS: 'An account with this email already exists.',
  PASSWORD_MISMATCH: 'Passwords do not match.',
  INVALID_TOKEN: 'Invalid or expired token.',
} as const; 