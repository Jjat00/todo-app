import './styles.css';
import { TodoList } from '../components/todoList';
import { useTodos } from './../Hooks/useTodos';

export const Home = () => {

  const {
    todos,
    task,
    handleSubmit,
    handleChange,
    setTodos
  } = useTodos();

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