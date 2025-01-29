import { Todo } from './Todo';

export interface TaskForm {
  title: string;
  description: string;
}

export interface UseTodosReturn {
  todos: Todo[];
  task: TaskForm;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  error: string | null;
}