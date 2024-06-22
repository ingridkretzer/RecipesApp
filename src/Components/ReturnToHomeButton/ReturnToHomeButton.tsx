import React from 'react';
import './ReturnToHomeButton.css';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function ReturnToHomeButton() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/meals');
  };
  return (
    <button
      className="container"
      onClick={ handleClick }
      data-testid="return-to-home-btn"
    >
      <FaHome size={ 30 } />
    </button>

  );
}
