"use client"

import { Calendar, Check, RefreshCcw, Trash2 } from "lucide-react";
import { Task } from "../types/Task";
import { useState } from "react";
import { formatDate } from "../app/utils/formatDate";
import { isPast, isToday } from "../app/utils/date";
import { TodayBadge } from "./TodayBadge";
import { OverdueBadge } from "./OverdueBadge";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const isHabit = task.category === "Hábito";
  const [isAnimating, setIsAnimating] = useState(false);
  const showToday = !isHabit && isToday(task.date);
  const showOverdue = !isHabit && isPast(task.date) && !task.completed;

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
            rounded-lg border border-primary/50 p-3
            transition-all duration-300 ease-out
            cursor-pointer select-none
            ${task.completed
          ? "bg-zinc-100 dark:bg-zinc-800 opacity-70"
          : "hover:bg-zinc-50 dark:hover:bg-zinc-800"
        }
            ${isAnimating ? "scale-[0.98] opacity-60" : ""}
            ${showOverdue ? "bg-red-400/10 border-red-400/50" : "bg-primary/10"}
          `}
    >
      {/* Checkbox */}
      <div
        className={`
              circulo rounded-full border
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
      <div className="flex flex-col w-full">
        <span className={`
              flex-1 text-sm transition-all duration-300
              ${task.completed
            ? "line-through text-zinc-400"
            : ""
          }
              ${isAnimating ? "translate-x-1 opacity-60" : ""}
            `}>{task.title}</span>

        <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1">
          {isHabit ? (
            <>
              <RefreshCcw size={12} className="text-primary"/>
              <span className="font-medium text-primary">
                Hábito diário
              </span>
            </>
          ) : (
            <>
              <Calendar size={12} />
              <span>{formatDate(task.date)}</span>

              {showToday && <TodayBadge />}
              {showOverdue && <OverdueBadge />}
            </>
          )}
        </div>

      </div>

      {/* Delete */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(task.id);
        }}
        className="
          text-red-400
          transition cursor-pointer
        "
        aria-label="Excluir tarefa"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
