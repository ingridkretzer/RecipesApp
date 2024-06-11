import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer
      data-testid="footer"
      className={ styles.footer }
    >
      <Link
        to="/drinks"
      >
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="Ícone de bebida"
          className={ styles.drinksBtn }
        />
      </Link>
      <Link
        to="/meals"
      >
        <img
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          alt="Ícone de refeição"
          className={ styles.mealsBtn }
        />
      </Link>
    </footer>
  );
}

export default Footer;
