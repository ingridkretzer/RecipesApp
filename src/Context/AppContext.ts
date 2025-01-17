import { createContext, Dispatch, SetStateAction } from 'react';
import { DrinkType, MealType, Recipes } from '../types';

type AppContextType = {
  email: string;
  setHeaderTitle: React.Dispatch<React.SetStateAction<string>>;
  headerTitle: string;
  meals: MealType[];
  setMeals: React.Dispatch<React.SetStateAction<MealType[]>>;
  drinks: DrinkType[];
  setDrinks: React.Dispatch<React.SetStateAction<DrinkType[]>>;
  url: string,
  setUrl: React.Dispatch<React.SetStateAction<string>>
};

const AppContext = createContext({} as AppContextType);

export default AppContext;
