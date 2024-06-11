import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/drinks" data-testid="drinks-bottom-btn">
        <img src={ drinkIcon } alt="Ícone de bebida" />
      </Link>
      <Link to="/meals" data-testid="meals-bottom-btn">
        <img src={ mealIcon } alt="Ícone de refeição" />
      </Link>
    </footer>
  );
}

export default Footer;
