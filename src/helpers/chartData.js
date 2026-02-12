import { formatDayLabel, formatWeekLabel } from './formatters';

export function buildWeekChartData(days, valuesMap = {}) {
  return days.map(date => {
    const key = date.toISOString().slice(0, 10);

    return {
      name: formatDayLabel(date),
      value: valuesMap[key] || 0,
      date: key,
    };
  });
}

export function buildWeeksChartData(weeks, valuesByWeek = []) {
  return weeks.map((week, index) => ({
    name: formatWeekLabel(index),
    value: valuesByWeek[index] || 0,
    weekIndex: index,
  }));
}

function formatRange(start, end) {
  const sameMonth = start.getMonth() === end.getMonth();

  const startStr = start.toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'short',
  });

  const endStr = end.toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: sameMonth ? undefined : 'short',
  });

  return `${startStr} – ${endStr}`;
}

export function buildMonthChartData(weeks, valuesByDate) {
  return weeks.map(week => {
    let sum = 0;

    const d = new Date(week.start);
    while (d <= week.end) {
      const key = d.toISOString().slice(0, 10);
      sum += valuesByDate[key] || 0;
      d.setDate(d.getDate() + 1);
    }

    const rangeLabel = formatRange(week.start, week.end);

    return {
      name: rangeLabel,
      value: sum,
    };
  });
}
