import { useContext } from 'react';
import styles from './CategorySection.module.css';
import AppContext from '../../../Context/AppContext';

type CategorySectionProps = {
  handleCategory: (value: string) => Promise<void>

};

function CategorySection({ handleCategory }: CategorySectionProps) {
  const { headerTitle } = useContext(AppContext);
  return (
    <section>
      {
        headerTitle === 'Comidas' ? (
          <section className={ styles.categoryheaderTitle }>
            <div className={ styles.categoryDivs }>
              <button
                className={ styles.category }
                onClick={ () => handleCategory('') }
              >
                All
              </button>
              <button
                className={ styles.category }
                onClick={ () => handleCategory('beef') }
              >
                Beef
              </button>
              <button
                className={ styles.category }
                onClick={ () => handleCategory('goat') }
              >
                Goat
              </button>
            </div>
            <div className={ styles.categoryDivs }>
              <button
                className={ styles.category }
                onClick={ () => handleCategory('chicken') }
              >
                Chicken
              </button>
              <button
                className={ styles.category }
                onClick={ () => handleCategory('breakfast') }
              >
                Breakfast
              </button>
              <button
                className={ styles.category }
                onClick={ () => handleCategory('dessert') }
              >
                Dessert
              </button>
            </div>
          </section>
        ) : (
          <section className={ styles.categoryheaderTitle }>
            <div className={ styles.categoryDivs }>
              <button
                className={ styles.category }
                onClick={ () => handleCategory('') }
              >
                All
              </button>
              <button
                className={ styles.category }
                onClick={ () => handleCategory('Ordinary_Drink') }
              >
                Ordinary Drink
              </button>
              <button
                className={ styles.category }
                onClick={ () => handleCategory('Cocktail') }
              >
                Cocktail
              </button>
            </div>
            <div className={ styles.categoryDivs }>
              <button
                className={ styles.category }
                onClick={ () => handleCategory('Shake') }
              >
                Shake
              </button>
              <button
                className={ styles.category }
                onClick={ () => handleCategory('Other \\/ Unknown') }
              >
                Other/
                {' '}
                Unknown
              </button>
              <button
                className={ styles.category }
                onClick={ () => handleCategory('cocoa') }
              >
                Cocoa
              </button>
            </div>
          </section>
        )
      }
    </section>
  );
}

export default CategorySection;
