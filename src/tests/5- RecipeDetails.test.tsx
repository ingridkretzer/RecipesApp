import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/dom';
import App from '../App';
import AppProvider from '../Context/AppProvider';
import { renderWithRouter } from '../Utils/renderWithRouter';

const loadingText = /loading.../i;

describe('Verifica a tela de detalhes', () => {
  test('Verifica se existe o texto "Loading..." antes de carregar as informações', async () => {
    renderWithRouter(<AppProvider><App /></AppProvider>, { route: '/meals/53060' });

    const loading = await screen.findByText('Loading...');
    expect(loading).toBeVisible();
  });
  test('Verifica os elementos da tela de detalhes da comida após o loaing', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route: '/meals/53060' });

    const loading2 = screen.getByText(loadingText);

    await waitFor(() => expect(loading2).toBeVisible());

    await waitForElementToBeRemoved(() => screen.getByText(loadingText), { timeout: 3000 });

    const burek = await screen.findByRole('heading', { level: 1 });
    expect(burek).toHaveTextContent(/burek/i);
  });

  test('Verifica se retorna a mensagem Recipe not found caso seja passado o ID errado', async () => {
    renderWithRouter(<AppProvider><App /></AppProvider>, { route: '/meals/sasdasd' });

    const notFound = await screen.findByText('Recipe not found.');
    expect(notFound).toBeVisible();
  });
  test('Verifica as funcionalidades do botão Star Recipe', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route: '/meals/52771' });

    const startBtn = await screen.findByTestId('start-recipe-btn');

    await user.click(startBtn);

    await waitFor(() => expect(global.location.pathname).toBe('/meals/52771/in-progress'));
  });
  test('Verifica os elementos da tela de detalhes do drink após o loaing', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route: '/drinks/17222' });

    const loading3 = screen.getByText(loadingText);

    await waitFor(() => expect(loading3).toBeVisible());

    await waitForElementToBeRemoved(() => screen.getByText(loadingText), { timeout: 3000 });

    const burek = await screen.findByRole('heading', { level: 1 });
    expect(burek).toHaveTextContent(/A1/i);
  });
  test('Verifica se retorna a mensagem Recipe not found caso seja passado o ID (drink) errado', async () => {
    renderWithRouter(<AppProvider><App /></AppProvider>, { route: '/drinks/sasdasd' });

    const notFoundD = await screen.findByText('Failed to fetch recipe details.');
    expect(notFoundD).toBeVisible();
  });
});
