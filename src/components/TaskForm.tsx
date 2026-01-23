"use client";

import { useState } from "react";
import { useNavigation } from "../providers/NavigationProvider";
import { TASK_CATEGORIES } from "../app/constants/categories";
import { CategorySelector } from "./CategorySelector";
import { getTodayInputDate } from "../app/utils/date";
import { DataPickerInput } from "./DatePickerInput";


interface TaskFormProps {
  onAddTask: (title: string, date: string, category: string) => void;
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Pessoal");
  //const [date, setDate] = useState(getTodayInputDate())
  const [date, setDate] = useState(new Date());
  const { setSection } = useNavigation();

  const isHabit = category === "Hábito";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) return;

    onAddTask(
      title,
      isHabit ? "" : date.toISOString().split("T")[0],
      category
    );
    setTitle("");
    setDate(new Date());
    setSection("todo");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
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

        <DataPickerInput
          value={date}
          onChange={setDate}
          disabled={isHabit}
        />
      

      <CategorySelector
        value={category}
        onChange={setCategory}
        categories={TASK_CATEGORIES}
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
