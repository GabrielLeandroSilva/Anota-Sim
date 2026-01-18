"use client"

import { groupTasksByDate } from "../app/utils/groupTasksByDate";
import { Task } from "../types/Task";
import { EmptyState } from "./EmptyState";
import { TaskDateHeader } from "./TaskDateHeader";
import { TaskItem } from "./TaskItem";


interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  emptyMessage: string;
}

export function TaskList({ tasks, onToggle, onDelete, emptyMessage }: TaskListProps) {
  const groupedTasks = groupTasksByDate(tasks);
  const sortedDates = Object.keys(groupedTasks).sort();

  if (tasks.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <EmptyState message={emptyMessage} />
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full">
  {sortedDates.map((date) => (
    <div key={date}>
      <TaskDateHeader date={date} />

      <div className="flex flex-col gap-2 w-full">
        {groupedTasks[date].map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  ))}
</div>
  )
}