import { useState, useEffect } from 'react';
import { Todo, TodoCreate } from '../types/Todo';
import { fetchTasks, createTask } from '../services/todo';
import { TaskForm, UseTodosReturn } from '../types/todoForm.types';

export const useTodos = (): UseTodosReturn => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState<TaskForm>({ title: '', description: '' });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchTasks();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    getData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear any previous error
    setError(null);

    if (!task.title.trim()) {
      setError("Task title is required");
      return;
    }

    try {
      const newTodo: TodoCreate = {
        title: task.title,
        description: task.description || '',
        completed: false,
      };

      const newTask = await createTask(newTodo);

      if (newTask) {
        setTodos(prevTodos => [...prevTodos, newTask]);
        setTask({ title: '', description: '' });
      }
    } catch (error) {
      setError("Failed to create task. Please try again.");
      console.error("Error creating task:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask(prevTask => ({
      ...prevTask,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  return {
    todos,
    task,
    handleSubmit,
    handleChange,
    setTodos,
    error
  };
};