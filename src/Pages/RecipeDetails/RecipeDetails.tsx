import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './ComponentRecipeDetail.module.css';
import RecommendationCarousel from './Carousel';
import {
  fetchRecipeData,
  fetchRecommendations,
  transformRecipeData,
  transformRecommendationData,
  Recipe,
  Recommendation,
} from './recipeUtils';
import StartRecipeButton from './StartRecipeButton';

function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRecipeDetails = async () => {
      if (!id) {
        setError('Recipe ID is missing.');
        setLoading(false);
        return;
      }

      try {
        const type = location.pathname.includes('/meals/') ? 'meals' : 'drinks';
        const recipeData = await fetchRecipeData(id, type);
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
          setRecommendations(transformedRecommendations.slice(0, 6)); // Limit to 6 recommendations
        } else {
          setError('Recommendations not found.');
        }
      } catch (err) {
        setError('Failed to fetch recipe details.');
      } finally {
        setLoading(false);
      }
    };

    getRecipeDetails();
  }, [id, location.pathname]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="recipe-details">
      {recipe && (
        <>
          <img src={ recipe.image } alt={ recipe.name } data-testid="recipe-photo" />
          <h1 data-testid="recipe-title">{recipe.name}</h1>
          <p data-testid="recipe-category">
            {location.pathname.includes('/meals/') ? recipe.category : recipe.alcoholic}
          </p>
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
          <RecommendationCarousel recommendations={ recommendations } />
          <StartRecipeButton recipeId={ recipe.id } />
        </>
      )}
    </div>
  );
}

export default RecipeDetails;
