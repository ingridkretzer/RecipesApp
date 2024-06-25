import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useLocalStorage from '../../Hooks/useLocalStorage';
import ShareButton from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import AppContext from '../../Context/AppContext';
import ReturnToHomeButton from '../../Components/ReturnToHomeButton/ReturnToHomeButton';
import styles from './FavoriteRecipes.module.css';

type Recipe = {
  image: string;
  name: string;
  id: string;
  category: string;
  nationality?: string;
  alcoholicOrNot?: string;
  tags: string;
  type: 'meal' | 'drink';
};

function Favorites() {
  const navigate = useNavigate();
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const favoritesRecipes = getLocalStorage('favoriteRecipes');
  const [copyMessage, setCopyMessage] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(favoritesRecipes);
  const { pathname } = useLocation();
  const { setUrl, setHeaderTitle } = useContext(AppContext);
  useEffect(() => {
    setUrl(pathname);
    setHeaderTitle('Favorite Recipes');
  }, []);

  function handleShareClickDone(type: 'meal' | 'drink', id: string) {
    const recipeUrl = `http://localhost:3000/${type}s/${id}`;
    navigator.clipboard.writeText(recipeUrl);
    setCopyMessage('Link copied!');
  }

  function filterRecipes(type: 'meals' | 'drinks' | 'all') {
    if (type === 'meals') {
      const meals = favoritesRecipes.filter((recipe: Recipe) => recipe.type === 'meal');
      setFilteredRecipes(meals);
    } else if (type === 'drinks') {
      const drinks = favoritesRecipes
        .filter((recipe: Recipe) => recipe.type === 'drink');
      setFilteredRecipes(drinks);
    } else {
      setFilteredRecipes(favoritesRecipes);
    }
  }

  function handleRecipeClick(type: 'meals' | 'drinks', id: string) {
    console.log(`Navigating to /${type}/${id}`);
    navigate(`/${type}/${id}`);
  }

  function handleFavorite(id: string) {
    const newFavoriteRecipes = favoritesRecipes
      .filter((recipe: Recipe) => recipe.id !== id);
    setFilteredRecipes(newFavoriteRecipes);
    setLocalStorage('favoriteRecipes', newFavoriteRecipes);
  }

  return (
    <section className={ styles.favoritesPage }>
      <ReturnToHomeButton />
      <div className={ styles.topBtnsDiv }>
        <button
          className={ styles.topBtns }
          data-testid="filter-by-all-btn"
          onClick={ () => filterRecipes('all') }
        >
          All
        </button>
        <button
          className={ styles.topBtns }
          data-testid="filter-by-meal-btn"
          onClick={ () => filterRecipes('meals') }
        >
          Meals
        </button>
        <button
          className={ styles.topBtns }
          data-testid="filter-by-drink-btn"
          onClick={ () => filterRecipes('drinks') }
        >
          Drinks
        </button>
      </div>
      {filteredRecipes.length > 0 && (
        <div className={ styles.favRecipesDiv }>
          {filteredRecipes.map((recipe, index) => (
            <div
              className={ styles.favCard }
              key={ recipe.id }
              data-testid={ `${index}-recipe-card` }
            >

              <button
                className={ styles.imageBtn }
                onClick={ () => handleRecipeClick(`${recipe.type}s`, recipe.id) }
                onKeyDown={ (e) => e.key === 'Enter'
              && handleRecipeClick(`${recipe.type}s`, recipe.id) }
              >
                <img
                  className={ styles.img }
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt={ recipe.name }
                  width={ 200 }
                />
              </button>
              <p data-testid={ `${index}-horizontal-top-text` }>
                {recipe.type === 'meal'
                  ? `${recipe.nationality} - ${recipe.category}` : recipe.alcoholicOrNot}
              </p>
              <button
                className={ `${styles.nameBtn} ${styles.cardBtns}` }
                onClick={ () => handleRecipeClick(`${recipe.type}s`, recipe.id) }
                onKeyDown={ (e) => e.key === 'Enter'
            && handleRecipeClick(`${recipe.type}s`, recipe.id) }
              >
                <h3
                  data-testid={ `${index}-horizontal-name` }
                >
                  {recipe.name}
                </h3>
              </button>
              <div className={ styles.cardBtnsDiv }>
                <button
                  className={ styles.cardBottomBtns }
                  onClick={ () => handleShareClickDone(recipe.type, recipe.id) }
                >
                  <img
                    src={ ShareButton }
                    alt="Share Icon"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>
                <button
                  className={ styles.cardBottomBtns }
                  type="button"
                  onClick={ () => handleFavorite(recipe.id) }
                >
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ blackHeartIcon }
                    alt="Favorite Icon"
                  />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
      {copyMessage && <div>{copyMessage}</div>}
    </section>
  );
}

export default Favorites;
