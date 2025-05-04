import React from 'react';
import { Todo as TodoType } from '../types';
import { formatDate, isPast } from '../utils/date';
import { Check, Trash2, Edit } from 'lucide-react';

interface TodoProps {
  todo: TodoType;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: TodoType) => void;
}

const Todo: React.FC<TodoProps> = ({ todo, onToggleComplete, onDelete, onEdit }) => {
  const isOverdue = todo.dueDate && !todo.completed && isPast(todo.dueDate);

  return (
    <div className={`p-4 rounded-lg border border-border bg-card ${
      isOverdue ? 'border-destructive' : ''
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <button
            onClick={() => onToggleComplete(todo.id)}
            className={`mt-1 p-1 rounded-full ${
              todo.completed
                ? 'bg-primary text-primary-foreground'
                : 'border border-border hover:bg-muted'
            }`}
          >
            {todo.completed && <Check className="h-4 w-4" />}
          </button>
          <div>
            <h3 className={`text-lg font-medium ${
              todo.completed ? 'line-through text-muted-foreground' : 'text-foreground'
            }`}>
              {todo.title}
            </h3>
            {todo.description && (
              <p className="text-sm text-muted-foreground mt-1">
                {todo.description}
              </p>
            )}
            {todo.dueDate && (
              <p className={`text-sm mt-2 ${
                isOverdue ? 'text-destructive' : 'text-muted-foreground'
              }`}>
                Due: {formatDate(todo.dueDate)}
              </p>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(todo)}
            className="p-1 text-muted-foreground hover:text-foreground"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-1 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo; 