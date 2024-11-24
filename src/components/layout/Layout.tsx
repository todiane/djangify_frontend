'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Home, Briefcase, BookOpen, Mail, Github, Linkedin } from 'lucide-react';
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
  { label: 'About', icon: BookOpen, href: '/#about' as Route },
  { label: 'Contact', icon: Mail, href: '/#contact' as Route }
];

const sidebarVariants = {
  open: {
    x: "0%",
    transition: {
      type: "tween",
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  closed: {
    x: "100%",
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const pathname = usePathname();

  useEffect(() => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [pathname, isMobile]);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const elementId = href.replace('/#', '');

      if (pathname !== '/') {
        window.location.href = href;
        return;
      }

      const element = document.getElementById(elementId);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        if (isMobile) {
          setIsMobileMenuOpen(false);
        }
      }
    }
  };

  const NavItems = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={cn(
      "flex",
      mobile ? "flex-col space-y-4" : "items-center space-x-6"
    )}>
      {navigationItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={(e) => handleNavigation(e, item.href)}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md",
            "transition-colors duration-200",
            "hover:bg-[#737373]/10",
            (item.href === '/' && pathname === '/') ||
              (item.href === '/portfolio' && pathname === '/portfolio')
              ? "bg-[#737373]/10 text-[#0C8C9D]"
              : "text-[#403F3F]",
            mobile ? "text-lg justify-end" : "text-base"
          )}
        >
          <span>{item.label}</span>
          <item.icon className="h-5 w-5 text-[#0C8C9D]" />
        </Link>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="fixed top-0 w-full h-24 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container h-full flex items-center justify-between px-4">
          <Link href="/" className="flex items-center">
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
              <span className="md:hidden text-xl font-bold text-[#0C8C9D]">Djangify</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavItems />
          </div>

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-[#737373]/10 rounded-md transition-colors"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-30"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.aside
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              className="fixed inset-y-0 right-0 top-24 w-64 z-40 bg-background border-l"
            >
              <nav className="h-full py-6 px-3">
                <NavItems mobile />
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 pt-24 container py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-background border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center py-8">
            <div className="flex items-center">
              {/* <Image
                src="/djangify-logo.svg"
                alt="Djangify Logo"
                width={100}
                height={25}
                className="hidden md:block"
              /> */}
              <span className="md:hidden text-xl font-bold text-[#0C8C9D]">Djangify</span>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-[#403F3F] text-sm">
                © {new Date().getFullYear()} Djangify. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="https://github.com/todiane"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#403F3F] hover:text-[#0C8C9D] transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </Link>
              <Link
                href="https://linkedin.com/in/todianedev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#403F3F] hover:text-[#0C8C9D] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
