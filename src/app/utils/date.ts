export function isToday(date: string) {
    const today = new Date().toISOString().split("T")[0];
    return date === today;
  }