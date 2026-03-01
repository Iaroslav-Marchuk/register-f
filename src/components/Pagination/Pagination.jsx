import { CircleChevronLeft, CircleChevronRight } from 'lucide-react';

import css from './Pagination.module.css';
import clsx from 'clsx';

function Pagination({ page, totalPages, onPageChange }) {
  const getPages = (page, totalPages) => {
    const pages = [];

    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, page + 2);

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPages(page, totalPages);

  return (
    <>
      <div className={css.paginationContainer}>
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className={css.arrow}
        >
          <CircleChevronLeft
            size={36}
            strokeWidth={1}
            className={css.arrowIcon}
          />
        </button>

        {pages.map((p, i) =>
          p === '...' ? (
            <span key={`dots-${i}`} className={css.dots}>
              …
            </span>
          ) : (
            <button
              key={`page-${p}`}
              onClick={() => onPageChange(p)}
              className={clsx(css.pageBtn, p === page && css.isActive)}
            >
              {p}
            </button>
          )
        )}

        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className={css.arrow}
        >
          <CircleChevronRight
            size={36}
            strokeWidth={1}
            className={css.arrowIcon}
          />
        </button>
      </div>

      <div className={css.mobilePagination}>
        <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
          <CircleChevronLeft
            size={36}
            strokeWidth={1}
            className={css.arrowIcon}
          />
        </button>

        <span>
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          <CircleChevronRight
            size={36}
            strokeWidth={1}
            className={css.arrowIcon}
          />
        </button>
      </div>
    </>
  );
}

export default Pagination;
