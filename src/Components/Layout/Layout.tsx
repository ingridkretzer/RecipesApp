import { Outlet } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import styles from './Layout.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import AppContext from '../../Context/AppContext';

function Layout() {
  const [header, setHeader] = useState(false);
  const [footer, setFooter] = useState(false);
  const { url } = useContext(AppContext);

  useEffect(() => {
    setHeader(headerOn.some((param) => param === url));
    setFooter(footerOn.some((param) => param === url));
  }, [url]);

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
      {header && <Header />}
      <main className={ styles.main }>
        <Outlet />
      </main>
      {footer && <Footer />}
    </div>
  );
}

export default Layout;
