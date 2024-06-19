import { transformRecipeData, transformRecommendationData } from '../Pages/RecipeDetails/recipeUtils';
import { fetchByName, fetchByIngredient, fetchByFirstLetter, fetchByCategory, fetchDetails } from '../Utils/API';

describe('recipeUtils', () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({ meals: [{ idMeal: '1', strMeal: 'Mock Meal' }], drinks: [{ idDrink: '1', strDrink: 'Mock Drink' }] }),
  })) as jest.Mock;

  it('fetchByName should fetch data by name', async () => {
    const data = await fetchByName('themealdb', 'pasta');
    expect(data.meals[0].strMeal).toBe('Mock Meal');
  });

  it('fetchByIngredient should fetch data by ingredient', async () => {
    const data = await fetchByIngredient('themealdb', 'chicken');
    expect(data.meals[0].strMeal).toBe('Mock Meal');
  });

  it('fetchByFirstLetter should fetch data by first letter', async () => {
    const data = await fetchByFirstLetter('themealdb', 'a');
    expect(data.meals[0].strMeal).toBe('Mock Meal');
  });

  it('fetchByCategory should fetch data by category', async () => {
    const data = await fetchByCategory('themealdb', 'Seafood');
    expect(data.meals[0].strMeal).toBe('Mock Meal');
  });

  it('fetchDetails should fetch details by id', async () => {
    const data = await fetchDetails('themealdb', '1');
    expect(data.meals[0].strMeal).toBe('Mock Meal');
  });

  it('transformRecipeData should transform raw recipe data', () => {
    const rawRecipe = { idMeal: '1', strMeal: 'Mock Meal', strCategory: 'Category', strIngredient1: 'Ingredient 1', strMeasure1: '1 cup' };
    const transformed = transformRecipeData(rawRecipe);
    expect(transformed.ingredients[0]).toBe('Ingredient 1');
    expect(transformed.measures[0]).toBe('1 cup');
  });

  it('transformRecommendationData should transform raw recommendation data', () => {
    const rawRecommendations = [{ idMeal: '1', strMeal: 'Mock Meal', strMealThumb: 'image.jpg' }];
    const transformed = transformRecommendationData(rawRecommendations);
    expect(transformed[0].title).toBe('Mock Meal');
  });
});
