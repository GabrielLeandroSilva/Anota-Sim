"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button
      onClick={() =>
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
      }
      className="
        fixed
        bottom-6 right-6
        z-50
        flex items-center justify-center
        w-12 h-12
        rounded-xl
        bg-white/80 dark:bg-black/80
        backdrop-blur
        border border-black/10 dark:border-white/10
        shadow-sm
        hover:scale-105
        transition-all duration-300
      "
      aria-label="Alternar tema"
    >
      {resolvedTheme === "dark" ? (
        <Sun size={18} />
      ) :
        (
          <Moon size={18} />
      )}
    </button>
  )
}
