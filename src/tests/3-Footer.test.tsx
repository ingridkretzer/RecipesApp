import { screen } from '@testing-library/dom';
import App from '../App';
import { renderWithRouter } from '../Utils/renderWithRouter';
import Footer from '../Components/Footer/Footer';

describe('Verifica as funcionalidades do footer', () => {
  const drinkIcon = screen.getByAltText('Ícone de bebida');
  const mealIcon = screen.getByAltText('Ícone de refeição');

  it('Testa a existência dos ícones no footer na rota /meals', () => {
    renderWithRouter(<App />, { route: '/meals' });
    expect(drinkIcon).toBeInTheDocument();
    expect(mealIcon).toBeInTheDocument();
  });

  it('Testa a existência dos ícones no footer na rota /drinks', () => {
    renderWithRouter(<App />, { route: '/drinks' });
    expect(drinkIcon).toBeInTheDocument();
    expect(mealIcon).toBeInTheDocument();
  });

  it('Testa a existência dos ícones no footer na rota /profile', () => {
    renderWithRouter(<App />, { route: '/profile' });
    expect(drinkIcon).toBeInTheDocument();
    expect(mealIcon).toBeInTheDocument();
  });

  it('Testa a existência dos ícones no footer na rota /', () => {
    renderWithRouter(<App />, { route: '/' });
    expect(<Footer />).notToBeInTheDocument();
  });

  it('Testa a existência dos ícones no footer na rota /done-recipes', () => {
    renderWithRouter(<App />, { route: '/done-recipes' });
    expect(<Footer />).notToBeInTheDocument();
  });

  it('Testa a existência dos ícones no footer na rota /favorite-recipes', () => {
    renderWithRouter(<App />, { route: '/favorite-recipes' });
    expect(<Footer />).notToBeInTheDocument();
  });
});
