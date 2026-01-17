"use client"

import { Task } from "../types/Task";
import { EmptyState } from "./EmptyState";
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
      <div className="flex-1 flex items-center justify-center">
        <EmptyState message={emptyMessage} />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 w-full">
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