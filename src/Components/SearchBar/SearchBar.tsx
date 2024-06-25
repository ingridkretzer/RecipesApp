import { DrinkType, MealType } from '../../types';
import styles from './SearchBar.module.css';

type SearchBarProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formInputs: {
    search: string,
    radioSearch: string
  }
  handleSearch: (e: React.FormEvent<HTMLButtonElement>) => Promise<void>
};

function SearchBar(
  {
    handleChange,
    formInputs,
    handleSearch,
  } : SearchBarProps,
) {
  return (
    <form className={ styles.searchForm }>
      <div className={ styles.searchInputDiv }>
        <label htmlFor="search-input">
          <input
            data-testid="search-input"
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
            Name
          </label>
          <input
            data-testid="name-search-radio"
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
            Ingredient
          </label>
          <input
            data-testid="ingredient-search-radio"
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
            First letter
          </label>
          <input
            data-testid="first-letter-search-radio"
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
          data-testid="exec-search-btn"
          onClick={ handleSearch }
          className={ styles.searchBtn }
        >
          Pesquisar
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
