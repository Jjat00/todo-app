import React from 'react';
import { Todo as TodoItem } from './../todo';
import { TodoListProps } from '../../types/todoList.types';
import { useTodoActions } from '../../Hooks/useTodoActions';
import './styles.css';


export const TodoList: React.FC<TodoListProps> = (
  props
) => {
  const { toggleTodo, deleteTodo } = useTodoActions(props);

  if (!props.todos.length) {
    return <div className="empty-state">No hay tareas pendientes</div>;
  }

  return (
    <div> {props.todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    ))}
    </div>)
}