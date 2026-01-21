"use client"

import { useEffect, useState } from "react"
import { Task } from "../types/Task";
import { getTasksFromStorage, saveTasksToStorage } from "../app/utils/storage";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Carrega do localStorage
  useEffect(() => {
    const storedTasks = getTasksFromStorage();
    setTasks(storedTasks);
  }, []);

  // Persiste no localStorage
  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  function addTask(title: string, date: string, category: string) {
    if (!title.trim()) return;

    const newTask: Task = {
      id: `${Date.now()}-${Math.random()}`,
      title,
      completed: false,
      date,
      category,
    };

    setTasks((prev) => {
      const updated = [...prev, newTask];
      saveTasksToStorage(updated);
      return updated;
    });
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