import { Recipe } from './recipeUtils';

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

export const toggleFavoriteRecipe = (recipe: Recipe, type: 'meals' | 'drinks') => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

  const isFavorite = favoriteRecipes
    .some((storeRecipe: any) => storeRecipe.id === recipe.id);

  let updatedFavorites;
  if (isFavorite) {
    updatedFavorites = favoriteRecipes
      .filter((storeRecipe: any) => storeRecipe.id !== recipe.id);
  } else {
    const newFavorite = {
      id: recipe.id,
      type: recipe.type,
      nationality: recipe.nationality,
      category: recipe.category,
      alcoholicOrNot: recipe.alcoholic,
      name: recipe.name,
      image: recipe.image,
    };
    updatedFavorites = [...favoriteRecipes, newFavorite];
  }

  localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
  return !isFavorite; // Retorna o novo estado de favorito
};

export const isRecipeFavorite = (recipeId: string): boolean => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
  return favoriteRecipes.some((recipe: any) => recipe.id === recipeId);
};
