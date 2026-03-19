'use client';

import React from 'react';
import styles from './Catalog.module.css';

const API_URL = 'http://localhost:3000';

interface CategoryCardProps {
  nombre: string;
  imagenUrl?: string;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ nombre, imagenUrl, onClick }) => {
  const fullImgUrl = imagenUrl ? (imagenUrl.startsWith('http') ? imagenUrl : `${API_URL}/uploads/${imagenUrl}`) : null;

  return (
    <div 
      className={`${styles.categoryCard} glass-card`}
      onClick={onClick}
      style={{ 
        backgroundImage: fullImgUrl ? `url(${fullImgUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className={styles.categoryGlassOverlay}>
        <h3 className={styles.categoryName}>{nombre}</h3>
      </div>
    </div>
  );
};

export default CategoryCard;
