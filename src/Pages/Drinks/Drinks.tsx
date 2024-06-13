import { useContext, useEffect } from 'react';
import AppContext from '../../Context/AppContext';
import DrinksReceps from '../../Components/Recepies/DrinksReceps';
import { fetchByName } from '../../Utils/API';

function Drinks() {
  const { setHeaderTitle, setDrinks } = useContext(AppContext);

  useEffect(() => {
    setHeaderTitle('Drinks');
    const getDrinks = async () => {
      const results = await fetchByName('thecocktaildb', '');
      setDrinks(results.drinks);
    };
    getDrinks();
  }, []);

  return (
    <section>
      <h1>Drinks</h1>
      <DrinksReceps />
    </section>
  );
}

export default Drinks;
