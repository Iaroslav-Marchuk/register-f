import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';

import {
  selectActivity,
  selectActivityIsloading,
} from '../../redux/orders/selectors.js';
import { getUserDailyActivity } from '../../redux/orders/operations.js';

import css from './ActivityDashboard.module.css';

function ActivityDashboard({ year, onYearChange }) {
  const dispatch = useDispatch();

  const dailyActivity = useSelector(selectActivity);
  const activityIsLoading = useSelector(selectActivityIsloading);

  useEffect(() => {
    dispatch(getUserDailyActivity(year));
  }, [year, dispatch]);

  const activityMap = {};
  dailyActivity.forEach(day => {
    activityMap[day.date] = {
      completedItems: day.totalCompletedItems,
      completedM2: day.totalCompletedM2,
    };
  });

  const DAYS = ['Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.', 'Dom.'];
  const MONTHS = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];
  const CURRENT_YEAR = new Date().getFullYear();
  const YEARS = Array.from({ length: 3 }, (_, i) => CURRENT_YEAR - i).reverse();

  function generateDaysOfYear(year) {
    const daysOfYear = [];
    const date = new Date(year, 0, 1);
    while (date.getFullYear() === year) {
      daysOfYear.push({
        date: date.toISOString().slice(0, 10),
        jsDate: new Date(date),
      });
      date.setDate(date.getDate() + 1);
    }
    return daysOfYear;
  }

  function getStartOffset(firstDate) {
    const day = firstDate.getDay();
    return day === 0 ? 6 : day - 1;
  }

  function buildCalendarCells(year) {
    const days = generateDaysOfYear(year);
    const offset = getStartOffset(days[0].jsDate);
    const cells = Array(offset).fill(null).concat(days);
    return cells;
  }

  const cells = buildCalendarCells(year);

  function getMonthLabels(cells) {
    const labels = [];
    let lastWeek = -10;

    cells.forEach((day, index) => {
      if (!day) return;

      const d = day.jsDate;
      if (d.getDate() === 1) {
        const weekIndex = Math.floor(index / 7);

        if (weekIndex - lastWeek >= 2) {
          labels.push({
            weekIndex,
            label: MONTHS[d.getMonth()],
          });
          lastWeek = weekIndex;
        }
      }
    });

    return labels;
  }
  const monthLabels = getMonthLabels(cells);

  return (
    <>
      {activityIsLoading ? (
        <Stack spacing={1}>
          <Skeleton variant="rectangular" height={20} width={672} />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Skeleton variant="rectangular" height={110} width={32} />

            <Skeleton variant="rectangular" height={110} width={634} />
          </Box>
        </Stack>
      ) : (
        <div className={css.wrapper}>
          <div className={css.calendarGrid}>
            <div className={css.emptyCell}></div>
            <div className={css.dayLabels}>
              {DAYS.map(d => (
                <span key={d}>{d}</span>
              ))}
            </div>
            <div className={css.monthLabels}>
              {monthLabels.map(m => (
                <span
                  key={m.weekIndex}
                  className={css.monthLabel}
                  style={{ gridColumn: m.weekIndex + 1 }}
                >
                  {m.label}
                </span>
              ))}
            </div>
            <div className={css.daysGrid}>
              {cells.map((day, i) => {
                if (!day)
                  return <div key={i} className={css.day} data-empty={true} />;

                const activity = activityMap[day.date];

                const hasData = Boolean(activity);

                const completedItems = hasData ? activity.completedItems : 0;
                const completedM2 = hasData ? activity.completedM2 : 0;

                const value = completedM2;
                let level = 0;
                if (value > 500) level = 5;
                else if (value > 400) level = 4;
                else if (value > 300) level = 3;
                else if (value > 200) level = 2;
                else if (value > 100) level = 1;

                const tooltip = hasData
                  ? `${day.date}: ${completedItems} vidros, ${completedM2} m²`
                  : `${day.date}: sem resultados`;

                return (
                  <div
                    key={i}
                    className={`${css.day} ${css[`l${level}`]} ${!hasData ? css.emptyDay : ''}`}
                    title={tooltip}
                  />
                );
              })}
            </div>
          </div>

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
      )}

      <div className={css.legendContainer}>
        <span className={css.legend}>Lenda:</span>
        <ul className={css.legendList}>
          <li className={css.legendItem}>
            <div className={`${css.day} ${css.l0}`} />
            0-100
          </li>
          <li className={css.legendItem}>
            <div className={`${css.day} ${css.l1}`} />
            101-200
          </li>
          <li className={css.legendItem}>
            <div className={`${css.day} ${css.l2}`} />
            201-300
          </li>
          <li className={css.legendItem}>
            <div className={`${css.day} ${css.l3}`} />
            301-400
          </li>
          <li className={css.legendItem}>
            <div className={`${css.day} ${css.l4}`} />
            401-500
          </li>
          <li className={css.legendItem}>
            <div className={`${css.day} ${css.l5}`} />
            +501
          </li>
        </ul>
      </div>
    </>
  );
}

export default ActivityDashboard;
