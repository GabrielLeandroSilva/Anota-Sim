"use client"

import { useEffect, useState } from "react"
import { Task } from "../types/Task";
import { getTasksFromStorage, saveTasksToStorage } from "../app/utils/storage";
import { getTodayInputDate, isSameDay } from "../app/utils/date";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Carrega do localStorage
  useEffect(() => {
    const storedTasks = getTasksFromStorage();

    const updatedTasks = ensureHabitTasks(storedTasks);

    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  }, []);

  // Persiste no localStorage
  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  function ensureHabitTasks(tasks: Task[]) {
    const today = getTodayInputDate();

    const habitTasks = tasks.filter(
      (task) => task.category === "Hábito"
    );

    if (habitTasks.length === 0) return tasks;

    // Já existe hábito hoje?
    const existsToday = habitTasks.some(
      (task) => isSameDay(task.date, today)
    );

    if (existsToday) return tasks;

    // Já foi concluído hoje?
    const completedToday = habitTasks.some(
      (task) =>
        isSameDay(task.date, today) && task.completed
    );

    if (completedToday) return tasks;

    const baseHabit = habitTasks[0];

    const newTask: Task = {
      ...baseHabit,
      id: crypto.randomUUID(),
      date: today,
      completed: false,
    };

    return [...tasks, newTask];
  }


  function addTask(title: string, date: string, category: string) {
    if (!title.trim()) return;

    const newTask: Task = {
      id: `${Date.now()}-${Math.random()}`,
      title,
      completed: false,
      date: category === "Hábito" ? "" : date,
      category,
    };

    setTasks((prev) => [...prev, newTask]);
  }

  function toggleTask(id: string) {
    updateTask(id, {
      completed: !tasks.find((t) => t.id === id)?.completed,
    });
  }

  function removeTask(id: string) {
    setTasks((prev) => {
      const updated = prev.filter((task) => task.id !== id);
      saveTasksToStorage(updated);
      return updated;
    });
  }

  function updateTask(id: string, data: Partial<Task>) {
    setTasks((prev) => {
      const updated = prev.map((task) =>
        task.id === id ? { ...task, ...data } : task
      );

      saveTasksToStorage(updated);
      return updated;
    });
  }

  return {
    tasks,
    addTask,
    toggleTask,
    removeTask,
    updateTask,
  };
}