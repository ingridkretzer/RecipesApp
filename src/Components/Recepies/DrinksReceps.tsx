import React, { useContext } from 'react';
import AppContext from '../../Context/AppContext';
import RecipeCard from '../Cards/Cards';

function DrinksReceps() {
  const { drinks } = useContext(AppContext);

  return (
    <div className="recipe-list">
      {drinks.map((item, index) => index < 12 && (
        <RecipeCard key={ item.idDrink } item={ item } index={ index } />
      ))}
    </div>
  );
}

export default DrinksReceps;
