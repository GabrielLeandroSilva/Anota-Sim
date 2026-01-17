import { LucideIcon } from "lucide-react";

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  active: boolean;
  count?: number;
  onClick: () => void;
}

export function NavItem({
  icon: Icon,
  label,
  active,
  count,
  onClick,
}: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className="
        relative flex flex-col items-center gap-1
        text-xs cursor-pointer
      "
    >
      <div className="relative">
        <Icon
          size={20}
          className={`
            transition
            ${active ? "text-primary" : "text-zinc-400"}
          `}
        />

        {typeof count === "number" && count > 0 && (
          <span
            className="
              absolute -top-2 -right-3
              min-w-[18px] h-[18px]
              px-1
              rounded-full
              bg-primary
              text-white text-[10px]
              flex items-center justify-center
            "
          >
            {count}
          </span>
        )}
      </div>

      <span
        className={`
          transition
          ${active ? "text-primary" : "text-zinc-400"}
        `}
      >
        {label}
      </span>
    </button>
  );
}
