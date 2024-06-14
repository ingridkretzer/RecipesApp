import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../../Context/AppContext';
import { fetchByName } from '../../Utils/API';
import MealsReceps from '../../Components/Recepies/MealsRecipes';
import styles from './Recipes.module.css';
import DrinksReceps from '../../Components/Recepies/DrinksRecipes';

function Recipes() {
  const { setHeaderTitle, setMeals, setDrinks } = useContext(AppContext);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/meals') {
      setHeaderTitle('Meals');
    } else {
      setHeaderTitle('Drinks');
    }

    const getRecipes = async () => {
      const param = pathname === '/meals' ? 'themealdb' : 'thecocktaildb';
      const results = await fetchByName(param, '');
      const data = pathname === '/meals' ? results.meals : results.drinks;
      const set = pathname === '/meals' ? setMeals : setDrinks;
      set(data);
    };
    getRecipes();
  }, [pathname]);

  return (
    <section>
      {pathname === '/meals' && (
        <section className={ styles.recipesPage }>
          <h1>Meals</h1>
          <MealsReceps />
        </section>
      )}
      {pathname === '/drinks' && (
        <section className={ styles.recipesPage }>
          <h1>Drinks</h1>
          <DrinksReceps />
        </section>
      )}
    </section>
  );
}

export default Recipes;
