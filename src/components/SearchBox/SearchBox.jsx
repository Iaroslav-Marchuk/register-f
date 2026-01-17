import { Search, CircleX } from 'lucide-react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import css from './SearchBox.module.css';
import { useSearchParams } from 'react-router-dom';

function SearchBox() {
  const [query, setQuery] = useSearchParams();

  const inputValue = query.get('ep') || query.get('client') || '';
  const local = query.get('local') || '';
  const date = query.get('createdAt') || '';
  const dateValue = date ? new Date(date) : null;

  const handleInputChange = e => {
    const input = e.target.value.trim();

    setQuery(prev => {
      const params = new URLSearchParams(prev);

      if (!input) {
        params.delete('ep');
        params.delete('client');
      } else if (/^\d+$/.test(input)) {
        params.set('ep', input);
        params.delete('client');
      } else {
        params.set('client', input);
        params.delete('ep');
      }

      params.set('page', 1);
      return params;
    });
  };

  const handleInputClear = () => {
    setQuery(prev => {
      const params = new URLSearchParams(prev);
      params.delete('ep');
      params.delete('client');
      params.set('page', 1);
      return params;
    });
  };

  const handleLocalChange = e => {
    const select = e.target.value;

    setQuery(prev => {
      const params = new URLSearchParams(prev);
      params.set('local', select);
      params.set('page', 1);
      return params;
    });
  };

  const handleDateChange = date => {
    setQuery(prev => {
      const params = new URLSearchParams(prev);
      if (date) {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        params.set('createdAt', `${yyyy}-${mm}-${dd}`);
      } else {
        params.delete('createdAt');
      }
      params.set('page', 1);
      return params;
    });
  };

  return (
    <div className={css.wrapper}>
      <div className={css.searchbox}>
        <Search className={css.inputIcon} />
        <input
          className={css.input}
          type="text"
          placeholder="Digite número EP ou nome do cliente..."
          value={inputValue}
          onChange={handleInputChange}
        />

        {query.length > 0 && (
          <button
            type="button"
            onClick={handleInputClear}
            className={css.clear}
          >
            <CircleX size={24} strokeWidth={1} />
          </button>
        )}
      </div>

      <div className={css.btns}>
        <div className={css.selectWrapper}>
          <select
            value={local}
            onChange={handleLocalChange}
            className={css.select}
          >
            <option value="" disabled>
              --
            </option>
            <option value="Linha 1">Linha 1</option>
            <option value="Linha 2">Linha 2</option>
            <option value="Linha 3">Linha 3</option>
          </select>
        </div>

        <DatePicker
          selected={dateValue}
          onChange={handleDateChange}
          placeholderText="Escolha a data"
        />
      </div>
    </div>
  );
}

export default SearchBox;
