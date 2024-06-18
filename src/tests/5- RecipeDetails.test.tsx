import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import RecipeDetails from '../Pages/RecipeDetails/RecipeDetails';
import { Recipe, Recommendation } from '../Pages/RecipeDetails/recipeUtils';

// Definir constante para o ID da receita
const RECIPE_ID = '52771';

// Mock data
const mockRecipe: Recipe = {
  id: RECIPE_ID,
  name: 'Spicy Arrabiata Penne',
  category: 'Pasta',
  alcoholic: null,
  ingredients: ['penne rigate', 'olive oil', 'garlic'],
  measures: ['1 pound', '1/4 cup', '3 cloves'],
  instructions: 'Bring a large pot of water to a boil. Add kosher salt...',
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  video: 'https://www.youtube.com/embed/1IszT_guI08',
};

const mockRecommendations: Recommendation[] = [
  { id: '1', name: 'Margarita', image: 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg' },
  { id: '2', name: 'Blue Margarita', image: 'https://www.thecocktaildb.com/images/media/drink/qtv83q1596015790.jpg' },
  { id: '3', name: 'Tommy\'s Margarita', image: 'https://www.thecocktaildb.com/images/media/drink/loezxn1504373874.jpg' },
  { id: '4', name: 'Whitecap Margarita', image: 'https://www.thecocktaildb.com/images/media/drink/srpxxp1441209622.jpg' },
  { id: '5', name: 'Strawberry Margarita', image: 'https://www.thecocktaildb.com/images/media/drink/tqyrpw1439905311.jpg' },
  { id: '6', name: 'Smashed Watermelon Margarita', image: 'https://www.thecocktaildb.com/images/media/drink/dztcv51598717861.jpg' },
];

// Mock API functions
jest.mock('./recipeUtils', () => ({
  fetchRecipeData: jest.fn(() => Promise.resolve(mockRecipe)),
  fetchRecommendations: jest.fn(() => Promise.resolve(mockRecommendations)),
  transformRecipeData: jest.fn((data) => data),
  transformRecommendationData: jest.fn((data) => data),
}));

describe('RecipeDetails', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders recipe details correctly', async () => {
    render(
      <MemoryRouter initialEntries={ [`/meals/${RECIPE_ID}`] }>
        <Routes>
          <Route path="/meals/:id" element={ <RecipeDetails /> } />
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByTestId('recipe-photo')).toBeInTheDocument();
    expect(await screen.findByTestId('recipe-title')).toHaveTextContent(mockRecipe.name);
    expect(await screen.findByTestId('recipe-category')).toHaveTextContent(mockRecipe.category || '');
    expect(await screen.findByTestId('instructions')).toHaveTextContent(mockRecipe.instructions);

    mockRecipe.ingredients.forEach((ingredient, index) => {
      expect(screen.getByTestId(`${index}-ingredient-name-and-measure`)).toHaveTextContent(`${ingredient} - ${mockRecipe.measures[index]}`);
    });

    expect(screen.getByTestId('video')).toBeInTheDocument();
  });

  test('renders recommendations correctly', async () => {
    render(
      <MemoryRouter initialEntries={ [`/meals/${RECIPE_ID}`] }>
        <Routes>
          <Route path="/meals/:id" element={ <RecipeDetails /> } />
        </Routes>
      </MemoryRouter>,
    );

    mockRecommendations.slice(0, 6).forEach((rec, index) => {
      expect(screen.getByTestId(`${index}-recommendation-card`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}-recommendation-title`)).toHaveTextContent(rec.name);
    });
  });

  test('hides start recipe button if recipe is done', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify([{ id: RECIPE_ID }]));

    render(
      <MemoryRouter initialEntries={ [`/meals/${RECIPE_ID}`] }>
        <Routes>
          <Route path="/meals/:id" element={ <RecipeDetails /> } />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.queryByTestId('start-recipe-btn')).not.toBeInTheDocument();
  });

  test('shows start recipe button if recipe is not done', async () => {
    render(
      <MemoryRouter initialEntries={ [`/meals/${RECIPE_ID}`] }>
        <Routes>
          <Route path="/meals/:id" element={ <RecipeDetails /> } />
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByTestId('start-recipe-btn')).toBeInTheDocument();
  });
});
