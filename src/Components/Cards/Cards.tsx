import React, { useContext } from 'react';
import AppContext from '../../Context/AppContext';
import { DrinkType, MealType } from '../../types';
import './Card.css';

interface RecipeCardProps {
  item: DrinkType | MealType;
  index: number;
}

function RecipeCard({ item, index }: RecipeCardProps) {
  const { headerTitle } = useContext(AppContext);
  const title = headerTitle === 'Meals' ? item.strMeal : item.strDrink;
  const thumb = headerTitle === 'Meals' ? item.strMealThumb : item.strDrinkThumb;

  return (
    <div className="card" data-testid={ `${index}-recipe-card` }>
      <h3 data-testid={ `${index}-card-name` }>{title}</h3>
      <img src={ thumb } alt={ title } data-testid={ `${index}-card-img` } />
    </div>
  );
}

export default RecipeCard;
