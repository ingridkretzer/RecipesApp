import { useContext, useEffect } from 'react';
import AppContext from '../../Context/AppContext';
import { fetchByName } from '../../Utils/API';

function Meals() {
  const { setHeaderTitle, setMeals, meals } = useContext(AppContext);

  useEffect(() => {
    setHeaderTitle('Meals');
  }, []);

  return (
    <section>
      <h1>Meals</h1>
    </section>
  );
}

export default Meals;
