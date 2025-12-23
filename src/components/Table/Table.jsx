import css from './Table.module.css';

function Table() {
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
        <tr>
          <td>1111</td>
          <td className={css.textLeft}>Cliente1</td>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>123456</td>
          <td>123456</td>
          <td>123456</td>
          <td>123456</td>
          <td className={css.textLeft}>Triplos</td>
        </tr>
        <tr>
          <td>1111</td>
          <td>Cliente1</td>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>123456</td>
          <td>123456</td>
          <td>123456</td>
          <td>123456</td>
          <td>Triplos</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Table;
