import { formatDayLabel } from './formatters';

// Дані по днях
export function buildDaysChartData(days, statistics = []) {
  const map = Object.fromEntries(statistics.map(item => [item.date, item]));

  return days.map(date => {
    const key = date.toISOString().slice(0, 10);
    const values = map[key] || {};

    return {
      name: formatDayLabel(date),
      date: key,
      l1: values.l1 || 0,
      l2: values.l2 || 0,
      l3: values.l3 || 0,
    };
  });
}

function formatRange(start, end) {
  const pad = n => n.toString().padStart(2, '0');
  return `${pad(start.getDate())}/${pad(start.getMonth() + 1)} – ${pad(end.getDate())}/${pad(end.getMonth() + 1)}`;
}

// Дані по тижнях для місячного графіку
export function buildMonthChartData(weeks, valuesByDate = {}) {
  return weeks.map(week => {
    let l1 = 0;
    let l2 = 0;
    let l3 = 0;

    const d = new Date(week.start);

    while (d <= week.end) {
      const key = d.toISOString().slice(0, 10);
      const values = valuesByDate[key] || {};

      l1 += values.l1 || 0;
      l2 += values.l2 || 0;
      l3 += values.l3 || 0;

      d.setDate(d.getDate() + 1);
    }

    return {
      name: formatRange(week.start, week.end),
      l1,
      l2,
      l3,
      total: l1 + l2 + l3,
    };
  });
}

export function buildWeeksAggregatedData(
  weeks,
  statistics = [],
  labelMode = 'month',
  indexOffset = 0
) {
  const map = Object.fromEntries(statistics.map(item => [item.date, item]));

  return weeks.map((week, index) => {
    let l1 = 0;
    let l2 = 0;
    let l3 = 0;

    const d = new Date(week.start);
    while (d <= week.end) {
      const key = d.toISOString().slice(0, 10);
      const values = map[key] || {};

      l1 += values.l1 || 0;
      l2 += values.l2 || 0;
      l3 += values.l3 || 0;

      d.setDate(d.getDate() + 1);
    }

    // Вибір підпису залежно від labelMode
    let name;
    if (labelMode === 'year') {
      // додаємо indexOffset для правильної глобальної нумерації
      name = (week.label ?? index) + 1 + indexOffset;
    } else {
      name = formatRange(week.start, week.end);
    }

    return {
      name,
      l1,
      l2,
      l3,
    };
  });
}

export function calculateAverage(data, line = 'total') {
  if (!data.length) return 0;

  let sum = 0;
  let count = 0; // лічильник робочих днів/тижнів

  for (const item of data) {
    const value =
      line === 'total'
        ? (item.l1 || 0) + (item.l2 || 0) + (item.l3 || 0)
        : item[line] || 0;

    if (value > 0) count++; // якщо є хоча б одне замовлення, враховуємо
    sum += value;
  }

  return count ? sum / count : 0;
}
