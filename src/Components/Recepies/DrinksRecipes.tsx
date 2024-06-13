import React, { useContext } from 'react';
import AppContext from '../../Context/AppContext';
import RecipeCard from '../Cards/Cards';
import styles from './DrinksRecipes.module.css';

function DrinksReceps() {
  const { drinks } = useContext(AppContext);

  return (
    <div className={ styles.recipesList }>
      {drinks && drinks.map((item, index) => index < 12 && (
        <RecipeCard key={ item.idDrink } item={ item } index={ index } />
      ))}
    </div>
  );
}

export default DrinksReceps;
