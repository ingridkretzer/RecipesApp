import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from '../Components/Footer/Footer';

const renderWithRouter = (ui: any, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: Router });
};

describe('Verifica as funcionalidades do footer', () => {
  it('Testa a existência dos ícones no footer na rota /meals', () => {
    renderWithRouter(<Footer />, { route: '/meals' });
    const drinkIcon = screen.getByAltText('Ícone de bebida');
    const mealIcon = screen.getByAltText('Ícone de refeição');
    expect(drinkIcon).toBeInTheDocument();
    expect(mealIcon).toBeInTheDocument();
  });

  it('Testa a existência dos ícones no footer na rota /drinks', () => {
    renderWithRouter(<Footer />, { route: '/drinks' });
    const drinkIcon = screen.getByAltText('Ícone de bebida');
    const mealIcon = screen.getByAltText('Ícone de refeição');
    expect(drinkIcon).toBeInTheDocument();
    expect(mealIcon).toBeInTheDocument();
  });

  it('Verifica se o footer contém os links corretos', () => {
    renderWithRouter(<Footer />);
    const drinkLink = screen.getByTestId('drinks-bottom-btn').closest('a');
    const mealLink = screen.getByTestId('meals-bottom-btn').closest('a');
    expect(drinkLink).toHaveAttribute('href', '/drinks');
    expect(mealLink).toHaveAttribute('href', '/meals');
  });

  it('Testa a ausência do footer em uma rota não listada', () => {
    renderWithRouter(<Footer />);
    expect(screen.queryByTestId('footer')).toBeInTheDocument();
  });
});
