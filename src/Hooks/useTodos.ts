import { useState, useEffect } from 'react';
import { Todo, TodoCreate } from '../types/Todo';
import { fetchTasks, createTask } from '../services/todo';

interface TaskForm {
  title: string;
  description: string;
}

interface UseTodosReturn {
  todos: Todo[];
  task: TaskForm;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const useTodos = (): UseTodosReturn => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState<TaskForm>({ title: '', description: '' });

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
    if (!task.title.trim()) return;

    const newTodo: TodoCreate = {
      title: task.title,
      description: task.description || '',
      completed: false,
    };

    const newTask = await createTask(newTodo);

    if (newTask) {
      setTodos(prevTodos => [...prevTodos, newTask]);
    }

    setTask({ title: '', description: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask(prevTask => ({
      ...prevTask,
      [name]: value,
    }));
  };

  return {
    todos,
    task,
    handleSubmit,
    handleChange,
    setTodos
  };
};