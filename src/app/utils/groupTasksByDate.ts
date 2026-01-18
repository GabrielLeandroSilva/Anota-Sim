import { Task } from "@/src/types/Task";

export function groupTasksByDate(tasks: Task[]) {
    return tasks.reduce<Record<string, Task[]>>((acc, task) => {
        if (!acc[task.date]) {
            acc[task.date] = [];
        }
        acc[task.date].push(task);
        return acc;
    }, {})
}