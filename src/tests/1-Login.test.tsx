import { screen } from '@testing-library/dom';
import App from '../App';
import { renderWithRouter } from '../Utils/renderWithRouter';
import AppProvider from '../Context/AppProvider';

describe('Verifica as funcionalidades do form de login', () => {
  test('testa o botao esta desativado ao iniciar e ao colocar os dados incorretamente', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>);

    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('password-input');
    const enterBtn = screen.getByRole('button', { name: 'Enter' });
    const title = screen.getByText(/login/i);

    expect(title).toBeVisible();
    expect(enterBtn).toBeDisabled();
    expect(emailInput).toBeVisible();

    await user.type(emailInput, 'invalid@email.c');
    await user.type(passInput, '123456');

    const enterBtn2 = screen.getByRole('button', { name: 'Enter' });
    expect(enterBtn2).toBeDisabled();
  });
  test('Verifica se o botao esta ativo caso os dados sejam inseridos corretamente', async () => {
    const { user } = renderWithRouter(<AppProvider><App /></AppProvider>);

    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('password-input');
    const enterBtn = screen.getByRole('button', { name: 'Enter' });

    await user.type(emailInput, 'valid@email.com');
    await user.type(passInput, '1234567');
    expect(enterBtn).not.toBeDisabled();
    await user.click(enterBtn);

    const heading1 = screen.getByRole('heading', { level: 1 });
    expect(heading1).toHaveTextContent('Meals');
  });
});
