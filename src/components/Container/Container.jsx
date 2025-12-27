import css from './Container.module.css';

function Container({ children, className = '' }) {
  return <div className={`${css.container} ${className}`}>{children}</div>;
}

export default Container;
