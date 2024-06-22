import { screen, waitFor } from '@testing-library/dom';
import { vi } from 'vitest';
import App from '../App';
import AppProvider from '../Context/AppProvider';
import { renderWithRouter } from '../Utils/renderWithRouter';
import { getFromLocalStorage } from '../Utils/localStorageUtils';

describe('Verifica a página Done Recipes', () => {
  const doneRecipesRoute = '/done-recipes';
  const firstRecipeName = '0-horizontal-name';

  beforeEach(() => {
    const doneRecipes = [
      {
        alcoholicOrNot: '',
        category: 'Beef',
        doneDate: '2024-06-21T20:07:32.131Z',
        id: '53069',
        image: 'https://www.themealdb.com/images/media/meals/4pqimk1683207418.jpg',
        name: 'Bistek',
        nationality: 'Filipino',
        tags: [],
        type: 'meal',
      },
      {
        alcoholicOrNot: 'Alcoholic',
        category: 'Shot',
        doneDate: '2024-06-22T14:03:55.762Z',
        id: '14229',
        image: 'https://www.thecocktaildb.com/images/media/drink/xxsxqy1472668106.jpg',
        name: '747',
        nationality: '',
        tags: [],
        type: 'drink',
      },
    ];
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  });
  afterEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test('Verifica se a receita é recuperada do localStorage', async () => {
    renderWithRouter(<AppProvider><App /></AppProvider>, { route: doneRecipesRoute });

    const title = await screen.findByTestId('page-title');
    const bistek = await screen.findByText(/bistek/i);
    expect(bistek).toHaveTextContent('Bistek');
    expect(title).toHaveTextContent('Done Recipes');
  });
  test('Verifica se ao clicar em compartilhar renderiza a mensagem "Link copied!"', async () => {
    navigator.clipboard.writeText = vi.fn();
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route: doneRecipesRoute });

    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    await user.click(shareBtn);

    const copy = screen.getByText(/link copied!/i);
    expect(copy).toBeVisible();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/meals/53069');
  });
  test('Verifica os botão de filtro "Meals"', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route: doneRecipesRoute });
    const meals = screen.getByTestId('filter-by-meal-btn');

    await user.click(meals);
    const firstItemM = screen.getByTestId('0-horizontal-name');
    expect(firstItemM).toHaveTextContent('Bistek');
  });
  test('Verifica o botão de filtro "Drinks"', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route: doneRecipesRoute });

    const drinks = screen.getByRole('button', { name: /drinks/i });

    await user.click(drinks);

    const firstItemD = screen.getByTestId(firstRecipeName);
    expect(firstItemD).toHaveTextContent('747');
  });
  test('Verifica o botão All', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route: doneRecipesRoute });

    const all = screen.getByRole('button', { name: /all/i });
    await user.click(all);

    const firstItemA = screen.getByTestId(firstRecipeName);
    const secondItemA = screen.getByTestId('1-horizontal-name');

    expect(firstItemA).toHaveTextContent(/bistek/i);
    expect(secondItemA).toHaveTextContent(/747/i);
  });

  test('Verifica se navega para a pagina de detalhes do item ao clicar no nome', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route: doneRecipesRoute });

    const firstItemLink = screen.getByTestId(firstRecipeName);

    await user.click(firstItemLink);
    await waitFor(() => expect(global.location.pathname).toBe('/meals/53069'));
  });
  test('Verifica o retorno do localStorage', () => {
    renderWithRouter(<AppProvider><App /></AppProvider>, { route: doneRecipesRoute });

    const itens = JSON.parse(localStorage.getItem('doneRecipes') || '[]');

    expect(itens).toHaveLength(2);
  });
});
