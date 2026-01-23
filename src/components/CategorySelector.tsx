import { RefreshCcw } from "lucide-react";

interface CategorySelectorProps {
  value: string;
  onChange: (value: string) => void;
  categories: string[];
}

export function CategorySelector({ value, onChange, categories }: CategorySelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const active = value === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={`
                  flex items-center
                  px-3 py-1.5
                  rounded-full
                  text-sm font-medium
                  transition
                  ${active
                ? "bg-primary text-white"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
              }
                `}
          >
            <span className="flex items-center gap-1.5">
              {category === "Hábito" && (
                <RefreshCcw size={14} />
              )}
              {category}
            </span>
          </button>
        );
      })}
    </div>
  );
}