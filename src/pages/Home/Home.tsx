import { TodoList } from '@/components/todoList';
import { useTodos } from '@/Hooks/useTodos';

import './styles.css';

export const Home = () => {
  const {
    todos,
    task,
    handleSubmit,
    handleChange,
    setTodos,
    error
  } = useTodos();

  return (
    <div className="container">
      <header className="header">
        <h1>My Task List</h1>
      </header>

      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className={`todo-input ${error ? 'error' : ''}`}
          placeholder="Task title"
          name="title"
          value={task.title}
          onChange={handleChange}
        />
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          className="todo-input"
          placeholder="Description (optional)"
          name="description"
          value={task.description}
          onChange={handleChange}
        />
        <button type="submit" className="todo-button">
          Add Task
        </button>
      </form>
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};