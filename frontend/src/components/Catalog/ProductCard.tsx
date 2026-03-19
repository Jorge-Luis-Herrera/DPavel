'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ShoppingCart, Maximize2, Eye, Expand } from 'lucide-react';
import { STATIC_URL } from '@/lib/config';
import styles from './Catalog.module.css';

const API_URL = 'http://localhost:3000'; // Default backend URL

interface ProductCardProps {
  name: string;
  quantity: number;
  price: number;
  imagenUrl?: string;
  esExclusivo?: boolean;
  esOferta?: boolean;
  esDomicilio?: boolean;
  descripcion?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  name, quantity, price, imagenUrl, esExclusivo, esOferta, esDomicilio, descripcion 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [compraCantidad, setCompraCantidad] = useState(1);

  const fullImgUrl = imagenUrl
    ? (imagenUrl.startsWith('http') ? imagenUrl : `${API_URL}/uploads/${imagenUrl}`)
    : null;

  useEffect(() => {
    if (isOpen || isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, isExpanded]);

  return (
    <>
      <div
        className={`${styles.productCard} ${(esExclusivo || esOferta || esDomicilio) ? styles.productCardFeatured : ''} glass-card`}
        onClick={() => setIsOpen(true)}
        style={{
          backgroundImage: fullImgUrl ? `url(${fullImgUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          cursor: 'pointer'
        }}
      >
        {(esExclusivo || esOferta || esDomicilio) && (
          <div className={styles.productBadges}>
            {esExclusivo && <span className={`${styles.badge} ${styles.badgeCombo}`}>Exclusivo</span>}
            {esOferta && <span className={`${styles.badge} ${styles.badgeOferta}`}>Oferta</span>}
            {esDomicilio && <span className={`${styles.badge} ${styles.badgeBestSeller}`}>Domicilio</span>}
          </div>
        )}

        <div className={styles.cardGlassOverlay}>
          <div className={styles.productInfo}>
            <h3 className="font-bold text-white">{name}</h3>
            <p className="text-latte/60 text-xs">Stock: {quantity}</p>
            <p className="text-accent-gold font-bold">${price}</p>
          </div>
        </div>
      </div>

      {isOpen && createPortal(
        <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
          <div className={`${styles.modalContent3d} glass-panel`} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeModal} onClick={() => setIsOpen(false)}><X size={20} /></button>

            <div className={styles.modalBody}>
              <div 
                className={styles.imageContainer3d} 
                onClick={() => setIsExpanded(true)}
                style={{ cursor: 'zoom-in' }}
              >
                {fullImgUrl ? (
                  <img src={fullImgUrl} alt={name} className={styles.mainImage3d} />
                ) : (
                  <div className="w-full h-full bg-mocha/20 flex items-center justify-center rounded-xl text-latte/40 italic">Sin imagen</div>
                )}
                <div className={styles.clickHint}><Maximize2 size={12} className="inline mr-1" /> Toca para ampliar</div>
              </div>

              <div className={styles.detailsSection}>
                <h2 className="text-2xl font-bold text-white mb-2">{name}</h2>
                <div className={styles.statsGrid}>
                  <div className={styles.stat}>
                    <label>Precio</label>
                    <span className="text-accent-gold">${price}</span>
                  </div>
                  <div className={styles.stat}>
                    <label>Stock</label>
                    <span>{quantity}</span>
                  </div>
                  <div className={styles.stat}>
                    <label>Cantidad</label>
                    <div className={styles.quantitySelector}>
                      <button onClick={() => setCompraCantidad(Math.max(1, compraCantidad - 1))}>-</button>
                      <input
                        type="number"
                        value={compraCantidad}
                        onChange={(e) => setCompraCantidad(Math.max(1, parseInt(e.target.value) || 1))}
                      />
                      <button onClick={() => setCompraCantidad(compraCantidad + 1)}>+</button>
                    </div>
                  </div>
                </div>
                
                <p className="text-latte/70 text-sm leading-relaxed my-4 h-24 overflow-y-auto custom-scrollbar">
                  {descripcion || "Este producto artesanal ha sido seleccionado cuidadosamente para brindarte la mejor experiencia D' Pavel."}
                </p>

                <a
                  href={`https://wa.me/58922781?text=${encodeURIComponent(`Hola D' Pavel! Me interesa comprar ${compraCantidad} unidad(es) de: ${name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.actionBtn} w-full flex items-center justify-center gap-2`}
                >
                  <ShoppingCart size={18} /> Adquirir por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {isExpanded && createPortal(
        <div className={styles.fullscreenImageOverlay} onClick={() => setIsExpanded(false)}>
          <button className={styles.closeExpanded} onClick={() => setIsExpanded(false)}><X size={32} /></button>
          <img src={fullImgUrl!} alt={name} className={styles.expandedImage} />
        </div>,
        document.body
      )}
    </>
  );
};

export default ProductCard;
