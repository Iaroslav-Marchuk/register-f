// Формат короткого позначення дня (Пт-12/02)
export function formatDayLabel(date) {
  return date.toLocaleDateString('pt-PT', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
  });
}
