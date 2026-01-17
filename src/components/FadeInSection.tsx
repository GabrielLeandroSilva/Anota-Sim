"use client"

import { useEffect, useState } from "react";

interface FadeInSectionProps {
    children: React.ReactNode;
    triggerKey: string;
}

export function FadeInSection({ children, triggerKey }: FadeInSectionProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(false);

        const timeout = setTimeout(() => {
            setVisible(true);
        }, 20);

        return () => clearTimeout(timeout);
    }, [triggerKey]);

    return (
        <div
            className={`
        w-full transition-all duration-500 translate-y-1 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
      `}
        >
            {children}
        </div>
    )
}