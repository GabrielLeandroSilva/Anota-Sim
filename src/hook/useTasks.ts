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
  
    function addTask(title: string, date: string) {
      if (!title.trim()) return;
  
      const newTask: Task = {
        id: crypto.randomUUID(),
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
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? { ...task, completed: !task.completed }
            : task
        )
      );
    }
  
    function removeTask(id: string) {
      setTasks((prev) => {
        const updated = prev.filter((task) => task.id !== id);
        saveTasksToStorage(updated);
        return updated;
      });
    }
  
    return {
      tasks,
      addTask,
      toggleTask,
      removeTask,
    };
  }