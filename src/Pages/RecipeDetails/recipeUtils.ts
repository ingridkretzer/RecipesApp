export interface Recipe {
  id: string;
  name: string;
  category?: string;
  alcoholic?: string | null;
  ingredients: string[];
  measures: string[];
  instructions: string;
  image: string;
  video?: string;
  nationality: string;
  type: string
}

export interface Recommendation {
  id: string;
  image: string;
  title: string;
  name: string;
}

export const fetchRecipeData = async (id: string, type: 'meals' | 'drinks') => {
  const url = type === 'meals'
    ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return type === 'meals' ? data.meals?.[0] : data.drinks?.[0];
};

export const fetchRecommendations = async (type: 'meals' | 'drinks') => {
  const url = type === 'meals'
    ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
    : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return type === 'meals' ? data.meals : data.drinks;
};

export const transformRecipeData = (recipeData: any): Recipe => {
  const ingredients = Object.keys(recipeData)
    .filter((key) => key.includes('Ingredient') && recipeData[key])
    .map((key) => recipeData[key]);

  const measures = Object.keys(recipeData)
    .filter((key) => key.includes('Measure') && recipeData[key])
    .map((key) => recipeData[key]);

  return {
    id: recipeData.idMeal || recipeData.idDrink,
    type: recipeData.strMeal ? 'meal' : 'drink',
    name: recipeData.strMeal || recipeData.strDrink,
    category: recipeData.strCategory,
    alcoholic: recipeData.strAlcoholic || '',
    ingredients,
    measures,
    instructions: recipeData.strInstructions,
    image: recipeData.strMealThumb || recipeData.strDrinkThumb,
    video: recipeData.strYoutube ? `https://www.youtube.com/embed/${recipeData.strYoutube.split('=')[1]}` : undefined,
    nationality: recipeData.strArea || '',
  };
};

export const transformRecommendationData = (recommendationData: any)
: Recommendation[] => {
  return recommendationData.map((item: any) => ({
    id: item.idMeal || item.idDrink,
    title: item.strMeal || item.strDrink,
    image: item.strMealThumb || item.strDrinkThumb,
  }));
};
