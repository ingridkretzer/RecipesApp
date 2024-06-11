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

  return (
    <div className={ styles.layout }>
      {headerOn.some((param) => param === url) && <Header />}
      <main className={ styles.main }>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
