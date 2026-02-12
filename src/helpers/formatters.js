export function formatDayLabel(date) {
  return date.toLocaleDateString('pt-PT', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
  });
}

export function formatMonthLabel(date) {
  return date.toLocaleDateString('pt-PT', {
    month: 'short',
  });
}

export function formatWeekLabel(weekIndex) {
  return `${weekIndex + 1}`;
}
