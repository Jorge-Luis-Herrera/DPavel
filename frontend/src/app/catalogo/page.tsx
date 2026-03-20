'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Header from '@/components/Header/Header';
import ShelfRow from '@/components/Catalog/ShelfRow';
import { motion, AnimatePresence } from 'framer-motion';
import { API_URL } from '@/lib/config';

export default function CatalogoPage() {
  const [inventario, setInventario] = useState<any[]>([]);
  const [destacados, setDestacados] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const [invRes, featRes] = await Promise.all([
          fetch(`${API_URL}/inventory`),
          fetch(`${API_URL}/inventory/featured`)
        ]);

        if (invRes.ok && featRes.ok) {
          const inv = await invRes.json();
          const feat = await featRes.json();
          setInventario(inv);
          setDestacados(feat);
        }
      } catch (error) {
        console.error('Error fetching catalog:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const inventarioAMostrar = useMemo(() => {
    const lista = [];
    const searchLower = busqueda.toLowerCase().trim();

    // Filtramos destacados si hay búsqueda
    const destacadosFiltrados = destacados.filter((p: any) => {
      if (!searchLower) return true;
      return p.nombre.toLowerCase().includes(searchLower) || 
             (p.descripcion && p.descripcion.toLowerCase().includes(searchLower));
    });

    if (destacadosFiltrados.length > 0) {
      lista.push({
        id: 'featured-shelf',
        titulo: 'Nuestras Joyas & Ofertas',
        subtitulo: 'SELECCIÓN EXCLUSIVA D\' PAVEL',
        items: destacadosFiltrados,
        isFeatured: true
      });
    }

    // Estanterías por productos
    inventario.forEach(shelf => {
      const shelfMatches = !searchLower || shelf.titulo.toLowerCase().includes(searchLower);
      
      const productosFiltrados = (shelf.productos || []).filter((p: any) => {
        if (!searchLower || shelfMatches) return true;
        return p.nombre.toLowerCase().includes(searchLower) || 
               (p.descripcion && p.descripcion.toLowerCase().includes(searchLower));
      });

      if (productosFiltrados.length > 0) {
        lista.push({
          id: shelf.id,
          titulo: shelf.titulo,
          items: productosFiltrados,
          isFeatured: false 
        });
      }
    });

    return lista;
  }, [inventario, destacados, busqueda]);

  return (
    <div className="min-h-screen bg-[#110d0a] text-white selection:bg-accent-gold selection:text-espresso">
      <Header onSearch={(val) => setBusqueda(val)} />
      
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black italic tracking-tight mb-4"
          >
            NUESTRO <span className="text-gradient-coffee">CATÁLOGO</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-latte/60"
          >
            Explora la variedad artesanal que tenemos preparada para ti.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
             <div className="w-12 h-12 border-4 border-accent-gold border-t-transparent rounded-full animate-spin" />
             <p className="text-latte/40 animate-pulse">Cargando la colección artesanal...</p>
          </div>
        ) : (
          <div className="space-y-12">
            <AnimatePresence mode="popLayout">
              {inventarioAMostrar.length > 0 ? (
                inventarioAMostrar.map((s, idx) => (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <ShelfRow
                      title={s.titulo}
                      subtitle={s.subtitulo}
                      items={s.items}
                      isFeatured={s.isFeatured}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 bg-mocha/10 rounded-3xl border border-white/5"
                >
                   <p className="text-latte/40 italic">No se encontraron productos o categorías para tu búsqueda.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
