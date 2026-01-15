import ReportTableRow from '../ReportTableRow/ReportTableRow.jsx';
import css from './ReportTable.module.css';

function ReportTable({ ordersList, user }) {
  return (
    <table className={css.table}>
      <thead className={css.header}>
        <tr>
          <th rowSpan={2}>EP</th>
          <th rowSpan={2}>Cliente</th>
          <th colSpan={3}>N de vidros</th>

          <th rowSpan={2}>Lote butyl</th>
          <th rowSpan={2}>Lote sílica</th>
          <th colSpan={2}>Lote polissufuro</th>

          <th rowSpan={2}>Observações</th>
          <th rowSpan={2}>Responsável</th>
          <th rowSpan={2}>Data</th>
        </tr>
        <tr>
          <th>total</th>
          <th>feitos</th>
          <th>
            m<sup>2</sup>
          </th>
          <th>branco</th>
          <th>preto</th>
        </tr>
      </thead>
      <tbody>
        {ordersList.map((order, index) => (
          <ReportTableRow key={index} order={order} user={user} />
        ))}
      </tbody>
    </table>
  );
}

export default ReportTable;
