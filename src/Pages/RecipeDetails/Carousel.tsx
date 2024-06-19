import React from 'react';
import styles from './Carousel.module.css';

interface Recommendation {
  id: string;
  image: string;
  title: string;
}

interface RecommendationCarouselProps {
  recommendations: Recommendation[];
}

function RecommendationCarousel({ recommendations }: RecommendationCarouselProps) {
  return (
    <div className={ styles.carouselContainer }>
      {recommendations.map((recommendation, index) => (
        <div
          key={ recommendation.id }
          className={ styles.card }
          data-testid={ `${index}-recommendation-card` }
        >
          <img src={ recommendation.image } alt={ recommendation.title } />
          <p data-testid={ `${index}-recommendation-title` }>{recommendation.title}</p>
        </div>
      ))}
    </div>
  );
}

export default RecommendationCarousel;
