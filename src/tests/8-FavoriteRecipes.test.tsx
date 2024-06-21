import React from 'react';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from '../App';
import AppProvider from '../Context/AppProvider';
import { renderWithRouter } from '../Utils/renderWithRouter';

describe('Verifica as funcionalidades da página de receitas favoritas', () => {
  const favoriteRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
  ];

  const ALL = 'All';
  const MEALS = 'Meals';
  const DRINKS = 'Drinks';
  const SPICY_ARRABIATA_PENNE = 'Spicy Arrabiata Penne';
  const AQUAMARINE = 'Aquamarine';
  const LINK_COPIED = 'Link copied!';
  const PATH_MEALS_52771 = '/meals/52771';
  const PATH_DRINKS_178319 = '/drinks/178319';
  const ENTER_KEY = { key: 'Enter', code: 'Enter' };

  beforeEach(() => {
    // Mock do localStorage
    vi.stubGlobal('localStorage', {
      getItem: (key) => {
        if (key === 'favoriteRecipes') {
          return JSON.stringify(favoriteRecipes);
        }
        return null;
      },
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    });

    window.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
      { route: '/favorite-recipes' },
    );
  });

  it('deve renderizar corretamente os botões de filtro', () => {
    expect(screen.getByText(ALL)).toBeInTheDocument();
    expect(screen.getByText(MEALS)).toBeInTheDocument();
    expect(screen.getByText(DRINKS)).toBeInTheDocument();
  });

  it('deve renderizar corretamente os cartões de receitas', () => {
    expect(screen.getByText(SPICY_ARRABIATA_PENNE)).toBeInTheDocument();
    expect(screen.getByText(AQUAMARINE)).toBeInTheDocument();
  });

  it('deve deve ter o butão de desfavoritar', async () => {
    const favoriteButton = screen.getByTestId('0-horizontal-favorite-btn');
    expect(favoriteButton).toBeInTheDocument();
    fireEvent.click(favoriteButton);
    await waitFor(() => {
      expect(favoriteButton).not.toBeInTheDocument();
    });
  });

  it('deve filtrar apenas meal caso o botão de filtro for Meals', () => {
    const filterButton = screen.getByTestId('filter-by-meal-btn');
    fireEvent.click(filterButton);
    expect(screen.getByText(SPICY_ARRABIATA_PENNE)).toBeInTheDocument();
    expect(screen.queryByText(AQUAMARINE)).not.toBeInTheDocument();
  });

  it('deve filtrar apenas drink caso o botão de filtro for Drinks', () => {
    const filterButton = screen.getByTestId('filter-by-drink-btn');
    fireEvent.click(filterButton);
    expect(screen.getByText(AQUAMARINE)).toBeInTheDocument();
    expect(screen.queryByText(SPICY_ARRABIATA_PENNE)).not.toBeInTheDocument();
  });

  it('deve remover todos os filtros caso o botão de filtro for All', () => {
    const filterButton = screen.getByTestId('filter-by-all-btn');
    fireEvent.click(filterButton);
    expect(screen.getByText(SPICY_ARRABIATA_PENNE)).toBeInTheDocument();
    expect(screen.queryByText(AQUAMARINE)).toBeInTheDocument();
  });

  it('deve copiar o link da receita ao clicar no botão de compartilhar', async () => {
    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    fireEvent.click(shareButton);

    await waitFor(() => {
      expect(screen.getByText(LINK_COPIED)).toBeInTheDocument();
    });
  });

  it('deve desfavoritar uma receita ao clicar no botão de desfavoritar', async () => {
    const favoriteButton = screen.getByTestId('0-horizontal-favorite-btn');
    fireEvent.click(favoriteButton);

    await waitFor(() => {
      expect(screen.queryByText(SPICY_ARRABIATA_PENNE)).not.toBeInTheDocument();
    });
  });

  it('deve redirecionar para a tela de detalhes da receita favorita ao clicar no nome da receita', async () => {
    const favoriteMeal = screen.getByTestId('0-horizontal-name');
    fireEvent.click(favoriteMeal);

    await waitFor(() => {
      expect(window.location.pathname).toBe(PATH_MEALS_52771);
    });
  });

  it('deve redirecionar para a tela de detalhes da bebida favorita ao clicar no nome da bebida', async () => {
    const favoriteDrink = screen.getByTestId('1-horizontal-name');
    fireEvent.click(favoriteDrink);

    await waitFor(() => {
      expect(window.location.pathname).toBe(PATH_DRINKS_178319);
    });
  });

  it('deve redirecionar para a tela de detalhes da receita favorita ao pressionar Enter no nome da receita', async () => {
    const favoriteMeal = screen.getByTestId('0-horizontal-name');
    fireEvent.keyDown(favoriteMeal, ENTER_KEY);

    await waitFor(() => {
      expect(window.location.pathname).toBe(PATH_MEALS_52771);
    });
  });

  it('deve redirecionar para a tela de detalhes da bebida favorita ao pressionar Enter no nome da bebida', async () => {
    const favoriteDrink = screen.getByTestId('1-horizontal-name');
    fireEvent.keyDown(favoriteDrink, ENTER_KEY);

    await waitFor(() => {
      expect(window.location.pathname).toBe(PATH_DRINKS_178319);
    });
  });

  it('deve redirecionar para a tela de detalhes da receita favorita ao pressionar Enter na imagem da receita', async () => {
    const favoriteMealImage = screen.getByTestId('0-horizontal-image');
    fireEvent.keyDown(favoriteMealImage, ENTER_KEY);

    await waitFor(() => {
      expect(window.location.pathname).toBe(PATH_MEALS_52771);
    });
  });

  it('deve redirecionar para a tela de detalhes da bebida favorita ao pressionar Enter na imagem da bebida', async () => {
    const favoriteDrinkImage = screen.getByTestId('1-horizontal-image');
    fireEvent.keyDown(favoriteDrinkImage, ENTER_KEY);

    await waitFor(() => {
      expect(window.location.pathname).toBe(PATH_DRINKS_178319);
    });
  });
});
