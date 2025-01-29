import { useCallback } from 'react';
import { updateTask, deleteTask } from '../services/todo';
import { TodoListProps } from '../types/todoList.types';

export const useTodoActions = ({ todos, setTodos }: TodoListProps) => {
  const toggleTodo = useCallback(async (id: string) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (!todoToUpdate) return;

      const newCompletedState = !todoToUpdate.completed;

      setTodos(currentTodos =>
        currentTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: newCompletedState } : todo
        )
      );

      // API call
      await updateTask(id, { completed: newCompletedState });
    } catch (error) {
      console.error('Error updating task:', error);
      setTodos(currentTodos =>
        currentTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    }
  }, [todos, setTodos]);

  const deleteTodo = useCallback(async (id: string) => {
    try {
      setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
      await deleteTask(id);
    } catch (error) {
      console.error('Error deleteing task:', error);
      setTodos([...todos]);
    }
  }, [todos, setTodos]);

  return { toggleTodo, deleteTodo };
};