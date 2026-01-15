import css from './ReportTableRow.module.css';

function ReportTableRow({ order, user }) {
  const {
    ep,
    client,
    order: { total, completed, m2 } = {},
    butylLot,
    silicaLot,
    polysulfideLot: { white, black } = {},
    notes,
    createdAt,
  } = order;

  const date = new Date(createdAt).toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });

  return (
    <>
      <tr>
        <td>{String(ep).padStart(5, '0')}</td>
        <td className={css.textLeft}>{client}</td>
        <td>{total}</td>
        <td>{completed}</td>
        <td>{m2}</td>
        <td>{butylLot}</td>
        <td>{silicaLot}</td>
        <td>{white}</td>
        <td>{black}</td>
        <td className={css.textLeft}>{notes}</td>
        <td>{user.name}</td>
        <td>{date}</td>
      </tr>
    </>
  );
}

export default ReportTableRow;
