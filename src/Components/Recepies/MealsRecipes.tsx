import React, { useContext } from 'react';
import AppContext from '../../Context/AppContext';
import RecipeCard from '../Cards/Cards';
import style from './MealsRecipes.module.css';

function MealsReceps() {
  const { meals } = useContext(AppContext);

  return (
    <div className={ style.recipesList }>
      {meals.map((item, index) => index < 12 && (
        <RecipeCard key={ item.idMeal } item={ item } index={ index } />
      ))}
    </div>
  );
}

export default MealsReceps;
