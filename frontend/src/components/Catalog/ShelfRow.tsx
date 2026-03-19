'use client';

import React, { useRef } from 'react';
import ProductCard from '@/components/Catalog/ProductCard';
import CategoryCard from '@/components/Catalog/CategoryCard';
import styles from './Catalog.module.css';

interface ShelfRowProps {
  title: string;
  subtitle?: string;
  items: any[];
  isFeatured?: boolean;
  onCategoryClick?: (id: number, nombre: string) => void;
}

const ShelfRow: React.FC<ShelfRowProps> = ({ title, subtitle, items, isFeatured, onCategoryClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const itemWidth = container.firstChild ? (container.firstChild as HTMLElement).clientWidth : container.clientWidth;
      const scrollTo = direction === 'left'
        ? container.scrollLeft - itemWidth
        : container.scrollLeft + itemWidth;
      container.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className={`${styles.shelfContainer} ${isFeatured ? styles.featuredShelf : ''} glass-panel`}>
      <div className={styles.shelfHeader}>
        {isFeatured && subtitle && <p className="text-accent-gold text-xs uppercase tracking-[0.3em] font-bold mb-2">{subtitle}</p>}
        <h2 className={styles.shelfTitle}>{title}</h2>
      </div>

      <div className={styles.shelfWrapper}>
        {isFeatured && (
          <button className={`${styles.navBtn} ${styles.prev}`} onClick={() => scroll('left')} aria-label="Anterior">❮</button>
        )}

        <div className={`${styles.shelfRow} ${isFeatured ? styles.featured : ''}`} ref={scrollRef}>
          {items && items.map((item) => (
            <div className={isFeatured ? styles.carouselItem : styles.shelfItem} key={item.id}>
              <ProductCard
                name={item.nombre}
                descripcion={item.descripcion}
                quantity={item.cantidad}
                price={item.precio}
                imagenUrl={item.imagenUrl}
                esExclusivo={item.esExclusivo}
                esOferta={item.esOferta}
                esDomicilio={item.esDomicilio}
              />
            </div>
          ))}
        </div>

        {isFeatured && (
          <button className={`${styles.navBtn} ${styles.next}`} onClick={() => scroll('right')} aria-label="Siguiente">❯</button>
        )}
      </div>
    </section>
  );
};

export default ShelfRow;
