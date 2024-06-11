import { useContext, useEffect } from 'react';
import AppContext from '../../Context/AppContext';

function Favorites() {
  const { setHeaderTitle } = useContext(AppContext);

  useEffect(() => {
    setHeaderTitle('Favorite Recipes');
  }, []);

  return (
    <section>
      <h1>Favorites</h1>
    </section>
  );
}

export default Favorites;
