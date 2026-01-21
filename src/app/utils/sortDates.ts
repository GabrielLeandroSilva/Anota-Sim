import { parseDate, isToday } from "./date";

export function sortTaskDates(dates: string[]): string[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return dates.sort((a, b) => {
    const dateA = parseDate(a);
    const dateB = parseDate(b);

    const isTodayA = isToday(a);
    const isTodayB = isToday(b);

    //Hoje sempre no topo
    if (isTodayA && !isTodayB) return -1;
    if (!isTodayA && isTodayB) return 1;

    const diffA = dateA.getTime() - today.getTime();
    const diffB = dateB.getTime() - today.getTime();

    //Datas passadas antes das futuras
    if (diffA < 0 && diffB >= 0) return -1;
    if (diffA >= 0 && diffB < 0) return 1;

    //Passadas: mais recente primeiro
    if (diffA < 0 && diffB < 0) {
      return dateB.getTime() - dateA.getTime();
    }

    //Futuras: mais próxima primeiro
    return dateA.getTime() - dateB.getTime();
  });
}
