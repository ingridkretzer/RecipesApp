import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Header from '../Header/Header';

function Layout() {
  const url = window.location.pathname;
  const headerOn = [
    '/meals',
    '/drinks',
    '/profile',
    '/done-recipes',
    '/favorite-recipes'];

  return (
    <div className={ styles.layout }>
      {headerOn.some((param) => param === url) && <Header />}
      <main className={ styles.main }>
        <Outlet />
      </main>
      <footer>Footer aqui</footer>
    </div>
  );
}

export default Layout;
