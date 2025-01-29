import React, { useEffect, useState } from 'react';

import './styles.css';
import { Todo, TodoCreate } from './../types/Todo';
import { TodoList } from '../components/todoList';
import { fetchTasks, createTask } from '../services/todo';


export const Home = () => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState<{ title: string, description: string }>({ title: '', description: '' });

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

  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.title.trim()) return;

    const newTodo: TodoCreate = {
      title: task.title,
      description: task.description || '',
      completed: false,
    };

    // create task
    const newTask = await createTask(newTodo)

    if (newTask)
      setTodos([...todos, newTask]);

    setTask({ title: '', description: '' }); // Limpiar el objeto
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask(prevTask => ({
      ...prevTask,
      [name]: value,
    }));
  };


  return (
    <div className="container">
      <header className="header">
        <h1>Mi Lista de Tareas</h1>
      </header>

      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="todo-input"
          placeholder="Título de la tarea"
          name="title"
          value={task.title}
          onChange={handleChange}
        />
        <input
          type="text"
          className="todo-input"
          placeholder="Descripción (opcional)"
          name="description"
          value={task.description}
          onChange={handleChange}
        />
        <button type="submit" className="todo-button">
          Agregar Tarea
        </button>
      </form>
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};