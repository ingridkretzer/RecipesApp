import React, { useContext } from 'react';
import AppContext from '../../Context/AppContext';
import RecipeCard from '../Cards/Cards';

function MealsReceps() {
  const { meals } = useContext(AppContext);

  return (
    <div className="recipe-list">
      {meals.map((item, index) => index < 12 && (
        <RecipeCard key={ item.idMeal } item={ item } index={ index } />
      ))}
    </div>
  );
}

export default MealsReceps;
