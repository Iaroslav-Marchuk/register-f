import css from './ReportTableRow.module.css';

function ReportTableRow({ order, user }) {
  const {
    local,
    ep,
    client,
    order: { total, completed, missed = null, m2 } = {},
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
        <td>{m2.toFixed(2)}</td>
        <td>{butylLot}</td>
        <td>{silicaLot}</td>
        <td>{white}</td>
        <td>{black}</td>
        <td className={css.textLeft}>
          {notes} {missed ? `Faltam ${missed}` : ''}
        </td>
        <td>{user.name}</td>
        <td>{local}</td>
        <td>{date}</td>
      </tr>
    </>
  );
}

export default ReportTableRow;
