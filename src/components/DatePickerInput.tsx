"use client"

import { Calendar } from "lucide-react";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { ptBR } from "react-day-picker/locale";
import "react-day-picker/style.css";

interface DataPickerInputProps {
  value: Date;
  onChange: (date: Date) => void;
  disabled: boolean;
}

export function DataPickerInput({ value, onChange, disabled }: DataPickerInputProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((v) => !v)}
        className={`w-full flex items-center gap-2
            rounded-lg border px-4 py-3
            bg-transparent
            border-zinc-300 dark:border-zinc-700
            text-left
            focus:outline-none focus:ring-2 focus:ring-primary
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            `}

      >
        <span className="flex-1">
          {value.toLocaleDateString("pt-BR")}
        </span>
        <Calendar size={16} />
      </button>

      {open && !disabled && (
        <div className="absolute z-50 mt-2 rounded-lg border bg-white dark:bg-zinc-900 shadow-lg p-2">
          <DayPicker
            mode="single"
            locale={ptBR}
            classNames={{
              today: `text-primary`, // Add a border to today's date
              selected: `bg-primary/20 ring-2 ring-primary rounded-full`, // Highlight the selected day
              chevron: `fill-primary`,
              month_caption: `rdp-month_caption ml-1`
            }}
            selected={value}
            onSelect={(day) => {
              if (day) {
                onChange(day);
                setOpen(false);
              }
            }}
          />
        </div>
      )}
    </div>
  )
}