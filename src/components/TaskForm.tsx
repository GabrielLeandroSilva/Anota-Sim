"use client";

import { useState } from "react";
import { useNavigation } from "../providers/NavigationProvider";


interface TaskFormProps {
  onAddTask: (title: string) => void;
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const { setSection } = useNavigation();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) return;

    onAddTask(title);
    setTitle("");
    setSection("todo");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Digite sua tarefa..."
        className="
          w-full rounded-lg border px-4 py-3
          bg-transparent
          border-zinc-300 dark:border-zinc-700
          focus:outline-none focus:ring-2 focus:ring-primary
        "
        autoFocus
      />

      <button
        type="submit"
        className="
          bg-primary text-white
          py-3 rounded-lg
          font-medium
          hover:opacity-90
          transition
        "
      >
        Salvar tarefa
      </button>
    </form>
  );
}
