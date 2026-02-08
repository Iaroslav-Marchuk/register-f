import { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider/ThemeContext.jsx';

import css from './ThemeTogle.module.css';

function ThemeTogle() {
  const { isDark, setIsDark } = useContext(ThemeContext);

  return (
    <div className={css.wrapper} onClick={() => setIsDark(!isDark)}>
      <div className={`${css.circle} ${isDark ? css.dark : ''}`}></div>
    </div>
  );
}

export default ThemeTogle;
