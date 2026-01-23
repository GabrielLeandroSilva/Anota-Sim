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
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    if (tasks.length === 0) return;
  
    const updated = ensureHabitTasks(tasks);
  
    if (updated.length !== tasks.length) {
      setTasks(updated);
    }
  }, [tasks]);

  // Persiste no localStorage
  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  function ensureHabitTasks(tasks: Task[]) {
    const today = getTodayInputDate();
  
    const habitBases = tasks.filter(
      (task) => task.category === "Hábito" && task.isHabitBase
    );
  
    if (habitBases.length === 0) return tasks;
  
    const habitInstancesToday = tasks.filter(
      (task) =>
        task.category === "Hábito" &&
        !task.isHabitBase &&
        isSameDay(task.date, today)
    );
  
    if (habitInstancesToday.length > 0) return tasks;
  
    const newInstances = habitBases.map((base) => ({
      ...base,
      id: crypto.randomUUID(),
      date: today,
      completed: false,
      isHabitBase: false,
    }));
  
    return [...tasks, ...newInstances];
  }
  
  


  function addTask(title: string, date: string, category: string) {
    if (!title.trim()) return;
  
    const isHabit = category === "Hábito";
  
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      date: isHabit ? "" : date,
      category,
      isHabitBase: isHabit,
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