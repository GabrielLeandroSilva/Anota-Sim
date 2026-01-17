"use client"

import { CheckCircle2, ListTodo, PlusCircle } from "lucide-react";
import { useNavigation } from "../providers/NavigationProvider";
import React from "react";

export function NavBar() {
    const { section, setSection } = useNavigation();
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
            <ul className="flex justify-around">
                <NavItem
                    label="A fazer"
                    icon={<ListTodo size={18} />}
                    active={section === "todo"}
                    onClick={() => setSection("todo")} />
                <NavItem
                    label="Feitas"
                    icon={<CheckCircle2 size={18} />}
                    active={section === "done"}
                    onClick={() => setSection("done")} />
                <NavItem
                    label="Cadastrar"
                    icon={<PlusCircle size={18} />}
                    active={section === "new"}
                    onClick={() => setSection("new")} />
            </ul>
        </nav>
    )
}

interface NavItemProps {
    label: string;
    icon: React.ReactNode;
    active: boolean;
    onClick: () => void;
}

function NavItem({ label, icon, active, onClick }: NavItemProps) {
    return (
        <li onClick={onClick}
            className={`flex-1 flex items-center justify-center gap-2 py-3 cursor-pointer transition-colors
                ${active
                    ? "text-white font-semibold border-t-2 border-primary-dark bg-primary"
                    : "text-gray-900 hover:bg-primary/30"
                }`
            }>
        {icon}
        <span className="text-xs">{label}</span>   
        </li>
    )
}