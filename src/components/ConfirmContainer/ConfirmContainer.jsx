import css from './ConfirmContainer.module.css';

const ConfirmContainer = ({ text, onConfirm, onClose }) => {
  return (
    <div className={css.wrapper}>
      <p className={css.text}>{text}</p>
      <div className={css.btns}>
        <button className={css.btnY} onClick={onConfirm}>
          Sim
        </button>
        <button className={css.btnN} onClick={onClose}>
          Não
        </button>
      </div>
    </div>
  );
};

export default ConfirmContainer;
