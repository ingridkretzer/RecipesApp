// src/components/StartRecipeButton.tsx
import React from 'react';
import './StartRecipeButton.module.css';

interface Props {
  recipeId: string;
}

function StartRecipeButton({ recipeId }: Props) {
  const handleClick = () => {
    // Lógica para iniciar a receita
    console.log(`Starting recipe with ID: ${recipeId}`);
  };

  return (
    <button
      data-testid="start-recipe-btn"
      className="start-recipe-btn"
      onClick={ handleClick }
    >
      Start Recipe
    </button>
  );
}

export default StartRecipeButton;
