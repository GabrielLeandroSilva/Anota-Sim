"use client"
import { NavBar } from "../components/NavBar";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";
import { useSwipeNavigation } from "../hook/useSwipeNavigation";
import { useTasks } from "../hook/useTasks";
import { useNavigation } from "../providers/NavigationProvider";
import ThemeToggle from "./ui/ThemeToggle";


export default function Home() {
  const { section } = useNavigation();
  const { tasks, addTask, toggleTask, removeTask  } = useTasks();
  const swipeHandlers = useSwipeNavigation();

  const todoTasks = tasks.filter((t) => !t.completed);
  const doneTasks = tasks.filter((t) => t.completed);

  return (
    <main {...swipeHandlers} className="min-h-screen pb-16 px-4 touch-pan-y">
      <header className="text-center py-6">
        <h1 className="text-2xl font-bold">AnotaSim 📝</h1>
      </header>

      <section className="max-w-md mx-auto">
        {section === "todo" && (
          <TaskList tasks={todoTasks} onToggle={toggleTask} onDelete={removeTask} emptyMessage="Nenhuma tarefa pendente" />)}

        {section === "done" && (
          <TaskList tasks={doneTasks} onToggle={toggleTask} onDelete={removeTask} emptyMessage="Nenhuma tarefa concluída" />
        )}

        {section === "new" && <TaskForm onAddTask={addTask} />}
      </section>

      <NavBar />
      <ThemeToggle />
    </main>

  );
}