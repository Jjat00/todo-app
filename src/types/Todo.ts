// types.ts
export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}


export type TodoCreate = Omit<Todo, "id">;