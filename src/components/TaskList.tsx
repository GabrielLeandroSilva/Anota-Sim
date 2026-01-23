"use client"

import { ClipboardList, RefreshCcw } from "lucide-react";
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
  const habitTasks = tasks.filter(
    (task) => task.category === "Hábito"
  );

  const normalTasks = tasks.filter(
    (task) => task.category !== "Hábito"
  );

  const groupedTasks = groupTasksByDateAndCategory(normalTasks);
  const sortedDates = sortTaskDates(Object.keys(groupedTasks));

  if (normalTasks.length === 0 && habitTasks.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <EmptyState message={emptyMessage} />
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full">
      {habitTasks.length > 0 && (
        <div className="mb-2 pb-6 border-b-1 border-primary/30">
          <div className="flex mb-2 gap-2">
            <RefreshCcw size={18} className="text-primary" />
            <span className="text-md font-semibold text-primary">
              Hábitos
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {habitTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 mt-4">
        <ClipboardList size={18} className="text-primary" />
        <span className="text-md font-semibold text-primary">
          Tarefas
        </span>
      </div>

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