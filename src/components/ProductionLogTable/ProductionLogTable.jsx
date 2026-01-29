import ProductionLogTableRow from '../ProductionLogTableRow/ProductionLogTableRow.jsx';
import css from './ProductionLogTable.module.css';

import {
  ArrowDownUp,
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
} from 'lucide-react';

function ProductionLogTable({ ordersList, sortBy, sortOrder, onSortChange }) {
  const handleSortClick = sortField => {
    const newOrder =
      sortBy === sortField && sortOrder === 'desc' ? 'asc' : 'desc';
    onSortChange(sortField, newOrder);
  };

  const getSortIcon = sortField => {
    if (sortBy === sortField) {
      return sortOrder === 'asc' ? (
        <ArrowUpNarrowWide
          className={css.arrowIcon}
          size={20}
          strokeWidth={2}
        />
      ) : (
        <ArrowDownWideNarrow
          className={css.arrowIcon}
          size={20}
          strokeWidth={2}
        />
      );
    }

    return <ArrowDownUp className={css.arrowIcon} size={20} strokeWidth={2} />;
  };

  return (
    <>
      <table className={css.table}>
        <thead className={css.header}>
          <tr>
            <th rowSpan={2}>
              <div className={css.cell}>
                <button
                  className={css.cellBtn}
                  onClick={() => handleSortClick('ep')}
                >
                  {getSortIcon('ep')}
                </button>
                <span>EP</span>
              </div>
            </th>
            <th rowSpan={2}>
              <div className={css.cell}>
                <button
                  className={css.cellBtn}
                  onClick={() => handleSortClick('client')}
                >
                  {getSortIcon('client')}
                </button>
                <span>Cliente</span>
              </div>
            </th>
            <th colSpan={4}>N de vidros</th>

            <th rowSpan={2}>Lote butyl</th>
            <th rowSpan={2}>Lote sílica</th>
            <th colSpan={2}>Lote polissufuro</th>

            <th rowSpan={2}>Observações</th>
            <th rowSpan={2}>Ações</th>
          </tr>
          <tr>
            <th className={css.subtitel}>total, unid.</th>
            <th className={css.subtitel}>
              total, m<sup>2</sup>
            </th>

            <th className={css.subtitel}>feitos, unid.</th>
            <th className={css.subtitel}>
              feito, m<sup>2</sup>
            </th>
            <th className={css.subtitel}>branco</th>
            <th className={css.subtitel}>preto</th>
          </tr>
        </thead>
        <tbody>
          {ordersList.map((order, index) => (
            <ProductionLogTableRow key={index} order={order} />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ProductionLogTable;
