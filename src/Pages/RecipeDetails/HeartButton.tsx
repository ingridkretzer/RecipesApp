import React, { useState, useEffect } from 'react';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { isRecipeFavorite, toggleFavoriteRecipe } from './shareAndFavorite';
import { Recipe } from './recipeUtils';

interface FavoriteButtonProps {
  recipe: Recipe;
  type: 'meals' | 'drinks';
}

function FavoriteButton({ recipe, type }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    setIsFavorite(isRecipeFavorite(recipe.id));
  }, [recipe.id]);

  const handleFavoriteToggle = () => {
    const newFavoriteState = toggleFavoriteRecipe(recipe, type);
    setIsFavorite(newFavoriteState);
  };

  return (
    <button onClick={ handleFavoriteToggle }>
      <img
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="favorite icon"
        data-testid="favorite-btn"
      />
    </button>
  );
}

export default FavoriteButton;
