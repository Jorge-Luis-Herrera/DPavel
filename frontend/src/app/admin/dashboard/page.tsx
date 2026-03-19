'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Layers, DollarSign, Settings, LogOut, ChevronRight, LayoutGrid, Tag, ShoppingBag, BarChart3 } from 'lucide-react';
import Link from 'next/link';

// Componentes de Gestión
import ManageShelves from '@/components/Admin/ManageShelves';
import ManageCategories from '@/components/Admin/ManageCategories';
import ManageProducts from '@/components/Admin/ManageProducts';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'shelves' | 'products'>('products');

  const tabs = [
    { id: 'products', label: 'Productos', icon: <ShoppingBag size={18} /> },
    { id: 'shelves', label: 'Estanterías', icon: <LayoutGrid size={18} /> },
  ];

  return (
    <main className="min-h-screen bg-[#110d0a] text-white p-6 pt-32">
       {/* Background Decorativo Abstracto */}
       <div className="fixed inset-0 -z-10 bg-[#110d0a]">
         <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#3C2A21] blur-[150px] opacity-40" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#1A120B] blur-[100px] opacity-60" />
       </div>

      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Panel de <span className="text-gradient-coffee">Administración</span></h1>
            <p className="text-latte/60 mt-2">D&apos; Pavel Coffee / Gestión Central de Base de Datos</p>
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="px-6 py-2 bg-mocha/20 hover:bg-mocha/40 border border-white/5 rounded-full flex items-center gap-2 transition-all text-sm font-medium">
               <LogOut size={16} /> Salir
            </Link>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-12 bg-white/5 p-1.5 rounded-2xl w-fit border border-white/5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all font-bold text-sm ${
                activeTab === tab.id 
                  ? 'bg-accent-gold text-espresso shadow-lg shadow-accent-gold/20' 
                  : 'text-latte/40 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <section className="min-h-[60vh]">
          <AnimatePresence mode="wait">
            {activeTab === 'shelves' && (
              <motion.div
                key="shelves"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <ManageShelves />
              </motion.div>
            )}


            {activeTab === 'products' && (
              <motion.div
                key="products"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <ManageProducts />
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
}
