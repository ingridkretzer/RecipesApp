import { useContext, useEffect } from 'react';
import AppContext from '../../Context/AppContext';

function DoneRecipes() {
  const { setHeaderTitle, setUrl } = useContext(AppContext);

  useEffect(() => {
    setHeaderTitle('Done Recipes');
    setUrl(window.location.pathname);
  }, []);

  return (
    <section>
      <h1>Done Recipes</h1>
    </section>
  );
}

export default DoneRecipes;
