import { Search, CircleX } from 'lucide-react';

import css from './SearchBox.module.css';

function SearchBox() {
  return (
    <div className={css.wrapper}>
      <div className={css.searchbox}>
        <Search className={css.inputIcon} />
        <input
          className={css.input}
          type="text"
          placeholder="Digite número EP ou nome do cliente..."
          // value={query}
        />

        {/* {query.length > 0 && (
          <button type="button" onClick={handleClear} className={css.clear}>
            <CircleX size={24} strokeWidth={1} />
          </button>
        )} */}
      </div>
      <button type="button" className={css.btn}>
        Pesquisar
      </button>

      <div className={css.btns}>
        <button type="button">Linha1</button>
        <button type="button">27.12.25</button>
      </div>
    </div>
  );
}

export default SearchBox;
