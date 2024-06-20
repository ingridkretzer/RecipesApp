export const isRecipeInProgress = (id: string, type: 'meals' | 'drinks'): boolean => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');
  if (type === 'meals') {
    return inProgressRecipes.meals && inProgressRecipes.meals[id];
  }
  if (type === 'drinks') {
    return inProgressRecipes.drinks && inProgressRecipes.drinks[id];
  }
  return false;
};
