import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './ComponentRecipeDetail.module.css';
import { fetchRecipeData,
  transformRecipeData,
  Recipe,
  fetchRecommendations,
  transformRecommendationData, Recommendation } from './recipeUtils';

function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

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

  const handleStartRecipeClick = () => {
    const inProgressRoute = location.pathname.includes('/meals/')
      ? `/meals/${id}/in-progress` : `/drinks/${id}/in-progress`;
    navigate(inProgressRoute);
  };

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
          <button
            style={ { position: 'fixed', bottom: '0', width: '100%' } }
            data-testid="start-recipe-btn"
            onClick={ handleStartRecipeClick }
          >
            Start Recipe
          </button>
        </>
      )}
    </div>
  );
}

export default RecipeDetails;

//   return (
//     <div className="recipe-details">
//       {recipe && (
//         <>
//           <img src={ recipe.image } alt={ recipe.name } data-testid="recipe-photo" />
//           <h1 data-testid="recipe-title">{recipe.name}</h1>
//           <p data-testid="recipe-category">
//             {location.pathname.includes('/meals/') ? recipe.category : recipe.alcoholic}
//           </p>
//           <h2>Ingredients</h2>
//           <ul>
//             {recipe.ingredients.map((ingredient, index) => (
//               <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
//                 {ingredient}
//                 {' '}
//                 -
//                 {recipe.measures[index]}
//               </li>
//             ))}
//           </ul>
//           <h2>Instructions</h2>
//           <p data-testid="instructions">{recipe.instructions}</p>
//           {recipe.video && (
//             <iframe
//               data-testid="video"
//               width="560"
//               height="315"
//               src={ recipe.video }
//               title="YouTube video player"
//               allow="accelerometer; autoplay; clipboard-write;
//               encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             />
//           )}
//           <h2>Recommendations</h2>
//         </>
//       )}
//       <button
//         style={ { position: 'fixed', bottom: '0', width: '100%' } }
//         data-testid="start-recipe-btn"
//         onClick={ handleStartRecipeClick }
//       >
//         Start Recipe
//       </button>
//     </div>
//   );
// }
