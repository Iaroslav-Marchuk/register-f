import css from './Summary.module.css';

function Summary() {
  return (
    <div className={css.resume}>
      <span className={css.span}>Total</span>
      <ul className={css.list}>
        <li className={css.item}>100 vidros</li>
        <li className={css.item}>
          300m<sup>2</sup>.
        </li>
        <li className={css.item}>Ratio - 1.05,</li>
      </ul>
    </div>
  );
}

export default Summary;
