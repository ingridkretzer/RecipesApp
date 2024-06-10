import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import styles from './Header.module.css';
import AppContext from '../../Context/AppContext';
import { fetchByCategory, fetchByFirstLetter, fetchByIngredient, fetchByName } from '../../Utils/API';

function Header() {
  const navigate = useNavigate();
  const [search, setSearch] = useState(false);
  const [formInputs, setFormInputs] = useState(
    {
      search: '',
      radioSearch: 'name',
    },
  );

  const { headerTitle, setHeaderTitle, setDrinks, setMeals } = useContext(AppContext);
  const [searchIcon, setSearchIcon] = useState(false)

  useEffect((
  ) => {
    const isTrue = headerTitle === 'Meals' || headerTitle === 'Drinks'
    setSearchIcon(isTrue)
  }, [headerTitle])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInputs((prev) => (
      {
        ...prev,
        [e.target.name]: e.target.value,
      }
    ));
  };

  const handleSearch = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { search, radioSearch } = formInputs;
    const param = headerTitle === 'Meals' ? 'themealdb' : 'thecocktaildb'
    const setRecipe = headerTitle === 'Meals' ? setMeals : setDrinks

    switch (radioSearch) {
      case 'name':
        try {
          const response = await fetchByName(param, search)
          const itens = headerTitle === 'Meals' ? response.meals : response.drinks;
          setRecipe(itens)
        } catch (error) {
          console.log(error);
        }
      case 'ingredient':
        try {
          const response = await fetchByIngredient(param, search)
          const itens = headerTitle === 'Meals' ? response.meals : response.drinks;
          setRecipe(itens)
        } catch (error) {
          console.log(error);
        }
      case 'firstLetter':
        try {
          const response = await fetchByFirstLetter(param, search)
          const itens = headerTitle === 'Meals' ? response.meals : response.drinks;
          setRecipe(itens)
        } catch (error) {
          console.log(error);
        }
    }
  };

  const handleCategory = async (value: string) => {
    if (headerTitle === 'Meals') {
      try {
        const response = await fetchByCategory('themealdb', value)
        setMeals(response.meals);
      } catch (error) {
        console.log(error);
      }
    }

    if (headerTitle === 'Drinks') {
      try {
        const response = await fetchByCategory('thecocktail', value)
        setMeals(response.drinks);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleProfile = () => {
    setHeaderTitle('Profile');
    navigate('/profile');
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <button

          className={styles.topBtn}
          onClick={handleProfile}
        >
          <img data-testid="profile-top-btn" src="src/images/profileIcon.svg" alt="Profile icon" />
        </button>
        <p data-testid="page-title" className={styles.headerTitle}>{headerTitle}</p>
        {searchIcon && (
          <button
            onClick={() => setSearch(!search)}
            className={styles.topBtn}
          >
            <img data-testid="search-top-btn" src="src/images/searchIcon.svg" alt="search icon" className={styles.headerIcons} />
          </button>
        )}
      </div>
      {search ? (
        <form className={styles.searchForm}>
          <div>
            <label htmlFor="search-input" />
            <input
              className={styles.searchInput}
              type="text"
              id="search-input"
              name="search"
              placeholder="Pesquisar"
              value={formInputs.search}
              onChange={handleChange}
            />
          </div>
          <div className={styles.radiosDiv}>
            <div>
              <label
                className={styles.radioLabel}
                htmlFor="name"
              >
                Nome
              </label>
              <input
                className={styles.radioInput}
                type="radio"
                name="radioSearch"
                id="name"
                value="name"
                onChange={handleChange}
                defaultChecked
              />
            </div>
            <div>
              <label
                className={styles.radioLabel}
                htmlFor="ingredient"
              >
                Ingrediente
              </label>
              <input
                className={styles.radioInput}
                type="radio"
                id="ingredient"
                name="radioSearch"
                value="ingredient"
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className={styles.radioLabel}
                htmlFor="firstLetter"
              >
                Primeira letra
              </label>
              <input
                className={styles.radioInput}
                type="radio"
                name="radioSearch"
                id="firstLetter"
                value="firstLetter"
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <button
              onClick={handleSearch}
              className={styles.searchBtn}
            >
              Pesquisar
            </button>
          </div>
        </form>
      ) : (headerTitle === 'Comidas' ? (
        <section className={styles.categoryheaderTitle}>
          <div className={styles.categoryDivs}>
            <button
              className={styles.category}
              onClick={() => handleCategory('')}
            >
              All
            </button>
            <button
              className={styles.category}
              onClick={() => handleCategory('beef')}
            >
              Beef
            </button>
            <button
              className={styles.category}
              onClick={() => handleCategory('goat')}
            >
              Goat
            </button>
          </div>
          <div className={styles.categoryDivs}>
            <button
              className={styles.category}
              onClick={() => handleCategory('chicken')}
            >
              Chicken
            </button>
            <p
              className={styles.category}
              onClick={() => handleCategory('breakfast')}
            >
              Breakfast
            </p>
            <button
              className={styles.category}
              onClick={() => handleCategory('dessert')}
            >
              Dessert
            </button>
          </div>
        </section>
      ) : (
        <section className={styles.categoryheaderTitle}>
          <div className={styles.categoryDivs}>
            <button
              className={styles.category}
              onClick={() => handleCategory('')}
            >
              All
            </button>
            <button
              className={styles.category}
              onClick={() => handleCategory('Ordinary_Drink')}
            >
              Ordinary Drink
            </button>
            <button
              className={styles.category}
              onClick={() => handleCategory('Cocktail')}
            >
              Cocktail
            </button>
          </div>
          <div className={styles.categoryDivs}>
            <button
              className={styles.category}
              onClick={() => handleCategory('Shake')}
            >
              Shake
            </button>
            <p
              className={styles.category}
              onClick={() => handleCategory('Other \/ Unknown')}
            >
              Other/
              {' '}
              Unknown
            </p>
            <button
              className={styles.category}
              onClick={() => handleCategory('cocoa')}
            >
              Cocoa
            </button>
          </div>
        </section>
      )
      )}
    </header>
  );
}

export default Header;
