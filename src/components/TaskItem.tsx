"use client"

import { Check, Trash2 } from "lucide-react";
import { Task } from "../types/Task";
import { useState } from "react";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  function handleToggle() {
    setIsAnimating(true);

    setTimeout(() => {
      onToggle(task.id);
      setIsAnimating(false);
    }, 400);

  }

  return (
    <div
      onClick={handleToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleToggle();
        }
      }}
      role="button"
      tabIndex={0}
      className={`
            w-full flex items-center gap-3
            rounded-lg border p-3
            transition-all duration-300 ease-out
            cursor-pointer select-none
            ${task.completed
          ? "bg-zinc-100 dark:bg-zinc-800 opacity-70"
          : "hover:bg-zinc-50 dark:hover:bg-zinc-800"
        }
            ${isAnimating ? "scale-[0.98] opacity-60" : ""}
          `}
    >
      {/* Checkbox */}
      <div
        className={`
              w-5 h-5 rounded-full border
              flex items-center justify-center
              transition-all duration-300
              ${task.completed || isAnimating
            ? "bg-primary border-primary text-white scale-110"
            : "border-zinc-400"
          }
            `}
      >
        {(task.completed || isAnimating) && <Check size={14} />}
      </div>

      {/* Texto */}
      <span
        className={`
              flex-1 text-sm transition-all duration-300
              ${task.completed
            ? "line-through text-zinc-400"
            : ""
          }
              ${isAnimating ? "translate-x-1 opacity-60" : ""}
            `}
      >
        {task.title}
      </span>

      {/* Delete */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(task.id);
        }}
        className="
          text-zinc-400 hover:text-red-500
          transition
        "
        aria-label="Excluir tarefa"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}