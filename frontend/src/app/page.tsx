'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, Coffee, ChevronRight, Menu, MapPin, X, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const API_URL = 'http://localhost:3000/api';

const initialProducts = [
  {
    id: 1,
    title: 'Mocha Artesanal',
    price: '$8.50',
    tags: ['Bestseller'],
    img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=1000&auto=format&fit=crop',
    size: 'large',
  },
  {
    id: 2,
    title: 'Croissant Mantequilla',
    price: '$4.20',
    tags: ['Fresco'],
    img: 'https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?q=80&w=1000&auto=format&fit=crop',
    size: 'small',
  },
  {
    id: 3,
    title: 'Prensa Francesa',
    price: '$45.00',
    tags: ['Artefacto'],
    img: 'https://images.unsplash.com/photo-1517594042864-15c0e7ed8702?q=80&w=1000&auto=format&fit=crop',
    size: 'small',
  },
  {
    id: 4,
    title: 'Tostado Espresso Oscuro',
    price: '$22.00 / kg',
    tags: ['Premium'],
    img: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=1000&auto=format&fit=crop',
    size: 'wide',
  },
];

export default function Home() {
  const [showAddress, setShowAddress] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch(`${API_URL}/inventory/featured`);
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) {
            // Map backend products to display format
            const mapped = data.map((p: any) => ({
              id: p.id,
              title: p.nombre,
              price: p.precio,
              tags: [
                p.esExclusivo && 'Exclusivo',
                p.esOferta && 'Oferta',
                p.esDomicilio && 'Domicilio'
              ].filter(Boolean),
              img: p.imagenUrl ? (p.imagenUrl.startsWith('http') ? p.imagenUrl : `http://localhost:3000/uploads/${p.imagenUrl}`) : null,
            }));
            setFeaturedProducts(mapped);
          } else {
            setFeaturedProducts([]);
          }
        } else {
          setFeaturedProducts([]);
        }
      } catch (e) {
        setFeaturedProducts([]);
      }
    }
    fetchFeatured();
  }, []);
  return (
    <main className="min-h-screen relative selection:bg-[#E5E5CB] selection:text-[#1A120B]">
      {/* Background Decorativo Abstracto */}
      <div className="fixed inset-0 -z-10 bg-[#110d0a]">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#3C2A21] blur-[150px] opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#1A120B] blur-[100px] opacity-80" />
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-12 md:pt-40 max-w-7xl mx-auto min-h-[70vh] flex flex-col justify-center">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-white"
          >
            ¡Descubre <span className="text-gradient italic">D&apos;PAVEL</span>, <br />
            tu nueva cafetería favorita!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-[#E5E5CB]/60 max-w-xl font-light"
          >
            Experimenta notas de cata inigualables, repostería fresca y los
            mejores artefactos para baristas en nuestro refugio neuro-gastronómico.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex gap-4"
          >
            <Link href="/catalogo">
              <button className="bg-[#E5E5CB] text-[#1A120B] px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform flex items-center gap-2">
                Explorar Catálogo <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
            <button 
              onClick={() => setShowAddress(true)}
              className="glass-panel px-8 py-3 rounded-full font-medium hover:bg-white/5 transition-colors flex items-center gap-2 relative"
            >
              <MapPin className="w-4 h-4 text-[#E5E5CB]" /> D&apos; Pavel Central
            </button>
          </motion.div>
        </div>
      </section>

      {/* MODAL DE UBICACIÓN (FORMULARIO PREMIUM) */}
      <AnimatePresence>
        {showAddress && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddress(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md glass-panel p-8 md:p-10 border border-white/10 shadow-[0_32px_64px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <button 
                onClick={() => setShowAddress(false)}
                className="absolute top-6 right-6 p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
              >
                <X size={20} className="text-latte" />
              </button>

              <div className="flex flex-col items-center text-center space-y-6">
                <div className="p-4 bg-mocha/30 rounded-3xl border border-white/5">
                  <MapPin size={32} className="text-accent-gold" />
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">Visítanos</h3>
                  <p className="text-latte/60 font-medium">D&apos; Pavel Coffee Experience</p>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4" />

                <div className="space-y-2">
                  <h4 className="text-accent-gold font-black uppercase tracking-widest text-[10px]">DIRECCIÓN CENTRAL</h4>
                  <p className="text-white text-xl font-medium max-w-[250px]">Hermanos Cruz calle 5ta / D y E #49, Pinar del Río</p>
                </div>

                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Hermanos+Cruz+calle+5ta+%2F+D+y+E+%2349%2C+Pinar+del+R%C3%ADo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-accent-gold text-espresso font-black uppercase py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white transition-all transform active:scale-95 shadow-xl shadow-accent-gold/20"
                >
                  Ver en Google Maps <ExternalLink size={18} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bento Grid Gallery (Sensorial Layout) */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Experiencia <span className="text-gradient-coffee">Premium</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`glass-card group relative ${
                  i % 4 === 0 ? 'md:col-span-2 md:row-span-2' : ''
                } ${i % 4 === 3 ? 'md:col-span-2' : ''}`}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60"
                  style={{ backgroundImage: `url('${item.img}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="flex gap-2 mb-auto">
                    {item.tags?.map((tag: string) => (
                      <span key={tag} className="px-3 py-1 bg-mocha/80 backdrop-blur-md rounded-full text-[10px] font-black uppercase text-latte border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {item.title}
                  </h3>
                  <div className="flex justify-between items-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-accent-gold font-bold">${item.price}</span>
                    <button className="bg-white/10 hover:bg-accent-gold/20 p-2 rounded-full backdrop-blur-md transition-colors border border-white/10">
                      <Coffee className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center glass-card border-dashed">
              <p className="text-latte/40 italic">Inaugurando nuestra selección exclusiva...</p>
            </div>
          )}
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="border-t border-white/5 mt-20 px-6 py-12 text-center text-sm text-[#E5E5CB]/40">
        <p>© 2026 D' Pavel Coffee Experience. Construido para la vanguardia.</p>
      </footer>
    </main>
  );
}
