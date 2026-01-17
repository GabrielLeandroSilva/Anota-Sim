"use client"

import { CheckCircle2, ListTodo, PlusCircle } from "lucide-react";
import { useNavigation } from "../providers/NavigationProvider";
import { NavItem } from "./NavItem";

interface NavBarProps {
    todoCount: number;
    doneCount: number;
}

export function NavBar({ todoCount, doneCount }: NavBarProps) {
    const { section, setSection } = useNavigation();
    return (
        <nav className="fixed bottom-0 inset-x-0 border-t border-primary bg-zinc-100 dark:bg-zinc-800">
            <div className="max-w-md mx-auto flex justify-around py-3">
                <NavItem
                    icon={CheckCircle2}
                    label="Feitas"
                    active={section === "done"}
                    count={doneCount}
                    onClick={() => setSection("done")}
                />

                <NavItem
                    icon={ListTodo}
                    label="A fazer"
                    active={section === "todo"}
                    count={todoCount}
                    onClick={() => setSection("todo")}
                />

                <NavItem
                    icon={PlusCircle}
                    label="Nova"
                    active={section === "new"}
                    onClick={() => setSection("new")}
                />
            </div>
        </nav>
    )
}