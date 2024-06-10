import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../Hooks/useLocalStorage';
import styles from './LoginForm.module.css';

function LoginForm() {
  const [loginInfos, setLoginInfos] = useState({ email: '', password: '' });
  const LOCALSTORAGE = useLocalStorage();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfos((prev) => (
      {
        ...prev,
        [e.target.name]: e.target.value,
      }
    ));
  };

  const handleLogin = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { email } = loginInfos;
    setLoginInfos({ email: '', password: '' });
    LOCALSTORAGE.setLocalStorage('user', { email });
    navigate('/meals');
  };

  const validateLogin = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const { email, password } = loginInfos;
    return (
      !emailRegex.test(email)
      || password.length < 7
    );
  };

  return (
    <form className={ styles.form }>
      <h1>Login</h1>
      <div>
        <label htmlFor="email">Email</label>
        <input
          data-testid="email-input"
          className={ styles.inputs }
          onChange={ handleChange }
          value={ loginInfos.email }
          name="email"
          type="email"
          placeholder="E-mail"
        />
      </div>
      <div>
        <label htmlFor="password">Senha</label>
        <input
          data-testid="password-input"
          className={ styles.inputs }
          name="password"
          onChange={ handleChange }
          value={ loginInfos.password }
          type="password"
          placeholder="Senha (min 7 caracteres)"
        />
      </div>
      <div>
        <button
          data-testid="login-submit-btn"
          className={ styles.loginBtn }
          onClick={ handleLogin }
          disabled={ validateLogin() }
        >
          Enter
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
