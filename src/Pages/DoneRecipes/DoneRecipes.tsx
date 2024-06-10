import { useContext, useEffect } from 'react';
import AppContext from '../../Context/AppContext';

function DoneRecipes() {
  const { setHeaderTitle } = useContext(AppContext);

  useEffect(() => {
    setHeaderTitle('Done Recipes');
  }, []);

  return (
    <section>
      <h1>DoneRecipes</h1>
    </section>
  );
}

export default DoneRecipes;
