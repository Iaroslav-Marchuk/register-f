import clsx from 'clsx';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import StackedBarChart from '../StackedBarChart/StackedBarChart.jsx';
import SimpleBarChart from '../SimpleBarChart/SimpleBarChart.jsx';

import { getFullStatisticForYear } from '../../redux/orders/operations.js';

import {
  selectStatisticsByYear,
  selectStatisticsIsLoading,
} from '../../redux/orders/selectors.js';

import {
  buildDaysChartData,
  buildWeeksAggregatedData,
  calculateAverage,
} from '../../helpers/builders.js';

import {
  getWeekRange,
  getWeeksInMonthRange,
  getWeeksInYearRange,
} from '../../helpers/dateRanges.js';

import css from './StatsDashboard.module.css';

function StatsDashboard() {
  const WEEKS_PER_PAGE = 18;
  const DAY_GOAL = 1000;
  const WEEK_GOAL = 5000;
  const CURRENT_YEAR = new Date().getFullYear();

  const YEARS_LIST = Array.from(
    { length: 3 },
    (_, i) => CURRENT_YEAR - i
  ).reverse();

  const [searchParams, setSearchParams] = useSearchParams();
  const urlYear = Number(searchParams.get('year')) || CURRENT_YEAR;

  const [selectedYear, setSelectedYear] = useState(urlYear ?? CURRENT_YEAR);

  const [period, setPeriod] = useState('week');
  const [line, setLine] = useState('total');

  const [weekOffset, setWeekOffset] = useState(0);
  const [monthOffset, setMonthOffset] = useState(0);
  const [yearPage, setYearPage] = useState(0);

  const dispatch = useDispatch();
  const today = useMemo(() => new Date(), []);
  const statisticsByYear = useSelector(state =>
    selectStatisticsByYear(state, selectedYear)
  );

  const WEEKS_IN_YEAR = useMemo(
    () => getWeeksInYearRange(selectedYear).length,
    [selectedYear]
  );

  const statisticsIsLoading = useSelector(selectStatisticsIsLoading);

  useEffect(() => {
    dispatch(getFullStatisticForYear(selectedYear));
  }, [selectedYear, dispatch]);

  const handleYearChange = newYear => {
    const params = new URLSearchParams(searchParams);
    params.set('year', newYear);
    setSearchParams(params);
    setSelectedYear(newYear);

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

  // Базова дата для тижня
  const baseDate = useMemo(() => {
    let base =
      selectedYear === CURRENT_YEAR
        ? new Date(today)
        : new Date(selectedYear, 0, 1);
    base.setDate(base.getDate() + weekOffset * 7);
    return base;
  }, [today, weekOffset, selectedYear, CURRENT_YEAR]);

  const days = getWeekRange(baseDate);

  // базова дата для місяця
  const baseMonthDate = useMemo(() => {
    let base =
      selectedYear === CURRENT_YEAR
        ? new Date(today)
        : new Date(selectedYear, 0, 1);
    base.setMonth(base.getMonth() + monthOffset);
    return base;
  }, [today, monthOffset, selectedYear, CURRENT_YEAR]);

  const monthWeeks = useMemo(() => {
    return getWeeksInMonthRange(
      baseMonthDate.getFullYear(),
      baseMonthDate.getMonth()
    );
  }, [baseMonthDate]);

  const allWeeks = useMemo(
    () => getWeeksInYearRange(selectedYear),
    [selectedYear]
  );
  const start = yearPage * WEEKS_PER_PAGE;
  const end = start + WEEKS_PER_PAGE;
  const visibleWeeks = allWeeks.slice(start, end);

  // === NAVIGATION LOGIC ===
  const { minWeekDate, maxWeekDate } = useMemo(() => {
    const minWeekDate = new Date(selectedYear, 0, 1); // 1 січня вибраного року
    const maxWeekDate =
      selectedYear === CURRENT_YEAR
        ? today // для поточного року максимум сьогодні
        : new Date(selectedYear, 11, 31); // для минулих років максимум 31 грудня

    const minMonthDate = new Date(selectedYear, 0, 1); // перший місяць року
    const maxMonthDate =
      selectedYear === CURRENT_YEAR
        ? new Date(today.getFullYear(), today.getMonth(), 1) // поточний місяць
        : new Date(selectedYear, 11, 1); // грудень для минулих років

    return { minWeekDate, maxWeekDate, minMonthDate, maxMonthDate };
  }, [selectedYear, CURRENT_YEAR, today]);

  // === Week navigation ===
  const isWeekPrevDisabled = useMemo(
    () => days[0] <= minWeekDate,
    [days, minWeekDate]
  );
  const isWeekNextDisabled = useMemo(
    () => days[6] >= maxWeekDate,
    [days, maxWeekDate]
  );

  // === Month navigation ===
  const isMonthPrevDisabled = useMemo(() => {
    // Якщо ми в поточному році, не можна гортати в минуле за січень
    if (selectedYear === CURRENT_YEAR) {
      return baseMonthDate.getMonth() === 0;
    }
    // Для минулих років: не можна гортати лівіше грудня минулого року (перший місяць року)
    return baseMonthDate.getMonth() === 0;
  }, [baseMonthDate, selectedYear, CURRENT_YEAR]);

  const isMonthNextDisabled = useMemo(() => {
    // Якщо поточний рік — не можна йти далі поточного місяця
    if (selectedYear === CURRENT_YEAR) {
      return baseMonthDate.getMonth() >= today.getMonth();
    }
    // Для минулих років — грудень останній
    return baseMonthDate.getMonth() === 11;
  }, [baseMonthDate, selectedYear, CURRENT_YEAR, today]);

  // === Year navigation ===
  const isYearPrevDisabled = yearPage === 0;
  const isYearNextDisabled = (yearPage + 1) * WEEKS_PER_PAGE >= allWeeks.length;

  // === Handlers for buttons ===
  const handlePrev = () => {
    if (period === 'week') setWeekOffset(p => p - 1);
    if (period === 'month') setMonthOffset(p => p - 1);
    if (period === 'year') setYearPage(p => Math.max(0, p - 1));
  };

  const handleNext = () => {
    if (period === 'week') setWeekOffset(p => p + 1);
    if (period === 'month') setMonthOffset(p => p + 1);
    if (period === 'year') setYearPage(p => p + 1);
  };

  const periodData = useMemo(() => {
    if (!Array.isArray(statisticsByYear)) return [];

    switch (period) {
      case 'week':
        return buildDaysChartData(days, statisticsByYear);

      case 'month':
        return buildWeeksAggregatedData(monthWeeks, statisticsByYear, 'month');

      case 'year':
        return buildWeeksAggregatedData(
          visibleWeeks,
          statisticsByYear,
          'year',
          start // додатковий параметр offset для глобальної нумерації
        );

      default:
        return [];
    }
  }, [statisticsByYear, period, days, monthWeeks, visibleWeeks, start]);

  const average = useMemo(() => {
    if (period === 'year') {
      const totalSum = statisticsByYear.reduce((acc, item) => {
        if (line === 'total') {
          return acc + (item.l1 || 0) + (item.l2 || 0) + (item.l3 || 0);
        }
        return acc + (item[line] || 0);
      }, 0);

      return totalSum / WEEKS_IN_YEAR;
    }

    return calculateAverage(periodData, line);
  }, [statisticsByYear, period, line, periodData, WEEKS_IN_YEAR]);

  const goal = period === 'week' ? DAY_GOAL : WEEK_GOAL;

  let chart;

  if (statisticsIsLoading) {
    chart = (
      <Stack spacing={1}>
        <Skeleton variant="rectangular" height={330} width={1032} />
      </Stack>
    );
  } else if (line === 'total') {
    chart = <StackedBarChart goal={goal} medium={average} data={periodData} />;
  } else {
    chart = (
      <SimpleBarChart
        data={periodData.map(item => ({
          name: item.name,
          value: item[line] ?? 0,
        }))}
        medium={average}
      />
    );
  }

  return (
    <div className={css.wrapper}>
      <div className={css.topBar}>
        <span className={css.tableTitle}>Progresso do trabalho</span>
        <div className={css.btsList}>
          <button
            type="button"
            onClick={() => setPeriod('week')}
            className={clsx(css.topBtn, {
              [css.activeTop]: period === 'week',
            })}
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
            className={clsx(css.topBtn, {
              [css.activeTop]: period === 'year',
            })}
          >
            por ano
          </button>
          <div className={css.yearSelect}>
            <select
              value={selectedYear}
              onChange={e => handleYearChange(Number(e.target.value))}
              className={css.select}
            >
              {YEARS_LIST.map(y => (
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
              (period === 'year' && isYearPrevDisabled)
            ) && (
              <button type="button" onClick={handlePrev}>
                <ChevronLeft />
              </button>
            )}
          </div>

          {chart}

          <div className={css.navBtn}>
            {!(
              (period === 'week' && isWeekNextDisabled) ||
              (period === 'month' && isMonthNextDisabled) ||
              (period === 'year' && isYearNextDisabled)
            ) && (
              <button type="button" onClick={handleNext}>
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
