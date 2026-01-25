"use client"

import { AnimatedTitle } from "../components/AnimatedTitle";
import { FadeInSection } from "../components/FadeInSection";
import { NavBar } from "../components/NavBar";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";
import { useSwipeNavigation } from "../hook/useSwipeNavigation";
import { useTasks } from "../hook/useTasks";
import { useNavigation } from "../providers/NavigationProvider";
import ThemeToggle from "./ui/ThemeToggle";


export default function Home() {
  const { section } = useNavigation();
  const { tasks, addTask, toggleTask, removeTask } = useTasks();
  const swipeHandlers = useSwipeNavigation();

  const visibleTasks = tasks.filter(
    (t) =>
      !(t.category === "Hábito" && !t.date)
  );

  const todoTasks = visibleTasks.filter((t) => !t.completed);
  const doneTasks = visibleTasks.filter((t) => t.completed);

  return (
    <main {...swipeHandlers} className="min-h-screen pb-20 px-4 flex flex-col touch-pan-y">
      <header className="py-6">
        <AnimatedTitle>AnotaSim</AnimatedTitle>
      </header>

      <section className="max-w-md mx-auto flex-1 flex w-full">
        {section === "todo" && (
          <FadeInSection triggerKey="todo">
            <TaskList tasks={todoTasks} onToggle={toggleTask} onDelete={removeTask} emptyMessage="Nenhuma tarefa pendente" />
          </FadeInSection>
        )}

        {section === "done" && (
          <FadeInSection triggerKey="done">
            <TaskList tasks={doneTasks} onToggle={toggleTask} onDelete={removeTask} emptyMessage="Nenhuma tarefa concluída" />
          </FadeInSection>
        )}

        {section === "new" && (
          <FadeInSection triggerKey="new">
            < TaskForm onAddTask={addTask} />
          </FadeInSection>
        )}
      </section>

      <NavBar todoCount={todoTasks.length} doneCount={doneTasks.length} />
      <ThemeToggle />
    </main>

  );
}