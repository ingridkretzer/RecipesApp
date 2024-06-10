import { useState } from 'react';
import AppContext from './AppContext';
import { DrinkType, MealType, Recipes } from '../types';

function AppProvider({ children }: { children: React.ReactNode }) {
  const getEmail = () => {
    return JSON.parse(localStorage.getItem('email') || '[]');
  };
  const [email, setEmail] = useState(getEmail());
  const [headerTitle, setHeaderTitle] = useState('Meals');
  const [meals, setMeals] = useState<MealType[]>([]);
  const [drinks, setDrinks] = useState<DrinkType[]>([]);

  const context = {
    email,
    headerTitle,
    setHeaderTitle,
    meals,
    setMeals,
    drinks,
    setDrinks,
  };

  return (
    <AppContext.Provider value={ context }>
      <div>
        {children}
      </div>
    </AppContext.Provider>
  );
}

export default AppProvider;
