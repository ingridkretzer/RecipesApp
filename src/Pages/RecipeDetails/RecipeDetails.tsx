import React, { useContext, useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import styles from './ComponentRecipeDetail.module.css';
import { fetchRecipeData,
  transformRecipeData,
  Recipe,
  fetchRecommendations,
  transformRecommendationData, Recommendation } from './recipeUtils';
import AppContext from '../../Context/AppContext';
import { isRecipeInProgress } from './continueRecipeUtil';
import { shareRecipe } from './shareAndFavorite';
import shareIcon from '../../images/shareIcon.svg';
import FavoriteButton from './HeartButton';

function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [linkCopied, setLinkCopied] = useState<boolean>(false);
  const { setUrl } = useContext(AppContext);

  useEffect(() => {
    setUrl(location.pathname);
    const getRecipeDetails = async () => {
      try {
        const type = location.pathname.includes('/meals/') ? 'meals' : 'drinks';
        const recipeData = await fetchRecipeData(id as string, type);
        const recommendationType = type === 'meals' ? 'drinks' : 'meals';
        const recommendationData = await fetchRecommendations(recommendationType);

        if (recipeData) {
          const transformedRecipe = transformRecipeData(recipeData);
          setRecipe(transformedRecipe);
        } else {
          setError('Recipe not found.');
          return;
        }
        const transformedRecommendations = transformRecommendationData(
          recommendationData,
        );
        setRecommendations(transformedRecommendations.slice(0, 6));
      } catch (err) {
        setError('Failed to fetch recipe details.');
      } finally {
        setLoading(false);
      }
    };

    getRecipeDetails();
  }, [id, location.pathname, setUrl]);

  const handleStartRecipeClick = () => {
    const inProgressRoute = location.pathname.includes('/meals/')
      ? `/meals/${id}/in-progress` : `/drinks/${id}/in-progress`;
    navigate(inProgressRoute);
  };

  const handleShareClick = async () => {
    const url = window.location.href;
    await shareRecipe(url);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 3000);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const type = location.pathname.includes('/meals/') ? 'meals' : 'drinks';
  const isInProgress = isRecipeInProgress(id!, type);
  const buttonText = isInProgress ? 'Continue Recipe' : 'Start Recipe';

  return (
    <div className="recipe-details">
      {recipe && (
        <>
          <img
            className={ styles.recipeImage }
            src={ recipe.image }
            alt={ recipe.name }
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">{recipe.name}</h1>
          <p data-testid="recipe-category">
            {location.pathname.includes('/meals/') ? recipe.category : recipe.alcoholic}
          </p>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ handleShareClick }
          >
            <img src={ shareIcon } alt="Share Icon" />
          </button>
          {linkCopied && <p>Link copied!</p>}
          <FavoriteButton recipe={ recipe! } type={ type } />
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                {ingredient}
                {' '}
                -
                {recipe.measures[index]}
              </li>
            ))}
          </ul>
          <h2>Instructions</h2>
          <p data-testid="instructions">{recipe.instructions}</p>
          {recipe.video && (
            <div>
              <h2>Video</h2>
              <iframe
                data-testid="video"
                width="560"
                height="315"
                src={ recipe.video }
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write;
                encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
          <h2>Recommendations</h2>
          <div className="recommendations">
            {recommendations.map((rec, index) => (
              <div key={ index } data-testid={ `${index}-recommendation-card` }>
                <img
                  className={ styles.recRecipesImg }
                  src={ rec.image }
                  alt={ rec.name }
                  data-testid={ `${index}-recommendation-photo` }
                />
                <p data-testid={ `${index}-recommendation-title` }>{rec.name}</p>
              </div>
            ))}
          </div>
          <button
            style={ { position: 'fixed', bottom: '0', width: '100%' } }
            data-testid="start-recipe-btn"
            onClick={ handleStartRecipeClick }
          >
            {buttonText}
          </button>
        </>
      )}
    </div>
  );
}

export default RecipeDetails;
