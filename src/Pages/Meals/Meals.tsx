import { useContext, useEffect } from 'react';
import AppContext from '../../Context/AppContext';
import { fetchByName } from '../../Utils/API';
import MealsReceps from '../../Components/Recepies/MealsRecipes';
import styles from './Meals.module.css';

function Meals() {
  const { setHeaderTitle, setMeals } = useContext(AppContext);

  useEffect(() => {
    setHeaderTitle('Meals');
    const getMeals = async () => {
      const results = await fetchByName('themealdb', '');
      setMeals(results.meals);
    };
    getMeals();
  }, []);

  return (
    <section className={ styles.mealsPage }>
      <h1>Meals</h1>
      <MealsReceps />
    </section>
  );
}

export default Meals;
