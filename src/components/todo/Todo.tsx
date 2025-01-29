import React from 'react';
import './styles.css';
import { Todo } from '../../types/Todo';
import { DeleteIcon } from '../../icons/icons8-delete';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void; // Nueva prop para eliminar
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <div className="todo-content">
        <h3 className="todo-title">{todo.title}</h3>
        <p className="todo-description">{todo.description}</p>
      </div>
      <button
        className="todo-delete-btn"
        onClick={() => onDelete(todo.id)}
        aria-label="Delete task"
      >
        <DeleteIcon />
      </button>
    </div>
  );
};
