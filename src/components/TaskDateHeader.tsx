import { CalendarDays } from "lucide-react";
import { formatDate } from "../app/utils/formatDate";
import { isToday } from "../app/utils/date";

interface TaskDateHeaderProps {
    date: string;
}

export function TaskDateHeader({ date }: TaskDateHeaderProps) {
  const today = isToday(date);
  
  return (
    <div className="flex items-center gap-2 mt-6 mb-2 text-sm text-primary">
      <CalendarDays size={16} />
      <span className="font-medium">{formatDate(date)}</span>

      {today && (
        <span className="text-xs px-2 py-0.5 rounded-full bg-primary text-white">
          Hoje
        </span>
      )}

    </div>
    )
}