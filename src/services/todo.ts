import axios from "axios";
import { config } from "./../../config"; // Using alias for cleaner imports
import { Todo, TodoCreate } from "../types/Todo";

const URL_API = config.apiUrl;

if (!URL_API) {
  throw new Error("Environment variable URL_API is required.");
}

// Crear una instancia preconfigurada de Axios
const apiClient = axios.create({
  baseURL: URL_API,
  timeout: 5000, // Evitar bloqueos en peticiones
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Fetches all tasks or a specific task by ID.
 * @param {number} [taskId] - (Optional) The ID of the task to fetch.
 * @returns {Promise<Todo[]>} A single task as an array if taskId is provided, otherwise an array of tasks.
 */
export const fetchTasks = async (taskId?: number): Promise<Todo[]> => {
  try {
    const url = taskId ? `/api/tasks/${taskId}/` : "/api/tasks/";
    const { data } = await apiClient.get<Todo | Todo[]>(url);
    return Array.isArray(data) ? data : [data]; // Garantizar retorno en formato array
  } catch (error) {
    handleAxiosError(error);
    return []; // Agregar retorno explícito en caso de error
  }
};

/**
 * Creates a new task.
 * @param {TodoCreate} taskData - The task data (title, description, etc.).
 * @returns {Promise<Todo | null>} The created task or null if the request fails.
 */
export const createTask = async (taskData: TodoCreate): Promise<Todo | null> => {
  try {
    const { data } = await apiClient.post<Todo>("/api/tasks/", taskData);
    return data;
  } catch (error) {
    handleAxiosError(error);
    return null;
  }
};

/**
 * Updates an existing task.
 * @param {string} taskId - The ID of the task to update.
 * @param {Partial<Todo>} taskData - The updated task data.
 * @returns {Promise<Todo | null>} The updated task or null if the update fails.
 */
export const updateTask = async (taskId: string, taskData: Partial<Todo>): Promise<Todo | null> => {
  try {
    const { data } = await apiClient.put<Todo>(`/api/tasks/${taskId}/`, taskData);
    return data;
  } catch (error) {
    handleAxiosError(error);
    return null;
  }
};

/**
 * Deletes a task by ID.
 * @param {string} taskId - The ID of the task to delete.
 * @returns {Promise<boolean>} True if deleted successfully, false otherwise.
 */
export const deleteTask = async (taskId: string): Promise<boolean> => {
  try {
    await apiClient.delete(`/api/tasks/${taskId}/`);
    return true;
  } catch (error) {
    handleAxiosError(error);
    return false;
  }
};

/**
 * Centralized Axios error handler.
 * @param {unknown} error - The error object.
 */
const handleAxiosError = (error: unknown): void => {
  if (axios.isAxiosError(error)) {
    console.error("Axios request error:", error.message);
    throw new Error(`API Error: ${error.response?.statusText || "Unknown"}`);
  } else {
    console.error("Unexpected error:", error);
    throw new Error("An unexpected error occurred while processing the request.");
  }
};