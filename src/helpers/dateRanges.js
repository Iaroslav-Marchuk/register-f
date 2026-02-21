export function getWeekRange(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay() || 7;
  const monday = new Date(d);
  monday.setDate(d.getDate() - day + 1);

  return Array.from({ length: 7 }, (_, i) => {
    const current = new Date(monday);
    current.setDate(monday.getDate() + i);
    return current;
  });
}

export function getWeeksInMonthRange(year, month) {
  const result = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  let current = new Date(firstDay);
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

// export function getWeeksInYearRange(year) {
//   const weeks = [];

//   let date = new Date(year, 0, 1);

//   while (date.getFullYear() === year) {
//     const weekStart = new Date(date);

//     const weekEnd = new Date(date);
//     const day = weekEnd.getDay() || 7;
//     weekEnd.setDate(weekEnd.getDate() + (7 - day));
//     if (weekEnd.getFullYear() > year) weekEnd.setFullYear(year, 11, 31);

//     weeks.push({ start: weekStart, end: weekEnd });

//     date = new Date(weekEnd);
//     date.setDate(date.getDate() + 1);
//   }

//   return weeks;
// }

export function getWeeksInYearRange(year) {
  const weeks = [];

  const firstDay = new Date(year, 0, 1);
  const lastDay = new Date(year, 11, 31);

  let current = new Date(firstDay);

  // Зсунути до понеділка
  const day = current.getDay() || 7;
  current.setDate(current.getDate() - (day - 1));

  while (current <= lastDay) {
    const weekStart = new Date(current);
    const weekEnd = new Date(current);
    weekEnd.setDate(weekEnd.getDate() + 6);

    weeks.push({ start: weekStart, end: weekEnd });

    current.setDate(current.getDate() + 7);
  }

  return weeks;
}
