'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowLeft, Mail, Lock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@pavel.com' && password === 'admin123') {
      setStatus('Success! Access Granted.');
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 1000);
    } else {
      setStatus('Invalid credentials. Access Denied.');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center relative px-6 overflow-hidden">
      {/* Background Decorativo */}
      <div className="fixed inset-0 -z-10 bg-[#110d0a]">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#3C2A21] blur-[150px] opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#1A120B] blur-[100px] opacity-80" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card w-full max-w-md p-8 relative overflow-hidden"
      >
        <Link href="/" className="absolute top-6 left-6 text-latte hover:text-accent-gold transition-colors flex items-center gap-2 text-sm font-medium">
          <ArrowLeft size={16} /> Volver
        </Link>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-espresso/80 border border-accent-gold/20 rounded-2xl mb-6">
            <ShieldCheck size={32} className="text-accent-gold" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight leading-tight">Acceso <span className="text-gradient-coffee">Admin</span></h1>
          <p className="text-latte/60 mt-2 text-sm">Gestiona la experiencia D' Pavel Coffee</p>
        </div>

        <form onSubmit={handleLogin} className="mt-10 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-oat/50 ml-1">Email corporativo</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-latte/40 group-focus-within:text-accent-gold transition-colors" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@dpavel.com"
                className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-cream focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/20 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-oat/50 ml-1">Contraseña</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-latte/40 group-focus-within:text-accent-gold transition-colors" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-cream focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/20 transition-all"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-accent-gold hover:bg-[#D4A55A] text-espresso font-bold py-4 rounded-2xl transition-all shadow-[0_8px_24px_rgba(198,151,73,0.3)] hover:shadow-[0_12px_32px_rgba(198,151,73,0.5)] transform hover:-translate-y-1"
          >
            Entrar al Panel
          </button>
        </form>

        {status && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 p-4 rounded-xl text-center text-sm font-medium ${
              status.includes('Success') 
                ? 'bg-green-900/40 text-green-300 border border-green-500/20' 
                : 'bg-red-900/40 text-red-300 border border-red-500/20'
            }`}
          >
            {status}
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
