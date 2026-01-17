import { Task } from "@/src/types/Task";

const STORAGE_KEY = "@anotasim:tasks";

export function getTasksFromStorage(): Task[] {
    if (typeof window === "undefined") return [];

    const stored = localStorage.getItem(STORAGE_KEY);
    
    if (!stored) return [];

    try {
        return JSON.parse(stored) as Task[];
    } catch {
        return [];
    }
}

export function saveTasksToStorage(tasks: Task[]) {
    if (typeof window === "undefined") return [];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}