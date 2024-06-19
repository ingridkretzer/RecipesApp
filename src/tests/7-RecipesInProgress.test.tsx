import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';
import AppProvider from '../Context/AppProvider';
import { renderWithRouter } from '../Utils/renderWithRouter';

describe('Verifica as funcionalidades da página de receitas em progresso', () => {
  const route = '/meals/52771/in-progress';
  const routeDrink = '/drinks/14610/in-progress';
  const favoriteBtn = 'favorite-btn';
  const finishBtn = 'finish-recipe-btn';

  it('Verifica se o botão de favoritar funciona corretamente', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route });

    await waitFor(() => {
      const favoriteButton = screen.getByTestId(favoriteBtn);
      expect(favoriteButton).toBeInTheDocument();

      user.click(favoriteButton);
      const favorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
      expect(favorites).toContainEqual(expect.objectContaining({ id: '52771' }));
    });
  });

  it('Verifica se os ingredientes são marcados corretamente em meals', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route });

    await waitFor(() => {
      const checkbox = screen.getByLabelText(/penne rigate - 1 pound/i);
      expect(checkbox).toBeInTheDocument();
      user.click(checkbox);
      expect(checkbox).toBeChecked();
    });
  });

  it('Verifica se os ingredientes são marcados corretamente em drinks', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route: routeDrink });

    await waitFor(() => {
      const checkbox = screen.getByLabelText(/Wild Turkey - 1 oz/i);
      expect(checkbox).toBeInTheDocument();
      user.click(checkbox);
      expect(checkbox).toBeChecked();
    });
  });

  it('Verifica se o botão de copiar receita funciona corretamente', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route });

    await waitFor(() => {
      const copyButton = screen.getByTestId('share-btn');
      expect(copyButton).toBeInTheDocument();
    });

    const copyButton = screen.getByTestId('share-btn');
    user.click(copyButton);

    await waitFor(() => {
      const copiedMessage = screen.getByText('Link copied!');
      expect(copiedMessage).toBeInTheDocument();
    });
  });

  it('Verifica se a receita é finalizada corretamente', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route });

    await waitFor(() => {
      const checkbox = screen.getByLabelText(/penne rigate - 1 pound/i);
      user.click(checkbox);
    });

    const finishButton = screen.getByTestId(finishBtn);
    user.click(finishButton);

    await waitFor(() => {
      const storedProgress = JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');
      expect(storedProgress.meals['52771']).toHaveLength(1);
    });
  });

  beforeEach(() => {
    localStorage.clear();
  });

  it('Verifica se o botão de favoritar funciona corretamente', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route: routeDrink });

    const favoriteButton = await waitFor(() => screen.getByTestId(favoriteBtn));
    expect(favoriteButton).toBeInTheDocument();

    user.click(favoriteButton);

    await waitFor(() => {
      const storedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
      expect(storedFavorites).toEqual([{
        id: '14610',
        type: 'drink',
        nationality: '',
        category: 'Shot',
        alcoholicOrNot: 'Alcoholic',
        name: 'ACID',
        image: 'https://www.thecocktaildb.com/images/media/drink/xuxpxt1479209317.jpg',
      }]);
    });

    user.click(favoriteButton);

    await waitFor(() => {
      const storedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
      expect(storedFavorites).toEqual([]);
    });
  });

  it('verifica o botao finish recipe', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route: routeDrink });

    const checkbox1 = await screen.findByTestId('0-ingredient-step');
    const checkbox2 = await screen.findByTestId('1-ingredient-step');

    expect(checkbox1).toBeVisible();
    expect(checkbox2).toBeVisible();

    await user.click(checkbox1);
    await user.click(checkbox2);

    const finishButton = screen.getByTestId(finishBtn);

    await user.click(finishButton);

    const doneRecipes = await screen.findByRole('heading', { level: 1 });

    expect(doneRecipes).toHaveTextContent('Done Recipes');
  });

  it('Verifica se um ingrediente marcado é desmarcado corretamente', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route: routeDrink });

    const checkbox1 = await screen.findByTestId('0-ingredient-step');
    expect(checkbox1).toBeVisible();

    await user.click(checkbox1);
    await waitFor(() => {
      expect(checkbox1).toHaveStyle('text-decoration: line-through solid rgb(0, 0, 0);');
    });

    await user.click(checkbox1);
    await waitFor(() => {
      expect(checkbox1).toHaveStyle('text-decoration: none;');
    });

    await waitFor(() => {
      const storedProgress = JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');
      expect(storedProgress.drinks['14610']).toEqual([]);
    });
  });

  it('Verifica se o botão de favoritar funciona corretamente para bebidas', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route: routeDrink });

    const favoriteButton = await screen.findByTestId('favorite-btn');
    expect(favoriteButton).toBeInTheDocument();

    await user.click(favoriteButton);
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    expect(storedFavorites).toContainEqual(expect.objectContaining({ id: '14610' }));

    await user.click(favoriteButton);
    const updatedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    expect(updatedFavorites).not.toContainEqual(expect.objectContaining({ id: '14610' }));
  });

  it('Verifica se os detalhes da receita de comida são salvos corretamente ao finalizar', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route });

    const checkboxes = await screen.findAllByRole('checkbox');
    await Promise.all(checkboxes.map(async (checkbox) => {
      await user.click(checkbox);
    }));

    checkboxes.forEach((checkbox) => {
      expect(checkbox).toBeChecked();
    });

    const finishButton = screen.getByTestId('finish-recipe-btn');
    expect(finishButton).not.toBeDisabled();
    await user.click(finishButton);

    await waitFor(() => {
      const storedDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
      expect(storedDoneRecipes).toContainEqual(expect.objectContaining({
        id: '52771',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        doneDate: expect.any(String),
        tags: expect.any(Array),
      }));
    });
  });
});
