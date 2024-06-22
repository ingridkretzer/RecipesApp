import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useLocalStorage from '../../Hooks/useLocalStorage';
import ShareButton from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import AppContext from '../../Context/AppContext';
import ReturnToHomeButton from '../../Components/ReturnToHomeButton/ReturnToHomeButton';

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
    <div>
      <h1>Favorite Recipes</h1>
      <ReturnToHomeButton />
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => filterRecipes('all') }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => filterRecipes('meals') }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => filterRecipes('drinks') }
      >
        Drinks
      </button>
      {filteredRecipes.length > 0 && (
        <div>
          {filteredRecipes.map((recipe, index) => (
            <div
              key={ recipe.id }
              data-testid={ `${index}-recipe-card` }
            >
              <button
                onClick={ () => handleShareClickDone(recipe.type, recipe.id) }
              >
                <img
                  src={ ShareButton }
                  alt="Share Icon"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>
              <button
                type="button"
                onClick={ () => handleFavorite(recipe.id) }
              >
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="Favorite Icon"
                />
              </button>
              <button
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
              <button
                onClick={ () => handleRecipeClick(`${recipe.type}s`, recipe.id) }
                onKeyDown={ (e) => e.key === 'Enter'
              && handleRecipeClick(`${recipe.type}s`, recipe.id) }
              >
                <img
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
            </div>
          ))}
        </div>
      )}
      {copyMessage && <div>{copyMessage}</div>}
    </div>
  );
}

export default Favorites;
