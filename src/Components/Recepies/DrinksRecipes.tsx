import React, { useContext } from 'react';
import AppContext from '../../Context/AppContext';
import RecipeCard from '../Cards/Cards';
import styles from './DrinksRecipes.module.css';
import Loading from '../Loading/Loading';

function DrinksReceps() {
  const { drinks } = useContext(AppContext);
  if (!drinks) return <Loading />;
  return (
    <div className={ styles.recipesList }>
      {drinks && drinks.map((item, index) => index < 12 && (
        <RecipeCard key={ item.idDrink } item={ item } index={ index } />
      ))}
    </div>
  );
}

export default DrinksReceps;
