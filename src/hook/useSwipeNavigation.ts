"use client"

import { useRef } from "react";
import { useNavigation } from "../providers/NavigationProvider";

const sections = ["todo", "done", "new"] as const;

export function useSwipeNavigation() {
    const startX = useRef<number | null>(null);
    const { section, setSection } = useNavigation();

    function onTouchStart(e: React.TouchEvent) {
        startX.current = e.touches[0].clientX;
    }

    function onTouchEnd(e: React.TouchEvent) {
        if (startX.current === null) return;
        
        const endx = e.changedTouches[0].clientX;
        const diff = startX.current - endx;

        if (Math.abs(diff) < 50) return;

        const currentIndex = sections.indexOf(section);
        if (currentIndex === -1) return;

        if (diff > 0 && currentIndex < sections.length - 1) {
            setSection(sections[currentIndex + 1]);
        }

        if (diff < 0 && currentIndex > 0) {
            setSection(sections[currentIndex - 1]);
        }

        startX.current = null;

    }

    return {
        onTouchStart,
        onTouchEnd
    }

}