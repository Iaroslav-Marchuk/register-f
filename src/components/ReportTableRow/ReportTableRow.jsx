import css from './ReportTableRow.module.css';

function ReportTableRow({ order }) {
  const {
    local,
    ep,
    client,
    totalItems,
    totalM2,
    completedItems,
    completedM2,
    missedItems,
    butylLot,
    silicaLot,
    polysulfideLot: { white, black } = {},
    checkedNotes,
    type,
    isFinal,
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
        <td>{type === 'created' && totalItems}</td>
        <td>{type === 'created' && totalM2.toFixed(2)}</td>
        <td>{completedItems}</td>
        <td>{completedM2.toFixed(2)}</td>
        <td>{butylLot}</td>
        <td>{silicaLot}</td>
        <td>{white}</td>
        <td>{black}</td>
        <td className={css.textLeft}>
          {checkedNotes.length > 0 ? checkedNotes.join(', ') : ''}
          {missedItems > 0 ? ` Faltam ${missedItems}` : ''}
          {isFinal && type !== 'recovered' && ' Completo'}
          {type === 'recovered' && ' Reposição'}
        </td>
        <td>{order.owner.name}</td>
        <td>{local}</td>
        <td>{date}</td>
      </tr>
    </>
  );
}

export default ReportTableRow;
