import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RecipeDetails from '../Pages/RecipeDetails/RecipeDetails';
import * as utils from '../Pages/RecipeDetails/recipeUtils';

jest.mock('./recipeUtils');

const mockRecipe = {
  id: '1',
  name: 'Mock Recipe',
  category: 'Category',
  ingredients: ['Ingredient 1', 'Ingredient 2'],
  measures: ['1 cup', '2 tbsp'],
  instructions: 'Mix ingredients',
  image: 'image.jpg',
  video: 'https://www.youtube.com/embed/mockvideo',
};

const mockRecommendations = [
  { id: '2', image: 'image2.jpg', title: 'Recommendation 1' },
  { id: '3', image: 'image3.jpg', title: 'Recommendation 2' },
];

describe('RecipeDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (utils.fetchRecipeData as jest.Mock).mockResolvedValue(mockRecipe);
    (utils.transformRecipeData as jest.Mock).mockReturnValue(mockRecipe);
    (utils.fetchRecommendations as jest.Mock).mockResolvedValue(mockRecommendations);
    (utils.transformRecommendationData as jest.Mock).mockReturnValue(mockRecommendations);
  });

  it('should display loading state initially', () => {
    render(
      <BrowserRouter>
        <RecipeDetails />
      </BrowserRouter>,
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should display recipe details and recommendations', async () => {
    render(
      <BrowserRouter>
        <RecipeDetails />
      </BrowserRouter>,
    );

    await waitFor(() => expect(screen.getByTestId('recipe-title')).toBeInTheDocument());

    expect(screen.getByTestId('recipe-title').textContent).toBe('Mock Recipe');
    expect(screen.getByTestId('recipe-photo')).toHaveAttribute('src', 'image.jpg');
    expect(screen.getByTestId('instructions').textContent).toBe('Mix ingredients');
    expect(screen.getAllByTestId(/ingredient-name-and-measure/).length).toBe(2);
    expect(screen.getByTestId('video')).toHaveAttribute('src', 'https://www.youtube.com/embed/mockvideo');
  });

  it('should display error if recipe is not found', async () => {
    (utils.fetchRecipeData as jest.Mock).mockResolvedValue(null);
    render(
      <BrowserRouter>
        <RecipeDetails />
      </BrowserRouter>,
    );

    await waitFor(() => expect(screen.getByText(/recipe not found/i)).toBeInTheDocument());
  });
});
