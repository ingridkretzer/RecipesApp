import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppContext from '../../Context/AppContext';
import { fetchDetails } from '../../Utils/API';
import shareIcon from '../../images/shareIcon.svg';
import favoriteIcon from '../../images/whiteHeartIcon.svg';
import favoritedIcon from '../../images/blackHeartIcon.svg';
import styles from './RecipeInProgress.module.css';
import ReturnToHomeButton from '../../Components/ReturnToHomeButton/ReturnToHomeButton';

function RecipeInProgress() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { setMeals, setDrinks, setUrl } = useContext(AppContext);
  const [recipe, setRecipe] = useState<any>(null);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [message, setMessage] = useState('');

  // const isMeal = () => window.location.pathname.includes('/meals');

  const getRecipeDetails = async (param: string, recipeId: string) => {
    const url = window.location.pathname;
    const result = await fetchDetails(param, recipeId);
    return url.includes('meals') ? result.meals[0] : result.drinks[0];
  };

  const extractIngredients = (data: any) => {
    return Object.keys(data)
      .filter((key) => key.includes('Ingredient') && data[key])
      .map((key) => {
        const match = key.match(/\d+/);
        const measureKey = match ? `strMeasure${match[0]}` : '';
        return `${data[key]} - ${data[measureKey]}`;
      });
  };

  useEffect(() => {
    const url = window.location.pathname;
    setUrl(url);
    const fetchRecipe = async () => {
      if (id) {
        const param = url.includes('meals') ? 'themealdb' : 'thecocktaildb';
        const data = await getRecipeDetails(param, id);
        setRecipe(data);

        const ingList = extractIngredients(data);
        setIngredients(ingList);

        if (url.includes('meals')) {
          setMeals([data]);
        } else {
          setDrinks([data]);
        }

        const storedProgress = JSON.parse(localStorage.getItem('inProgressRecipes')
          || '{}');
        const recipeProgress = (
          storedProgress[url.includes('meals') ? 'meals' : 'drinks']?.[id] || []
        );
        setCheckedIngredients(recipeProgress);

        const storedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')
          || '[]');
        const isFav = storedFavorites.some((fav: any) => fav.id === id);
        setIsFavorited(isFav);
      }
    };

    fetchRecipe();
  }, [id, setMeals, setDrinks]);

  const saveProgress = (updatedIngredients: string[]) => {
    const url = window.location.pathname;
    const storedProgress = JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');
    const recipeType = url.includes('meals') ? 'meals' : 'drinks';
    const recipeId = id as string;
    const updatedProgress = {
      ...storedProgress,
      [recipeType]: {
        ...storedProgress[recipeType],
        [recipeId]: updatedIngredients,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(updatedProgress));
  };

  const handleCheckboxChange = (ingredient: string) => {
    setCheckedIngredients((prev) => {
      const updatedIngredients = prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient];
      saveProgress(updatedIngredients);
      return updatedIngredients;
    });
  };

  const handleShare = () => {
    const url = new URL(window.location.href);
    const pathParts = url.pathname.split('/').slice(0, -1);
    url.pathname = pathParts.join('/');
    navigator.clipboard.writeText(url.toString()).then(() => {
      setMessage('Link copied!');
      setTimeout(() => setMessage(''), 2000);
    });
  };

  const handleFavorite = () => {
    const url = window.location.pathname;
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const recipeType = url.includes('meals') ? 'meal' : 'drink';
    const newFavorite = {
      id: recipe.idMeal || recipe.idDrink,
      type: recipeType,
      nationality: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
    };

    if (isFavorited) {
      const updatedFavorites = storedFavorites.filter(
        (fav: any) => fav.id !== newFavorite.id,
      );
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
      setIsFavorited(false);
    } else {
      const updatedFavorites = [...storedFavorites, newFavorite];
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
      setIsFavorited(true);
    }
  };

  const handleFinishRecipe = () => {
    const url = window.location.pathname;
    const doneRecipe = {
      id: recipe.idMeal || recipe.idDrink,
      type: url.includes('meals') ? 'meal' : 'drink',
      nationality: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
      doneDate: new Date().toISOString(),
      tags: recipe.strTags ? recipe.strTags.split(',') : [],
    };

    const storedDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    localStorage.setItem('doneRecipes', JSON.stringify(
      [...storedDoneRecipes, doneRecipe],
    ));

    navigate('/done-recipes');
  };

  return (
    <div className={ styles.inProgressPage }>
      <ReturnToHomeButton />
      {recipe && (
        <>
          <div className={ styles.infoDiv }>
            <img
              className={ styles.image }
              src={ recipe.strMealThumb || recipe.strDrinkThumb }
              alt="Recipe"
              data-testid="recipe-photo"
            />
            <h1 data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</h1>
            <div className={ styles.btnsDiv }>
              <button
                className={ styles.topBtns }
                type="button"
                onClick={ handleShare }
              >
                <img
                  src={ shareIcon }
                  alt="Share"
                  data-testid="share-btn"
                />
              </button>
              <button
                className={ styles.topBtns }
                type="button"
                onClick={ handleFavorite }
              >
                <img
                  src={ isFavorited ? favoritedIcon : favoriteIcon }
                  alt="Favorite"
                  data-testid="favorite-btn"
                />
              </button>
            </div>
            {message && <p>{message}</p>}
          </div>
          <h2 data-testid="recipe-category">
            {recipe.strCategory}
            {recipe.strAlcoholic ? ` - ${recipe.strAlcoholic}` : ''}
          </h2>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={ index }>
                <label
                  data-testid={ `${index}-ingredient-step` }
                  style={ {
                    textDecoration: checkedIngredients.includes(ingredient)
                      ? 'line-through solid rgb(0, 0, 0)'
                      : 'none',
                  } }
                >
                  <input
                    type="checkbox"
                    checked={ checkedIngredients.includes(ingredient) }
                    onChange={ () => handleCheckboxChange(ingredient) }
                  />
                  {ingredient}
                </label>
              </li>
            ))}
          </ul>
          <p data-testid="instructions">{recipe.strInstructions}</p>
          <button
            className={ styles.finishBtn }
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ ingredients.length !== checkedIngredients.length }
            onClick={ () => handleFinishRecipe() }
          >
            Finish Recipe
          </button>
        </>
      )}
    </div>
  );
}

export default RecipeInProgress;
