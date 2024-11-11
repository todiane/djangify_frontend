// src/components/layout/Layout.tsx
'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, Home, Briefcase, BookOpen, User, Mail } from 'lucide-react';
import ThemeToggle from '../common/theme-toggle';
import SearchBar from '../common/SearchBar';
import { cn } from '@/lib/utils';
import type { Route } from 'next';

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
    // Implement search logic here
    console.log('Searching for:', query);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container h-full flex items-center justify-between px-4">
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-accent rounded-md transition-colors"
              aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
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
        <aside
          className={cn(
            "bg-background border-r",
            isMobile
              ? cn(
                "fixed inset-y-0 left-0 top-16 w-64 z-40 transform transition-transform duration-200 ease-in-out",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              )
              : "w-64 sticky top-16 h-[calc(100vh-4rem)]"
          )}
        >
          <nav className="h-full py-6 px-3 flex flex-col">
            <div className="px-3 mb-6 hidden md:flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-bold">D</span>
              </div>
              <span className="text-xl font-bold">Djangify</span>
            </div>

            <div className="space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => isMobile && setIsSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm rounded-md",
                    "transition-colors duration-200",
                    "hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 container py-6">
          {children}
        </main>

        {/* Mobile Overlay */}
        {isMobile && isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
