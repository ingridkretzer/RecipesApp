import React, { useState, useEffect } from 'react';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { isRecipeFavorite, toggleFavoriteRecipe } from './shareAndFavorite';

interface FavoriteButtonProps {
  recipeId: string;
  type: 'meals' | 'drinks';
}

function FavoriteButton({ recipeId, type }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    setIsFavorite(isRecipeFavorite(recipeId));
  }, [recipeId]);

  const handleFavoriteToggle = () => {
    const newFavoriteState = toggleFavoriteRecipe(recipeId, type);
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
