import { Outlet } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import styles from './Layout.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import AppContext from '../../Context/AppContext';

function Layout() {
  const [header, setHeader] = useState(false);
  const [footer, setFooter] = useState(false);
  const [layoutClass, setLayoutClass] = useState(styles.layout);
  const { url } = useContext(AppContext);

  useEffect(() => {
    setHeader(headerOn.some((param) => param === url));
    setFooter(footerOn.some((param) => param === url));
    if (url === '/meals' || url === '/drinks') {
      setLayoutClass(styles.layout);
    } else {
      setLayoutClass(styles.layout2);
    }
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
    <div className={ layoutClass }>
      {header && <Header />}
      <main className={ styles.main }>
        <Outlet />
      </main>
      {footer && <Footer />}
    </div>
  );
}

export default Layout;
