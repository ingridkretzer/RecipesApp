import { screen } from '@testing-library/react'; // Import the 'screen' object from the testing library
import AppProvider from '../Context/AppProvider';
import { renderWithRouter } from '../Utils/renderWithRouter';
import App from '../App';

describe('Verifica as funcionalidades do Perfil', () => {
  it('Verifica se ao ser clicado, o botao Done Recipes, redireciona para a pagina correta', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route: '/profile' });

    const profileBtn = screen.getByTestId('profile-done-btn');
    await user.click(profileBtn);

    expect(screen.getByTestId('page-title')).toHaveTextContent('Done Recipes');
  });

  it('Verifica se ao ser clicado, o botao Favorite Recipes, redireciona para a pagina correta', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route: '/profile' });

    const profileBtn = screen.getByTestId('profile-favorite-btn');
    await user.click(profileBtn);

    expect(screen.getByRole('heading', { name: /Favorite Recipes/i })).toBeInTheDocument();
  });

  it('Verifica se ao ser clicado, o botao Logout, redireciona para a pagina correta', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>, { route: '/profile' });

    const profileBtn = screen.getByTestId('profile-logout-btn');
    await user.click(profileBtn);

    expect(screen.getByRole('heading', { name: /Login/i })).toBeInTheDocument();
    expect(localStorage.getItem('user')).toBeNull();
  });

  it('Verifica se o email do usuário é exibido corretamente', () => {
    const email = 'test@example.com';
    localStorage.setItem('user', JSON.stringify({ email }));
    renderWithRouter(<AppProvider><App /></AppProvider>, { route: '/profile' });

    const emailDisplay = screen.getByTestId('profile-email');
    expect(emailDisplay).toBeInTheDocument();
    expect(emailDisplay).toHaveTextContent(email);
  });
});
