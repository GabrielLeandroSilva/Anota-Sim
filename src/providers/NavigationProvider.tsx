"use client"

import { error } from "console";
import React, { createContext, useContext, useState } from "react";

export type Section = "todo" | "done" | "new";

interface NavigationContextData {
    section: Section;
    setSection: (section: Section) => void;
}

const NavigationContext = createContext<NavigationContextData | null>(
    null
);

export function NavigationProvider({
    children,
}: {
        children: React.ReactNode;
    }) {
    const [section, setSection] = useState<Section>("todo");

    return (
        <NavigationContext.Provider value={{ section, setSection }}>
            {children}
        </NavigationContext.Provider>
    )
}

export function useNavigation() {
    const context = useContext(NavigationContext);

    if (!context) {
        throw new Error(
            "useNavigation deve ser usado dentro de NavigationProvider"
        )
    }

    return context;
}