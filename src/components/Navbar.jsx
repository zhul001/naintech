"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);

    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <nav className={`sticky top-0 z-50 border-b backdrop-blur-md transition-all duration-300 ${scrolled ? 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-deep-black' : 'border-transparent bg-transparent'} `} >
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-black tracking-tighter text-black dark:text-white uppercase italic">
          naintech<span className="text-zinc-400">.</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300">
            <i className="fas fa-home text-sm"></i>
          </Link>

          <button onClick={toggleDarkMode} 
            className="flex items-center gap-2 px-5 py-2 rounded-full border border-zinc-900 dark:border-zinc-100 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black transition-all active:scale-95 cursor-pointer">
            <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{darkMode ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}