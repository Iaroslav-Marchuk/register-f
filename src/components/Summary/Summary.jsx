import css from './Summary.module.css';

function Summary({ completed, m2, ratio }) {
  return (
    <div className={css.resume}>
      <span className={css.span}>Total</span>
      <ul className={css.list}>
        <li className={css.item}>{`${completed} vidros`}</li>
        <li className={css.item}>
          {`${m2.toFixed(2)} m`}
          <sup>2</sup>.
        </li>
        <li className={css.item}>{`Ratio - ${ratio.toFixed(2)}`},</li>
      </ul>
    </div>
  );
}

export default Summary;
