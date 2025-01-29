import { Todo } from '@/types/Todo';

export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void; // Nueva prop para eliminar
}