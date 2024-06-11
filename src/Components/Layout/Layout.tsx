import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Layout() {
  const url = window.location.pathname;
  const headerOn = [
    '/meals',
    '/drinks',
    '/profile',
    '/done-recipes',
    '/favorite-recipes'];

  const footerOn = [
    '/meals',
    '/drinks',
    '/profile'];

  return (
    // footer e header renderizados condicionalmente
    <div className={ styles.layout }>
      {headerOn.some((param) => param === url) && <Header />}
      <main className={ styles.main }>
        <Outlet />
      </main>
      {footerOn.some((param) => param === url) && <Footer />}
    </div>
  );
}

export default Layout;
