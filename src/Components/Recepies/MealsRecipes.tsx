import React, { useContext } from 'react';
import AppContext from '../../Context/AppContext';
import RecipeCard from '../Cards/Cards';
import style from './MealsRecipes.module.css';
import Loading from '../Loading/Loading';

function MealsReceps() {
  const { meals } = useContext(AppContext);

  if (!meals) return <Loading />;

  return (
    <div className={ style.recipesList }>
      {meals && meals.map((item, index) => index < 12 && (
        <RecipeCard key={ item.idMeal } item={ item } index={ index } />
      ))}
    </div>
  );
}

export default MealsReceps;
