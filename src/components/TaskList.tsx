"use client"

import { groupTasksByDateAndCategory } from "../app/utils/groupTasksByDateCategory";
import { sortTaskDates } from "../app/utils/sortDates";
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
  const groupedTasks = groupTasksByDateAndCategory(tasks);
  const sortedDates = sortTaskDates(Object.keys(groupedTasks));

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
        <div key={date} className="mb-6">
          <TaskDateHeader date={date} />

          {Object.entries(groupedTasks[date]).map(
            ([category, categoryTasks]) => (
              <div key={category} className="mt-3">
                {/* Header da categoria */}
                <div className="mb-1">
                  <span className="mb-2 px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">
                    {category}
                  </span>
                </div>

                <div className="flex flex-col gap-2 w-full">
                  {categoryTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggle={onToggle}
                      onDelete={onDelete}
                    />
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
}