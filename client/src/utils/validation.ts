export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
};

export const validateTodo = (title: string, dueDate?: string): string[] => {
  const errors: string[] = [];
  
  if (!title.trim()) {
    errors.push('Title is required');
  }
  
  if (dueDate && new Date(dueDate) < new Date()) {
    errors.push('Due date cannot be in the past');
  }
  
  return errors;
};

export const validateTimeBlock = (
  title: string,
  startTime: string,
  endTime: string
): string[] => {
  const errors: string[] = [];
  
  if (!title.trim()) {
    errors.push('Title is required');
  }
  
  const start = new Date(startTime);
  const end = new Date(endTime);
  
  if (start >= end) {
    errors.push('End time must be after start time');
  }
  
  if (start < new Date()) {
    errors.push('Start time cannot be in the past');
  }
  
  return errors;
};

export const validateUser = (
  name: string,
  email: string,
  password: string
): string[] => {
  const errors: string[] = [];
  
  if (!name.trim()) {
    errors.push('Name is required');
  }
  
  if (!validateEmail(email)) {
    errors.push('Invalid email format');
  }
  
  if (!validatePassword(password)) {
    errors.push(
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number'
    );
  }
  
  return errors;
}; 