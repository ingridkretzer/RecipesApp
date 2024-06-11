import { screen } from '@testing-library/dom';
import App from '../App';
import { renderWithRouter } from '../Utils/renderWithRouter';
import AppProvider from '../Context/AppProvider';

describe('Verifica as funcionalidades do header', () => {
  const searchiconId = 'search-top-btn';
  const searchInputId = 'search-input';
  const searchBtnId = 'exec-search-btn';
  const headerTitle = 'page-title';

  test('Verifica se ao ser clicado, o botao de perfil redireciona para a pagina correta', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route: '/meals' });

    const profileBtn = screen.getByTestId('profile-top-btn');
    await user.click(profileBtn);

    const heading1 = screen.getByRole('heading', { level: 1 });
    expect(heading1).toHaveTextContent('Profile');
  });
  test('Verifica a pesquisa por nome da receita', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route: '/meals' });
    const searchIcon = screen.getByTestId(searchiconId);

    await user.click(searchIcon);
    const searchInput = screen.getByTestId(searchInputId);
    const nameRadio = screen.getAllByTestId('name-search-radio');
    const searchBtn = screen.getByTestId('exec-search-btn');

    await user.type(searchInput, 'lasagna');
    await user.click(searchBtn);
  });
  test('Verifica a pesquisa por ingrediente da receita', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route: '/meals' });
    const searchIcon = screen.getByTestId(searchiconId);

    await user.click(searchIcon);
    const searchInput2 = screen.getByTestId(searchInputId);
    const ingredientRadio = screen.getAllByTestId('ingredient-search-radio');
    const searchBtn2 = screen.getByTestId(searchBtnId);

    await user.type(searchInput2, 'beef');
    await user.click(searchBtn2);
  });
  test('Verifica a pesquisa por primeira letra da receita', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route: '/meals' });
    const searchIcon = screen.getByTestId(searchiconId);

    await user.click(searchIcon);
    const searchInput3 = screen.getByTestId(searchInputId);
    const letterRadio = screen.getAllByTestId('first-letter-search-radio');
    const searchBtn2 = screen.getByTestId(searchBtnId);

    await user.type(searchInput3, 'a');
    await user.click(searchBtn2);
  });

  test('Verifica o titulo do header na pagina meals', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route: '/meals' });

    const title = screen.getByTestId(headerTitle);
    expect(title).toHaveTextContent('Meals');
  });

  test('Verifica o titulo do header na pagina meals', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route: '/drinks' });

    const title2 = screen.getByTestId(headerTitle);
    expect(title2).toHaveTextContent('Drinks');
  });
});
