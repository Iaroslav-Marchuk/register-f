import css from './Summary.module.css';

function Summary() {
  return (
    <div>
      <p className={css.resume}>
        Resumo do dia: Feito 100 vidros, 300m<sup>2</sup>. Ratio - 1.05
      </p>
    </div>
  );
}

export default Summary;
