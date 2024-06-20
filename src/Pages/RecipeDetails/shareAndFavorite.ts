export const shareRecipe = async (url: string): Promise<void> => {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(url);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  } else {
    console.error('Clipboard API not supported');
  }
};

export const toggleFavoriteRecipe = (recipeId: string, type: 'meals' | 'drinks') => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

  const isFavorite = favoriteRecipes.some((recipe: any) => recipe.id === recipeId);

  let updatedFavorites;
  if (isFavorite) {
    updatedFavorites = favoriteRecipes.filter((recipe: any) => recipe.id !== recipeId);
  } else {
    const newFavorite = { id: recipeId, type };
    updatedFavorites = [...favoriteRecipes, newFavorite];
  }

  localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
  return !isFavorite; // Retorna o novo estado de favorito
};

export const isRecipeFavorite = (recipeId: string): boolean => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
  return favoriteRecipes.some((recipe: any) => recipe.id === recipeId);
};
