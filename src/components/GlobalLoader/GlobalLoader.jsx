import { FadeLoader } from 'react-spinners';

import css from './GlobalLoader.module.css';

function GlobalLoader({ loadingState }) {
  if (!loadingState) return null;
  return (
    <div className={css.overlay}>
      <FadeLoader
        className={css.loader}
        loading={true}
        aria-label="Loading Spinner"
        data-testid="loader"
        color="#9fb9e2ff"
      />
    </div>
  );
}
export default GlobalLoader;
