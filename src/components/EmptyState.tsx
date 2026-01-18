import { Inbox } from "lucide-react";

interface EmptyStateProps {
    message: string
}

export function EmptyState({ message }: EmptyStateProps) {
    return (
        <div
          className="flex flex-col items-center gap-3 text-zinc-400">
          <Inbox size={48} className="opacity-60 text-primary" />
          <p className="text-lg font-medium">
            {message}
          </p>
        </div>
      );
}