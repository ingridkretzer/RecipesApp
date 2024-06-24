import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
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
  const url = headerTitle === 'Meals' ? 'meals' : 'drinks';
  const id = headerTitle === 'Meals' ? item.idMeal : item.idDrink;

  return (
    <Link className="card-link" to={ `/${url}/${id}` }>
      <div className="card" data-testid={ `${index}-recipe-card` }>
        <div className="name-div">
          <h3 data-testid={ `${index}-card-name` }>{title}</h3>
        </div>
        <img src={ thumb } alt={ title } data-testid={ `${index}-card-img` } />
      </div>
    </Link>
  );
}

export default RecipeCard;
