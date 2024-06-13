import { useContext } from 'react';
import styles from './CategorySection.module.css';
import AppContext from '../../../Context/AppContext';
import { fetchByName } from '../../../Utils/API';

type CategorySectionProps = {
  handleCategory: (value: string) => Promise<void>
};

function CategorySection({ handleCategory }: CategorySectionProps) {
  const { headerTitle, setMeals, setDrinks } = useContext(AppContext);
  const mealCategories = ['All', 'Beef', 'Goat', 'Chicken', 'Breakfast', 'Dessert'];
  const drinkCategories = [
    'All',
    'Ordinary Drink',
    'Cocktail',
    'Shake',
    'Other/Unknown',
    'Cocoa'];

  const allBtn = async () => {
    const param = headerTitle === 'Meals' ? 'themealdb' : 'thecocktaildb';
    const setRecipes = headerTitle === 'Meals' ? setMeals : setDrinks;
    const response = await fetchByName(param, '');
    const recipes = headerTitle === 'Meals' ? response.meals : response.drinks;
    setRecipes(recipes);
  };
  return (

    <section className={ styles.categoriesSection }>
      {
        headerTitle === 'Meals' ? (
          <div className={ styles.categoryDivs }>
            {mealCategories.map((category) => (
              <button
                key={ category }
                data-testid={ `${category}-category-filter` }
                onClick={ () => (category !== 'All'
                  ? handleCategory(category)
                  : allBtn()) }
                className={ styles.categoryBtn }
              >
                {category}
              </button>
            ))}
          </div>

        ) : (
          <div className={ styles.categoryDivs }>
            {drinkCategories.map((category) => (
              <button
                key={ category }
                data-testid={ `${category}-category-filter` }
                onClick={ () => handleCategory(category === 'All' ? '' : category) }
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
