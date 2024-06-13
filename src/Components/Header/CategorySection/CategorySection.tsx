import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './CategorySection.module.css';
import AppContext from '../../../Context/AppContext';
import { fetchByName } from '../../../Utils/API';

type CategorySectionProps = {
  handleCategory: (value: string) => Promise<void>
};

function CategorySection({ handleCategory }: CategorySectionProps) {
  const { headerTitle, setMeals, setDrinks } = useContext(AppContext);
  const { pathname } = useLocation();
  const mealCategories = ['Beef', 'Goat', 'Chicken', 'Breakfast', 'Dessert'];
  const drinkCategories = [
    'Ordinary Drink',
    'Cocktail',
    'Shake',
    'Other/Unknown',
    'Cocoa'];

  const allBtn = async () => {
    const param = pathname.includes('/meals') ? 'themealdb' : 'thecocktaildb';
    const setRecipes = pathname.includes('/meals') ? setMeals : setDrinks;
    const response = await fetchByName(param, '');
    const recipes = pathname.includes('/meals') ? response.meals : response.drinks;
    setRecipes(recipes);
  };
  return (

    <section className={ styles.categoriesSection }>
      {
        pathname.includes('/meals') ? (
          <div className={ styles.categoryDivs }>
            <button
              data-testid="All-category-filter"
              onClick={ allBtn }
              className={ styles.categoryBtn }
            >
              All
            </button>
            {mealCategories.map((category) => (
              <button
                key={ category }
                data-testid={ `${category}-category-filter` }
                onClick={ () => handleCategory(category) }
                className={ styles.categoryBtn }
              >
                {category}
              </button>
            ))}
          </div>
        ) : (
          <div className={ styles.categoryDivs }>
            <button
              data-testid="All-category-filter"
              onClick={ allBtn }
              className={ styles.categoryBtn }
            >
              All
            </button>
            {drinkCategories.map((category) => (
              <button
                key={ category }
                data-testid={ `${category}-category-filter` }
                onClick={ () => handleCategory(category) }
                className={ styles.categoryBtn }
              >
                {category}
              </button>
            ))}
          </div>
        )
      }
    </section>
  );
}

export default CategorySection;
