// src/components/layout/Layout.tsx
'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Home, Briefcase, BookOpen, User, Mail } from 'lucide-react';
import ThemeToggle from '../common/theme-toggle';
import SearchBar from '../common/SearchBar';
import { cn } from '@/lib/utils';
import type { Route } from 'next';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

interface NavigationItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: Route;
}

const navigationItems: NavigationItem[] = [
  { label: 'Home', icon: Home, href: '/' as Route },
  { label: 'Portfolio', icon: Briefcase, href: '/portfolio' as Route },
  { label: 'Blog', icon: BookOpen, href: '/blog' as Route },
  { label: 'About', icon: User, href: '/about' as Route },
  { label: 'Contact', icon: Mail, href: '/contact' as Route }
];

const sidebarVariants = {
  open: {
    x: 0,
    transition: {
      type: "tween",
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  closed: {
    x: "-100%",
    transition: {
      type: "tween",
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => setMatches(e.matches);
    handleChange(mediaQuery);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
};

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const pathname = usePathname();

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [pathname, isMobile]);

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Implement search logic here
  };

  const SidebarContent = () => (
    <nav className="h-full py-6 px-3 flex flex-col">
      <div className="space-y-1">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => isMobile && setIsSidebarOpen(false)}
            className={cn(
              "flex items-center justify-end gap-3 px-3 py-2 text-[20px] rounded-md",
              "transition-colors duration-200",
              "hover:bg-[#737373]/10",
              pathname === item.href
                ? "bg-[#737373]/10 text-[#0C8C9D]"
                : "text-[#403F3F]"
            )}
          >
            <span>{item.label}</span>
            <item.icon className="h-5 w-5 text-[#0C8C9D]" />
          </Link>
        ))}
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container h-full flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            {isMobile && (
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-[#737373]/10 rounded-md transition-colors"
                aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
              >
                {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            )}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center">
                <Image
                  src="/djangify-logo.svg"
                  alt="Djangify Logo"
                  width={120}
                  height={30}
                  className="hidden md:block"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling;
                    if (fallback) {
                      fallback.classList.remove('hidden');
                    }
                  }}
                />
                <span className="hidden text-xl font-bold text-[#0C8C9D]">Djangify</span>
              </div>
            </Link>
          </div>

          <div className="flex-1 max-w-md mx-4">
            <SearchBar onSearch={handleSearch} />
          </div>

          <ThemeToggle />
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex pt-16 min-h-screen">
        {/* Sidebar */}
        {isMobile ? (
          <AnimatePresence>
            {isSidebarOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/20 z-30"
                  onClick={() => setIsSidebarOpen(false)}
                />
                <motion.aside
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={sidebarVariants}
                  className="fixed inset-y-0 left-0 top-16 w-64 z-40 bg-background border-r"
                >
                  <SidebarContent />
                </motion.aside>
              </>
            )}
          </AnimatePresence>
        ) : (
          <aside className="w-64 sticky top-16 h-[calc(100vh-4rem)] bg-background border-r">
            <SidebarContent />
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 container py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
