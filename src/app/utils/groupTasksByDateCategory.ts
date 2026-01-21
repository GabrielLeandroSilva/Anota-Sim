import { Task } from "@/src/types/Task";

export function groupTasksByDateAndCategory(tasks: Task[]) {
  const grouped: Record<string, Record<string, Task[]>> = {};

  tasks.forEach((task) => {
    if (!grouped[task.date]) {
      grouped[task.date] = {};
    }

    if (!grouped[task.date][task.category]) {
      grouped[task.date][task.category] = [];
    }

    grouped[task.date][task.category].push(task);
  });

  return grouped;
}
