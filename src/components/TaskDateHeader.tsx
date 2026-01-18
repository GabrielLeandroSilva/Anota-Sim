import { CalendarDays } from "lucide-react";
import { formatDate } from "../app/utils/formatDate";

interface TaskDateHeaderProps {
    date: string;
}

export function TaskDateHeader({ date }: TaskDateHeaderProps) {
    return (
    <div className="flex items-center gap-2 mt-6 mb-2 text-sm text-primary">
      <CalendarDays size={16} />
      <span className="font-medium">{formatDate(date)}</span>
    </div>
    )
}