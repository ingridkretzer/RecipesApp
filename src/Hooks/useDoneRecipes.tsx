import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFromLocalStorage } from '../Utils/localStorageUtils';

export type Recipe = {
  image: string;
  name: string;
  nationality?: string;
  category: string;
  alcoholicOrNot?: string;
  doneDate: string;
  tags: string[];
  id: string;
  type: 'meal' | 'drink';
};

export function useDoneRecipes() {
  const navigate = useNavigate();
  const doneRecipes = getFromLocalStorage('doneRecipes', []);
  const [copyInfo, setCopyInfo] = useState({ message: '', id: '' });
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(doneRecipes);

  const meals = doneRecipes.filter((recipe:Recipe) => recipe.type === 'meal');
  const drinks = doneRecipes.filter((recipe:Recipe) => recipe.type === 'drink');

  function handleShareClickDone(type: 'meal' | 'drink', id: string) {
    const recipeUrl = `http://localhost:3000/${type}s/${id}`;
    navigator.clipboard.writeText(recipeUrl);
    setCopyInfo({ message: 'Link copied!', id });
  }

  function filterRecipes(type: 'meal' | 'drink' | 'all') {
    if (type === 'meal') {
      console.log('meal', meals);
      setFilteredRecipes(meals);
    } else if (type === 'drink') {
      console.log('drink', drinks);
      setFilteredRecipes(drinks);
    } else {
      console.log('all', doneRecipes);
      setFilteredRecipes(doneRecipes);
    }
  }
  function handleRecipeClick(type: 'meal' | 'drink', id: string) {
    navigate(`/${type}s/${id}`);
  }

  return {
    doneRecipes,
    meals,
    drinks,
    copyInfo,
    handleShareClickDone,
    filterRecipes,
    filteredRecipes,
    handleRecipeClick,
  };
}
