'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShieldCheck, Home, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Header.module.css';

interface HeaderProps {
  onSearch?: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, x: '-50%' }}
      animate={{ y: 0, x: '-50%' }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${
        isSearching ? styles.searching : ''
      } glass-header`}
    >
      <div className={styles.container}>
        {/* Logo */}
        {!isSearching && (
          <div className={styles.logo}>
          <Link href="/">
            <h1 className="text-xl md:text-2xl font-black tracking-tighter italic">
              D&apos; <span className="hidden sm:inline">Pavel <span className="text-gradient-coffee">Coffee</span></span>
              <span className="sm:hidden text-gradient-coffee">Pavel</span>
            </h1>
          </Link>
        </div>
        )}

        {/* Search Bar */}
        <div className={`${styles.searchContainer} ${isSearching ? styles.expandedSearch : ''}`}>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} size={18} />
            <input
              type="text"
              placeholder="Buscar insumos..."
              value={searchTerm}
              onChange={(e) => {
                const val = e.target.value;
                setSearchTerm(val);
                if (onSearch) onSearch(val);
              }}
              onFocus={() => setIsSearching(true)}
              onBlur={() => setIsSearching(false)}
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* Navigation - Hidden on mobile when searching */}
        {!isSearching && (
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li>
                <Link href="/" className={styles.navLink}>
                  <Home className="md:hidden" size={20} />
                  <span className="hidden md:inline">Inicio</span>
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className={styles.navLink}>
                  <BookOpen className="md:hidden" size={20} />
                  <span className="hidden md:inline">Catálogo</span>
                </Link>
              </li>
            </ul>
          </nav>
        )}

        {/* Admin Action */}
        {!isSearching && (
          <div className={styles.actions}>
            <Link href="/login" className={styles.adminBtn}>
              <ShieldCheck size={16} className="mr-2" />
              <span>Admin</span>
            </Link>
          </div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
