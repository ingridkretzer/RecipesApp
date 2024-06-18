import React from 'react';
import styles from './Carousel.module.css';

interface Recommendation {
  id: string;
  name: string;
  image: string;
}

interface RecommendationCarouselProps {
  recommendations: Recommendation[];
}

function RecommendationCarousel({ recommendations }: RecommendationCarouselProps) {
  return (
    <div className={ styles.carouselContainer }>
      <div className={ styles.carousel }>
        {recommendations.slice(0, 6).map((rec, index) => (
          <div
            key={ rec.id }
            className={ styles.carouselItem }
            data-testid={ `${index}-recommendation-card` }
          >
            <img src={ rec.image } alt={ rec.name } />
            <p data-testid={ `${index}-recommendation-title` }>{rec.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendationCarousel;
