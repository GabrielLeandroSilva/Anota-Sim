"use client"

import { useEffect, useState } from "react"
import { Task } from "../types/Task";
import { getTasksFromStorage, saveTasksToStorage } from "../app/utils/storage";
import { notifyTask } from "../lib/notifications";
import { isToday } from "../app/utils/date";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [appInitialized, setAppInitialized] = useState(false);

  // Carrega do localStorage
  useEffect(() => {
    const storedTasks = getTasksFromStorage();
    setTasks(storedTasks);
    setAppInitialized(true);
  }, []);

  // Persiste no localStorage
  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  useEffect(() => {
    if (!appInitialized) return;
  
    const tasksToNotify = tasks.filter(
      (task) =>
        !task.completed &&
        !task.notified &&
        isToday(task.date)
    );
  
    if (tasksToNotify.length === 0) return;
  
    tasksToNotify.forEach((task) => {
      notifyTask(task.title);
    });
  
    setTasks((prev) => {
      const updated = prev.map((task) =>
        tasksToNotify.some((t) => t.id === task.id)
          ? { ...task, notified: true }
          : task
      );
  
      saveTasksToStorage(updated);
      return updated;
    });
  }, [appInitialized]);

  function addTask(title: string, date: string) {
    if (!title.trim()) return;

    const newTask: Task = {
      id: `${Date.now()}-${Math.random()}`,
      title,
      completed: false,
      date,
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