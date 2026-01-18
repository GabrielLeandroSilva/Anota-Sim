import { Task } from "@/src/types/Task";

const STORAGE_KEY = "@anotasim:tasks";

export function getTasksFromStorage(): Task[] {
    if (typeof window === "undefined") return [];

    const stored = localStorage.getItem(STORAGE_KEY);
    
    if (!stored) return [];

    try {
        const parsed: Task[] = JSON.parse(stored);
        return parsed.map((task) => ({
            ...task,
            date: task.date ?? new Date().toISOString().split("T")[0],
          })).sort((a, b) => a.date.localeCompare(b.date));;
    } catch {
        return [];
    }
}

export function saveTasksToStorage(tasks: Task[]) {
    if (typeof window === "undefined") return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}