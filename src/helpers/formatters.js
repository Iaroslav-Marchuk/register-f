// Формат короткого позначення дня (Пт-12/02)
export function formatDayLabel(date) {
  return date.toLocaleDateString('pt-PT', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
  });
}

export function formatNumber(value) {
  return new Intl.NumberFormat('pt-PT', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value || 0);
}
