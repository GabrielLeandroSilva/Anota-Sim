"use client"

import { useEffect, useState } from "react";
import { NotebookTabs } from 'lucide-react';

interface AnimatedTitleProps {
    children: React.ReactNode;
}

export function AnimatedTitle({ children }: AnimatedTitleProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setVisible(true), 50);
        return () => clearInterval(timeout);
    }, [])

    return (
        <div
          className={`
            flex items-center justify-center gap-2
            transition-all duration-700 ease-out
            ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
          `}
        >
          <NotebookTabs
            size={24}
            className="text-primary"
          />
    
          <h1 className="text-2xl font-bold">
            AnotaSim
          </h1>
        </div>
      );
}