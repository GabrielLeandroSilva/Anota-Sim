/*
export function isToday(date: string) {
    const today = new Date().toISOString().split("T")[0];
    return date === today;
  }*/

export function parseDate(date: string): Date {
  const [day, month, year] = date.split("/").map(Number);
  return new Date(year, month - 1, day);
}


export function isToday(dateString?: string) {
  if (!dateString) return false;

  const clean = dateString.trim();

  let day: number;
  let month: number;
  let year: number;

  // Formato YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) {
    const [y, m, d] = clean.split("-").map(Number);
    year = y;
    month = m;
    day = d;
  }

  // Formato DD/MM/YYYY
  else if (/^\d{2}\/\d{2}\/\d{4}$/.test(clean)) {
    const [d, m, y] = clean.split("/").map(Number);
    year = y;
    month = m;
    day = d;
  }

  else {
    return false;
  }

  const taskDate = new Date(year, month - 1, day);
  const today = new Date();

  return (
    taskDate.getDate() === today.getDate() &&
    taskDate.getMonth() === today.getMonth() &&
    taskDate.getFullYear() === today.getFullYear()
  );
}

export function isPast(dateString?: string) {
  if (!dateString) return false;

  let day: number;
  let month: number;
  let year: number;

  // YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const [y, m, d] = dateString.split("-").map(Number);
    year = y;
    month = m;
    day = d;
  }
  // DD/MM/YYYY
  else if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
    const [d, m, y] = dateString.split("/").map(Number);
    year = y;
    month = m;
    day = d;
  } else {
    return false;
  }

  const taskDate = new Date(year, month - 1, day);
  const today = new Date();

  // zera hora para comparação correta
  today.setHours(0, 0, 0, 0);
  taskDate.setHours(0, 0, 0, 0);

  return taskDate < today;
}


export function getTodayInputDate() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
