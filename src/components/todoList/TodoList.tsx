import React from 'react';
import { Todo as TodoItem } from './../todo';
import { Todo } from './../../types/Todo'
import { updateTask, deleteTask } from '../../services/todo';


interface TodoListInterface {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoList: React.FC<TodoListInterface> = ({
  todos,
  setTodos
}) => {
  const toggleTodo = (id: string) => {
    updateTask(id, { completed: !todos.find(todo => todo.id === id)?.completed || false })
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    deleteTask(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };


  return (
    <div> {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    ))}
    </div>)
}