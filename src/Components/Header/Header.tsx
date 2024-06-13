import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import styles from './Header.module.css';
import AppContext from '../../Context/AppContext';
import {
  fetchByCategory,
  fetchByFirstLetter,
  fetchByIngredient,
  fetchByName,
} from '../../Utils/API';
import SearchBar from '../SearchBar/SearchBar';
import CategorySection from './CategorySection/CategorySection';

function Header() {
  const navigate = useNavigate();
  const [categoryOn, setCategoryOn] = useState('');
  const [isSearch, setSearch] = useState(false);
  const { pathname } = useLocation();
  const [formInputs, setFormInputs] = useState(
    {
      search: '',
      radioSearch: 'name',
    },
  );

  const {
    headerTitle,
    setHeaderTitle,
    setDrinks,
    setMeals } = useContext(AppContext);
  const [searchIcon, setSearchIcon] = useState(false);

  useEffect(() => {
    const isTrue = headerTitle === 'Meals' || headerTitle === 'Drinks';
    setSearchIcon(isTrue);
  }, [headerTitle]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInputs((prev) => (
      {
        ...prev,
        [e.target.name]: e.target.value,
      }
    ));
  };

  const letterAlert = () => {
    if (formInputs.search.length > 1) {
      window.alert('Your search must have only 1 (one) character');
    }
  };

  const handleSearch = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { search, radioSearch } = formInputs;
    const param = pathname.includes('meals') ? 'themealdb' : 'thecocktaildb';
    const setRecipe = pathname.includes('meals') ? setMeals : setDrinks;
    const idType = pathname.includes('meals') ? 'idMeal' : 'idDrink';
    let recipes = [];
    let response;

    switch (radioSearch) {
      case 'name':
        response = await fetchByName(param, search);
        recipes = pathname.includes('meals') ? response.meals : response.drinks;
        break;
      case 'ingredient':
        response = await fetchByIngredient(param, search);
        recipes = pathname.includes('meals') ? response.meals : response.drinks;
        break;
      default:
        letterAlert();
        response = await fetchByFirstLetter(param, search);
        recipes = pathname.includes('meals')
          ? response && response.meals : response && response.drinks;
    }
    setRecipe(recipes);
    if (!recipes) {
      window.alert("Sorry, we haven't found any recipes for these filters");
      return;
    }
    if (recipes.length === 1) {
      const url = headerTitle === 'Meals' ? 'meals' : 'drinks';
      navigate(`/${url}/${recipes[0][idType]}`);
    }
  };

  const handleCategory = async (value: string) => {
    setCategoryOn(value);
    if (pathname.includes('meals')) {
      const response = await fetchByCategory('themealdb', value);
      setMeals(response.meals);
    }

    if (pathname.includes('drinks')) {
      const response = await fetchByCategory('thecocktaildb', value);
      setDrinks(response.drinks);
    }
  };

  const handleProfile = () => {
    setHeaderTitle('Profile');
    navigate('/profile');
  };

  return (
    <header className={ styles.header }>
      <div className={ styles.headerTop }>
        <button
          className={ styles.topBtn }
          onClick={ handleProfile }
        >
          <img
            data-testid="profile-top-btn"
            src="src/images/profileIcon.svg"
            alt="Profile icon"
          />
        </button>
        <p data-testid="page-title" className={ styles.headerTitle }>{headerTitle}</p>
        {(pathname === '/meals' || pathname === '/drinks') && (
          searchIcon && (
            <button
              onClick={ () => setSearch(!isSearch) }
              className={ styles.topBtn }
            >
              <img
                data-testid="search-top-btn"
                src="src/images/searchIcon.svg"
                alt="search icon"
                className={ styles.headerIcons }
              />
            </button>
          )
        )}
      </div>
      {(pathname === '/meals' || pathname === '/drinks') && (
        <section className={ styles.headerBotton }>
          {isSearch ? (
            <SearchBar
              formInputs={ formInputs }
              handleChange={ handleChange }
              handleSearch={ handleSearch }
            />
          ) : (
            <CategorySection
              categoryOn={ categoryOn }
              handleCategory={ handleCategory }
            />
          )}
        </section>
      )}
    </header>
  );
}

export default Header;
