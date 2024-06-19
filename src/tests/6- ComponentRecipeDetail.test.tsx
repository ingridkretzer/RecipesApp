import React from 'react';
import { render } from '@testing-library/react';
import RecipeDetail from '../Pages/RecipeDetails/ComponentRecipeDetail';
import { Recipe } from '../Pages/RecipeDetails/recipeUtils';

const mockRecipe: Recipe = {
  id: '1',
  name: 'Mock Recipe',
  category: 'Category',
  ingredients: ['Ingredient 1', 'Ingredient 2'],
  measures: ['1 cup', '2 tbsp'],
  instructions: 'Mix ingredients',
  image: 'image.jpg',
  video: 'https://www.youtube.com/embed/mockvideo',
};

describe('RecipeDetail', () => {
  it('should render recipe details correctly', () => {
    const { getByTestId } = render(<RecipeDetail recipe={ mockRecipe } />);

    expect(getByTestId('recipe-title').textContent).toBe('Mock Recipe');
    expect(getByTestId('recipe-photo')).toHaveAttribute('src', 'image.jpg');
    expect(getByTestId('instructions').textContent).toBe('Mix ingredients');
    expect(getByTestId('video')).toHaveAttribute('src', 'https://www.youtube.com/embed/mockvideo');
  });
});
