export interface Task {
    id: string;
    title: string;
    completed: boolean;
    date: string;
    category: string;
    isHabit?: boolean;
    completedDates?: string[];
}