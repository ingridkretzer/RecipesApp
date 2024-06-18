import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  Recipe,
  Recommendation,
  fetchRecipeData,
  fetchRecommendations,
  transformRecipeData,
  transformRecommendationData,
} from './recipeUtils';
import RecommendationCarousel from './Carousel';
import RecipeDetail from './ComponentRecipeDetail';
import styles from './ComponentRecipeDetail.module.css';

function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isInProgress, setIsInProgress] = useState<boolean>(false);

  const checkRecipeStatus = useCallback(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    const done = doneRecipes.some((doneRecipe: any) => doneRecipe.id === id);
    setIsDone(done);

    const inProgressRecipes = JSON.parse(localStorage
      .getItem('inProgressRecipes') || '{}');
    const type = location.pathname.includes('/meals/') ? 'meals' : 'drinks';
    const inProgress = inProgressRecipes[type]?.[id as string];
    setIsInProgress(!!inProgress);
  }, [id, location.pathname]);

  const loadRecipeDetails = useCallback(async () => {
    try {
      const type = location.pathname.includes('/meals/') ? 'meals' : 'drinks';
      const recipeData = await fetchRecipeData(id!, type);
      const recommendationType = type === 'meals' ? 'drinks' : 'meals';
      const recommendationData = await fetchRecommendations(recommendationType);

      if (recipeData) {
        const transformedRecipe = transformRecipeData(recipeData);
        setRecipe(transformedRecipe);
      } else {
        setError('Recipe not found.');
      }

      if (recommendationData) {
        const transformedRecommendations = transformRecommendationData(
          recommendationData,
        );
        setRecommendations(transformedRecommendations.slice(0, 6)); // Renderizar exatamente 6 recomendações
      } else {
        setError('Recommendations not found.');
      }
    } catch (err) {
      setError('Failed to fetch recipe details.');
    } finally {
      setLoading(false);
    }
  }, [id, location.pathname]);

  useEffect(() => {
    if (!id) {
      setError('Recipe ID is missing.');
      setLoading(false);
      return;
    }

    checkRecipeStatus();
    loadRecipeDetails();
  }, [id, location.pathname, checkRecipeStatus, loadRecipeDetails]);

  const handleStartRecipe = () => {
    const type = location.pathname.includes('/meals/') ? 'meals' : 'drinks';
    navigate(`/${type}/${id}/in-progress`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="recipe-details">
      {recipe && (
        <>
          <RecipeDetail recipe={ recipe } />
          <h2>Recommendations</h2>
          <RecommendationCarousel recommendations={ recommendations } />
          {!isDone && (
            <button
              type="button"
              data-testid="start-recipe-btn"
              className={ styles.startRecipeBtn }
              onClick={ handleStartRecipe }
            >
              {isInProgress ? 'Continue Recipe' : 'Start Recipe'}
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default RecipeDetails;
