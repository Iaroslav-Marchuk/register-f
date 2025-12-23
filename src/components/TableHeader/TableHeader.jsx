import css from './TableHeader.module.css';

function TableHeader() {
  return (
    <div className={css.tableHeader}>
      <button type="submit">Adicionar encomenda</button>
      <div className={css.wrapper}>
        <span>Linha: 1</span>
        <span>Responsavel: Coloborador1</span>
        <span>Data: 12/12/2025</span>
      </div>
    </div>
  );
}

export default TableHeader;
