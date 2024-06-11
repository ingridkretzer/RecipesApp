import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import styles from './Header.module.css';
import AppContext from '../../Context/AppContext';
import {
  fetchByCategory,
  fetchByFirstLetter,
  fetchByIngredient,
  fetchByName,
} from '../../Utils/API';
import SearchForm from './SearchForm/SearchForm';
import CategorySection from './CategorySection/CategorySection';

function Header() {
  const navigate = useNavigate();
  const [isSearch, setSearch] = useState(false);
  const [formInputs, setFormInputs] = useState(
    {
      search: '',
      radioSearch: 'name',
    },
  );

  const { headerTitle, setHeaderTitle, setDrinks, setMeals } = useContext(AppContext);
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

  const handleSearch = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { search, radioSearch } = formInputs;
    const param = headerTitle === 'Meals' ? 'themealdb' : 'thecocktaildb';
    const setRecipe = headerTitle === 'Meals' ? setMeals : setDrinks;

    switch (radioSearch) {
      case 'name':
        try {
          const response = await fetchByName(param, search);
          const itens = headerTitle === 'Meals' ? response.meals : response.drinks;
          setRecipe(itens);
        } catch (error) {
          console.log(error);
        }
        break;
      case 'ingredient':
        try {
          const response = await fetchByIngredient(param, search);
          const itens = headerTitle === 'Meals' ? response.meals : response.drinks;
          setRecipe(itens);
        } catch (error) {
          console.log(error);
        }
        break;
      case 'firstLetter':
        try {
          const response = await fetchByFirstLetter(param, search);
          const itens = headerTitle === 'Meals' ? response.meals : response.drinks;
          setRecipe(itens);
        } catch (error) {
          console.log(error);
        }
        break;
      default:
        return setRecipe([]);
    }
  };

  const handleCategory = async (value: string) => {
    if (headerTitle === 'Meals') {
      try {
        const response = await fetchByCategory('themealdb', value);
        setMeals(response.meals);
      } catch (error) {
        console.log(error);
      }
    }

    if (headerTitle === 'Drinks') {
      try {
        const response = await fetchByCategory('thecocktail', value);
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
        {searchIcon && (
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
        )}
      </div>
      {isSearch ? (
        <SearchForm
          formInputs={ formInputs }
          handleChange={ handleChange }
          handleSearch={ handleSearch }
        />
      ) : <CategorySection handleCategory={ handleCategory } />}
    </header>
  );
}

export default Header;
