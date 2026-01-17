"use client"

import { useEffect, useState } from "react";

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
        <h1
        className={`
          text-2xl font-bold text-center
          transition-all duration-700 ease-out
          ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
        `}
      >
        {children}
      </h1> 
    )
}