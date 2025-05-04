import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo as TodoType } from '../types';
import { API_ENDPOINTS } from '../utils/constants';
import { get, post, put, del } from '../utils/api';
import Todo from './Todo';
import TodoForm from './TodoForm';

const TodoList: React.FC = () => {
  const [editingTodo, setEditingTodo] = useState<TodoType | null>(null);
  const queryClient = useQueryClient();

  const { data: todos = [], isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: () => get<TodoType[]>(API_ENDPOINTS.TODOS.BASE).then(res => res.data),
  });

  const createMutation = useMutation({
    mutationFn: (todo: Omit<TodoType, 'id' | 'createdAt' | 'updatedAt'>) =>
      post<TodoType>(API_ENDPOINTS.TODOS.BASE, todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (todo: TodoType) =>
      put<TodoType>(API_ENDPOINTS.TODOS.BY_ID(todo.id), todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setEditingTodo(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => del<void>(API_ENDPOINTS.TODOS.BY_ID(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const toggleCompleteMutation = useMutation({
    mutationFn: (id: string) =>
      put<TodoType>(API_ENDPOINTS.TODOS.COMPLETE(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleCreate = (todo: Omit<TodoType, 'id' | 'createdAt' | 'updatedAt'>) => {
    createMutation.mutate(todo);
  };

  const handleUpdate = (todo: TodoType) => {
    updateMutation.mutate(todo);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleToggleComplete = (id: string) => {
    toggleCompleteMutation.mutate(id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <TodoForm
        onSubmit={editingTodo ? handleUpdate : handleCreate}
        initialData={editingTodo}
        onCancel={() => setEditingTodo(null)}
      />
      <div className="space-y-2">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDelete}
            onEdit={setEditingTodo}
          />
        ))}
        {todos.length === 0 && (
          <p className="text-center text-muted-foreground">
            No todos yet. Add one to get started!
          </p>
        )}
      </div>
    </div>
  );
};

export default TodoList; 