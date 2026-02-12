export function getWeekRange(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay() || 7;
  const monday = new Date(d);
  monday.setDate(d.getDate() - day + 1);

  const days = Array.from({ length: 7 }, (_, i) => {
    const current = new Date(monday);
    current.setDate(monday.getDate() + i);
    return current;
  });

  return days;
}

export function getMonthDays(year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return Array.from({ length: daysInMonth }, (_, i) => {
    return new Date(year, month, i + 1);
  });
}

export function getWeeksInYear(year) {
  const weeks = [];
  const date = new Date(year, 0, 1);

  while (date.getFullYear() === year) {
    const week = getWeekRange(date);
    weeks.push(week);
    date.setDate(date.getDate() + 7);
  }

  return weeks;
}

export function getWeeksInMonth(year, month) {
  const result = [];

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  let current = new Date(firstDay);

  // зсув на понеділок
  const day = current.getDay() || 7;
  current.setDate(current.getDate() - (day - 1));

  while (current <= lastDay) {
    const weekStart = new Date(current);
    const weekEnd = new Date(current);
    weekEnd.setDate(weekEnd.getDate() + 6);

    result.push({ start: weekStart, end: weekEnd });

    current.setDate(current.getDate() + 7);
  }

  return result;
}
