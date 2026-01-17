"use client"

import { Task } from "../types/Task";
import { TaskItem } from "./TaskItem";


interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  emptyMessage: string;
}

export function TaskList({ tasks, onToggle, onDelete, emptyMessage }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <p className="text-center text-zinc-400 text-sm">
        {emptyMessage}
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}