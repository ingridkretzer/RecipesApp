import styles from './SearchForm.module.css';

type SearchFormProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formInputs: {
    search: string,
    radioSearch: string
  }
  handleSearch: (e: React.FormEvent<HTMLButtonElement>) => Promise<void>
};

function SearchForm(
  {
    handleChange,
    formInputs,
    handleSearch,
  } : SearchFormProps,
) {
  return (
    <form className={ styles.searchForm }>
      <div>
        <label htmlFor="search-input">
          <input
            className={ styles.searchInput }
            type="text"
            id="search-input"
            name="search"
            placeholder="Pesquisar"
            value={ formInputs.search }
            onChange={ handleChange }
          />
        </label>
      </div>
      <div className={ styles.radiosDiv }>
        <div>
          <label
            className={ styles.radioLabel }
            htmlFor="name"
          >
            Nome
          </label>
          <input
            className={ styles.radioInput }
            type="radio"
            name="radioSearch"
            id="name"
            value="name"
            onChange={ handleChange }
            defaultChecked
          />
        </div>
        <div>
          <label
            className={ styles.radioLabel }
            htmlFor="ingredient"
          >
            Ingrediente
          </label>
          <input
            className={ styles.radioInput }
            type="radio"
            id="ingredient"
            name="radioSearch"
            value="ingredient"
            onChange={ handleChange }
          />
        </div>
        <div>
          <label
            className={ styles.radioLabel }
            htmlFor="firstLetter"
          >
            Primeira letra
          </label>
          <input
            className={ styles.radioInput }
            type="radio"
            name="radioSearch"
            id="firstLetter"
            value="firstLetter"
            onChange={ handleChange }
          />
        </div>
      </div>
      <div>
        <button
          onClick={ handleSearch }
          className={ styles.searchBtn }
        >
          Pesquisar
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
