// Отримати всі дні тижня для заданої дати (починаючи з понеділка)
export function getWeekRange(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay() || 7; // якщо неділя, робимо 7
  const monday = new Date(d);
  monday.setDate(d.getDate() - day + 1);

  return Array.from({ length: 7 }, (_, i) => {
    const current = new Date(monday);
    current.setDate(monday.getDate() + i);
    return current;
  });
}

// Отримати всі тижні місяця
export function getWeeksInMonthRange(year, month) {
  const result = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  let current = new Date(firstDay);
  const day = current.getDay() || 7;
  current.setDate(current.getDate() - (day - 1)); // зсув на понеділок

  while (current <= lastDay) {
    const weekStart = new Date(current);
    const weekEnd = new Date(current);
    weekEnd.setDate(weekEnd.getDate() + 6);

    result.push({ start: weekStart, end: weekEnd });
    current.setDate(current.getDate() + 7);
  }

  return result;
}

// Отримати всі тижні року
export function getWeeksInYearRange(year) {
  const weeks = [];

  // перший день року
  let date = new Date(year, 0, 1);

  while (date.getFullYear() === year) {
    const weekStart = new Date(date);

    // закінчення тижня = неділя або кінець року
    const weekEnd = new Date(date);
    const day = weekEnd.getDay() || 7; // неділя = 7
    weekEnd.setDate(weekEnd.getDate() + (7 - day));
    if (weekEnd.getFullYear() > year) weekEnd.setFullYear(year, 11, 31);

    weeks.push({ start: weekStart, end: weekEnd });

    // наступний тиждень = день після кінця поточного
    date = new Date(weekEnd);
    date.setDate(date.getDate() + 1);
  }

  return weeks;
}
