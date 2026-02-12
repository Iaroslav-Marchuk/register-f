import { useMemo, useState } from 'react';
import { clsx } from 'clsx';
import { ChevronRight, ChevronLeft } from 'lucide-react';

import css from './StatsDashboard.module.css';
import SimpleBarChart from '../SimpleBarChart/SimpleBarChart.jsx';

import {
  getWeekRange,
  getWeeksInMonth,
  getWeeksInYear,
} from '../../helpers/dateRanges.js';
import {
  buildMonthChartData,
  buildWeekChartData,
} from '../../helpers/chartData.js';
import StackedBarChart from '../StackedBarChart/StackedBarChart.jsx';

function StatsDashboard() {
  const DAYGOAL = 1000;
  const WEEKGOAL = 5000;

  const DAYMEDIUM = 960;
  const WEEKMEDIUM = 4600;

  const GOAL = 380;
  const MEDIUM = 330;
  const WEEKS_PER_PAGE = 18;

  const today = useMemo(() => new Date(), []);
  const CURRENT_YEAR = today.getFullYear();
  const YEARS = Array.from({ length: 3 }, (_, i) => CURRENT_YEAR - i).reverse();

  const [period, setPeriod] = useState('week'); // week | month | year
  const [line, setLine] = useState('total'); // total | l1 | l2 | l3

  const [weekOffset, setWeekOffset] = useState(0);
  const [yearPage, setYearPage] = useState(0);

  const [year, setYear] = useState(CURRENT_YEAR);

  const onYearChange = newYear => {
    setYear(newYear);

    if (newYear === CURRENT_YEAR) {
      setPeriod('week');
      setWeekOffset(0);
      setMonthOffset(0);
    } else {
      setPeriod('year');
      setYearPage(0);
      setWeekOffset(0);
      setMonthOffset(0);
    }
  };

  const [monthOffset, setMonthOffset] = useState(0);

  const baseMonthDate = useMemo(() => {
    let base;

    if (year === CURRENT_YEAR) {
      base = new Date(today);
    } else {
      base = new Date(year, 11, 1); // 🔥 грудень вибраного року
    }

    base.setMonth(base.getMonth() - monthOffset);
    return base;
  }, [today, monthOffset, year, CURRENT_YEAR]);

  const monthWeeks = useMemo(() => {
    return getWeeksInMonth(
      baseMonthDate.getFullYear(),
      baseMonthDate.getMonth()
    );
  }, [baseMonthDate]);

  const monthValues = {
    '2026-02-01': 50,
    '2026-02-02': 40,
    '2026-02-10': 120,
    '2026-02-11': 80,
  };

  const monthData = useMemo(() => {
    return buildMonthChartData(monthWeeks, monthValues);
  }, [monthWeeks]);

  const baseDate = useMemo(() => {
    let base;

    if (year === CURRENT_YEAR) {
      base = new Date(today);
    } else {
      base = new Date(year, 11, 31); // 🔥 старт з кінця року
    }

    base.setDate(base.getDate() - weekOffset * 7);
    return base;
  }, [today, weekOffset, year, CURRENT_YEAR]);

  const days = getWeekRange(baseDate);

  const weekValues = {
    '2026-02-10': 120, // тут вставити дані з бекенду!!
    '2026-02-11': 80,
  };

  const weekData = buildWeekChartData(days, weekValues);

  const allWeeks = useMemo(() => getWeeksInYear(year), [year]);

  // const allWeeks = getWeeksInYear(CURRENT_YEAR);
  const start = yearPage * WEEKS_PER_PAGE;
  const end = start + WEEKS_PER_PAGE;

  const visibleWeeks = allWeeks.slice(start, end);

  const yearData = useMemo(() => {
    return visibleWeeks.map((week, i) => {
      const l1 = Math.floor(Math.random() * 200);
      const l2 = Math.floor(Math.random() * 200);
      const l3 = Math.floor(Math.random() * 200);

      return {
        name: `${start + i + 1}`,
        value: l1 + l2 + l3, // для SimpleBarChart
        l1,
        l2,
        l3,
      };
    });
  }, [visibleWeeks, start]);

  const isWeekPrevDisabled = useMemo(() => {
    const firstAllowed = new Date(year, 0, 1);
    const currentStart = new Date(days[0]);
    return currentStart <= firstAllowed;
  }, [days, year]);

  const isWeekNextDisabled = useMemo(() => {
    if (year === CURRENT_YEAR) {
      return weekOffset === 0; // далі ніж сьогодні йти не можна
    }
    // для минулих років дозволяємо рухатися вперед поки не дійдемо до кінця року
    const lastAllowed = new Date(year, 11, 31);
    const currentEnd = new Date(days[6]);
    return currentEnd >= lastAllowed;
  }, [weekOffset, days, year, CURRENT_YEAR]);

  const isMonthPrevDisabled = useMemo(() => {
    const firstAllowed = new Date(year, 0, 1); // січень вибраного року
    const currentMonth = new Date(
      baseMonthDate.getFullYear(),
      baseMonthDate.getMonth(),
      1
    );
    return currentMonth <= firstAllowed;
  }, [baseMonthDate, year]);

  const isMonthNextDisabled = useMemo(() => {
    const currentMonth = new Date(
      baseMonthDate.getFullYear(),
      baseMonthDate.getMonth(),
      1
    );

    if (year === CURRENT_YEAR) {
      const currentRealMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );
      return currentMonth >= currentRealMonth;
    }

    const lastAllowed = new Date(year, 11, 1); // грудень вибраного року
    return currentMonth >= lastAllowed;
  }, [baseMonthDate, year, CURRENT_YEAR, today]);

  const goal =
    period === 'week' ? WEEKGOAL : period === 'month' ? GOAL : WEEKGOAL * 4;

  const medium =
    period === 'week'
      ? WEEKMEDIUM
      : period === 'month'
        ? MEDIUM
        : WEEKMEDIUM * 4;

  const DATA =
    period === 'week' ? weekData : period === 'month' ? monthData : yearData;

  return (
    <div className={css.wrapper}>
      <div className={css.topBar}>
        <span className={css.tableTitle}>Progresso do trabalho</span>
        <div className={css.btsList}>
          <button
            type="button"
            onClick={() => setPeriod('week')}
            className={clsx(css.topBtn, { [css.activeTop]: period === 'week' })}
          >
            por semana
          </button>
          <button
            type="button"
            onClick={() => setPeriod('month')}
            className={clsx(css.topBtn, {
              [css.activeTop]: period === 'month',
            })}
          >
            por mês
          </button>
          <button
            type="button"
            onClick={() => setPeriod('year')}
            className={clsx(css.topBtn, { [css.activeTop]: period === 'year' })}
          >
            por ano
          </button>
          <div className={css.yearSelect}>
            <select
              value={year}
              onChange={e => onYearChange(Number(e.target.value))}
              className={css.select}
            >
              {YEARS.map(y => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className={css.rangeInfo}>
        {period === 'week' && (
          <span>
            {days[0].toLocaleDateString('pt-PT')} –{' '}
            {days[6].toLocaleDateString('pt-PT')}
          </span>
        )}

        {period === 'month' && (
          <span>
            {baseMonthDate.toLocaleDateString('pt-PT', {
              month: 'long',
              year: 'numeric',
            })}
          </span>
        )}

        {period === 'year' && (
          <span>
            Semanas {start + 1} – {Math.min(end, allWeeks.length)}
          </span>
        )}
      </div>
      <div className={css.dashboardWrapper}>
        <div className={css.sideBar}>
          <button
            type="button"
            onClick={() => setLine('total')}
            className={clsx(css.sideBtn, {
              [css.activeSide]: line === 'total',
            })}
          >
            Total
          </button>
          <button
            type="button"
            onClick={() => setLine('l1')}
            className={clsx(css.sideBtn, { [css.activeSide]: line === 'l1' })}
          >
            Linha 1
          </button>
          <button
            type="button"
            onClick={() => setLine('l2')}
            className={clsx(css.sideBtn, { [css.activeSide]: line === 'l2' })}
          >
            Linha 2
          </button>
          <button
            type="button"
            onClick={() => setLine('l3')}
            className={clsx(css.sideBtn, { [css.activeSide]: line === 'l3' })}
          >
            Linha 3
          </button>
        </div>
        <div className={css.diagram}>
          <div className={css.navBtn}>
            {!(
              (period === 'week' && isWeekPrevDisabled) ||
              (period === 'month' && isMonthPrevDisabled) ||
              (period === 'year' && yearPage === 0)
            ) && (
              <button
                type="button"
                onClick={() => {
                  if (period === 'week') setWeekOffset(p => p + 1);
                  if (period === 'month') setMonthOffset(p => p + 1);
                  if (period === 'year') setYearPage(p => Math.max(0, p - 1));
                }}
              >
                <ChevronLeft />
              </button>
            )}
          </div>

          {line === 'total' ? (
            <StackedBarChart goal={goal} medium={medium} data={DATA} />
          ) : (
            <SimpleBarChart data={DATA} medium={medium} />
          )}

          <div className={css.navBtn}>
            {!(
              (period === 'week' && isWeekNextDisabled) ||
              (period === 'month' && isMonthNextDisabled) ||
              (period === 'year' &&
                (yearPage + 1) * WEEKS_PER_PAGE >= allWeeks.length)
            ) && (
              <button
                type="button"
                onClick={() => {
                  if (period === 'week') setWeekOffset(p => Math.max(0, p - 1));
                  if (period === 'month')
                    setMonthOffset(p => Math.max(0, p - 1));
                  if (period === 'year') setYearPage(p => p + 1);
                }}
              >
                <ChevronRight />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsDashboard;
