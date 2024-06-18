import React from 'react';
import { Recipe } from './recipeUtils';
import styles from './ComponentRecipeDetail.module.css';

interface RecipeDetailProps {
  recipe: Recipe;
}

function RecipeDetail({ recipe }: RecipeDetailProps) {
  const renderRecipeDetail = (recipeData: Recipe) => (
    <div className="recipe-detail">
      <img src={ recipeData.image } alt={ recipeData.name } data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{recipeData.name}</h1>
      <p data-testid="recipe-category">
        {recipeData.category || recipeData.alcoholic}
      </p>
      <h2>Ingredients</h2>
      <ul>
        {recipeData.ingredients.map((ingredient: string, index: number) => (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {ingredient}
            {' '}
            -
            {recipeData.measures[index]}
          </li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <p data-testid="instructions">{recipeData.instructions}</p>
      {recipeData.video && recipeData.category && (
        <div>
          <h2>Video</h2>
          <iframe
            data-testid="video"
            width="560"
            height="315"
            src={ recipeData.video }
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write;
            encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
      <button
        type="button"
        data-testid="start-recipe-btn"
        className={ styles.startRecipeBtn }
      >
        Start Recipe
      </button>
    </div>
  );

  return renderRecipeDetail(recipe);
}

export default RecipeDetail;
