import { screen, waitFor } from '@testing-library/dom';
import { vi } from 'vitest';
import App from '../App';
import { renderWithRouter } from '../Utils/renderWithRouter';
import AppProvider from '../Context/AppProvider';

describe('Verifica as funcionalidades do header', () => {
  const searchiconId = 'search-top-btn';
  const searchInputId = 'search-input';
  const searchBtnId = 'exec-search-btn';
  const nameSearch = 'name-search-radio';
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
    const nameRadio = screen.getByTestId(nameSearch);
    const searchBtn = screen.getByTestId(searchBtnId);

    await user.type(searchInput, 'lasagna');
    await user.click(nameRadio);
    await user.click(searchBtn);

    const veganLasagna = await screen.findByText(/vegan lasagna/i);
    const lasagnaSand = await screen.findByText(/lasagna sandwiches/i);

    expect(veganLasagna).toBeVisible();
    expect(lasagnaSand).toBeVisible();
  });
  test('Verifica a pesquisa por ingrediente da receita', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route: '/meals' });
    const searchIcon = screen.getByTestId(searchiconId);

    await user.click(searchIcon);
    const searchInput2 = screen.getByTestId(searchInputId);
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const searchBtn2 = screen.getByTestId(searchBtnId);

    await user.type(searchInput2, 'beef');
    await user.click(ingredientRadio);
    await user.click(searchBtn2);

    const beefPie = await screen.findByText(/beef and mustard pie/i);
    const beefCalderata = await screen.findByText(/beef caldereta/i);
    expect(beefPie).toBeVisible();
    expect(beefCalderata).toBeVisible();
  });
  test('Verifica a pesquisa por primeira letra da receita', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route: '/meals' });
    const searchIcon = screen.getByTestId(searchiconId);

    await user.click(searchIcon);
    const searchInput3 = screen.getByTestId(searchInputId);
    const letterRadio = screen.getByTestId('first-letter-search-radio');
    const searchBtn3 = screen.getByTestId(searchBtnId);

    await user.type(searchInput3, 'a');
    await user.click(letterRadio);
    await user.click(searchBtn3);

    const appleCrumble = await screen.findByText(/apple frangipan tart/i);
    const ayamPercik = await screen.findByText(/ayam percik/i);

    expect(appleCrumble).toBeVisible();
    expect(ayamPercik).toBeVisible();
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
  test('Verifica se caso a busca ache apenas 1 receita, redireciona para a página de detalhes', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route: '/meals' });

    const searchIcon4 = screen.getByTestId(searchiconId);

    await user.click(searchIcon4);
    const searchInput4 = screen.getByTestId(searchInputId);
    const nameRadio4 = screen.getByTestId(nameSearch);
    const searchBtn4 = screen.getByTestId(searchBtnId);

    await user.type(searchInput4, 'Arrabiata');
    await user.click(nameRadio4);
    await user.click(searchBtn4);

    await waitFor(() => expect(global.location.pathname).toBe('/meals/52771'));
  });
  test('Verifica se aparece o alerta caso o item não seja encontrado', async () => {
    const alert = vi.spyOn(global, 'alert').mockImplementation(() => {});

    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route: '/meals' });

    const searchIcon5 = screen.getByTestId(searchiconId);

    await user.click(searchIcon5);
    const searchInput5 = screen.getByTestId(searchInputId);
    const nameRadio5 = screen.getByTestId(nameSearch);
    const searchBtn5 = screen.getByTestId(searchBtnId);

    await user.type(searchInput5, 'asdasdasd');
    await user.click(nameRadio5);
    await user.click(searchBtn5);

    await waitFor(() => {
      expect(alert).toBeCalledWith("Sorry, we haven't found any recipes for these filters");
    });
    alert.mockRestore();
  });
  test('Verifica o alert caso seja pesquisado mais de 1 caractere com o raio button first letter', async () => {
    const alert2 = vi.spyOn(global, 'alert').mockImplementation(() => {});

    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route: '/meals' });

    const searchIcon5 = screen.getByTestId(searchiconId);

    await user.click(searchIcon5);
    const searchInput6 = screen.getByTestId(searchInputId);
    const letterRadio2 = screen.getByTestId('first-letter-search-radio');
    const searchBtn6 = screen.getByTestId(searchBtnId);

    await user.type(searchInput6, 'aa');
    await user.click(letterRadio2);
    await user.click(searchBtn6);

    await waitFor(() => {
      expect(alert).toBeCalledWith('Your search must have only 1 (one) character');
    });
    alert2.mockRestore();
  });
  test('Verifica a funcionalidade dos botões de categoria', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route: '/meals' });

    const dessertCategory = screen.getByRole('button', { name: 'Dessert' });
    await user.click(dessertCategory);

    const apam = await screen.findByText(/apam balik/i);
    const carrotCake = await screen.findByText(/carrot cake/i);

    expect(apam).toBeVisible();
    expect(carrotCake).toBeVisible();
  });
  test('Verifica se o botão All reseta a busca', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route: '/meals' });

    const beefBtn = screen.getByRole('button', { name: 'Beef' });

    await user.click(beefBtn);
    const beefPie2 = await screen.findByText(/beef and mustard pie/i);
    const beefCalderata2 = await screen.findByText(/beef caldereta/i);

    expect(beefPie2).toBeVisible();
    expect(beefCalderata2).toBeVisible();

    const allBtn = await screen.findByRole('button', { name: 'All' });

    await user.click(allBtn);
    const sushi = await screen.findByText(/sushi/i);
    const wontons = await screen.findByText(/wontons/i);

    expect(sushi).toBeVisible();
    expect(wontons).toBeVisible();
  });
  test('Verifica as categorias de Drinks', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route: '/drinks' });

    const shakeCat = await screen.findByRole('button', { name: /shake/i });

    await user.click(shakeCat);
    const bananaMilk = await screen.findByText(/banana milk shake/i);
    expect(bananaMilk).toBeVisible();

    const allBtn2 = await screen.findByRole('button', { name: 'All' });

    await user.click(allBtn2);

    const ace = await screen.findByText(/ace/i);
    expect(ace).toBeVisible();
  });
  test('Verifica a pesquisa por nome de drinks', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route: '/drinks' });
    const searchIconD = screen.getByTestId(searchiconId);

    await user.click(searchIconD);
    const searchInputD = screen.getByTestId(searchInputId);
    const nameRadioD = screen.getByTestId(nameSearch);
    const searchBtnD = screen.getByTestId(searchBtnId);

    await user.type(searchInputD, 'ace');
    await user.click(nameRadioD);
    await user.click(searchBtnD);

    const ace2 = await screen.findByText(/ace/i);
    expect(ace2).toBeVisible();
  });
  test('Verifica a pesquisa por ingrediente do drink', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route: '/drinks' });
    const searchIconD2 = screen.getByTestId(searchiconId);

    await user.click(searchIconD2);
    const searchInputD2 = screen.getByTestId(searchInputId);
    const ingredientRadioD = screen.getByTestId('ingredient-search-radio');
    const searchBtnD2 = screen.getByTestId(searchBtnId);

    await user.type(searchInputD2, 'cachaça');
    await user.click(ingredientRadioD);
    await user.click(searchBtnD2);

    const darkCaip = await screen.findByText(/dark caipirinha/i);
    const ipanema = await screen.findByText(/girl from ipanema/i);
    expect(darkCaip).toBeVisible();
    expect(ipanema).toBeVisible();
  });
});
