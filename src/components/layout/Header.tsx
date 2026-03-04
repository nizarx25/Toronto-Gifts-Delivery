'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Leaf,
  MapPin,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/lib/cart-store';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/recommend', label: 'AI Recommender' },
  { href: '/corporate', label: 'Corporate' },
  { href: '/about', label: 'About' },
  { href: '/track', label: 'Track Order' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());
  const isHome = pathname === '/';

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isHome 
          ? 'bg-transparent absolute' 
          : 'bg-background/95 backdrop-blur-md border-b border-border'
      )}
    >
      {/* Top banner */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-sm">
        <div className="flex items-center justify-center gap-2">
          <Leaf className="h-4 w-4" />
          <span>🔥 Hot Deal: Website & Domain For Sale • info@nizarrahme.com</span>
          <Leaf className="h-4 w-4" />
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 10 }}
              className="relative"
            >
              <Leaf className={cn("h-8 w-8", isHome ? "text-white drop-shadow-lg" : "text-primary")} />
            </motion.div>
            <div className="flex flex-col">
              <span className={cn(
                "font-bold text-lg md:text-xl font-heading",
                isHome ? "text-white drop-shadow-lg" : "text-primary"
              )}>
                TorontoGiftsDelivery
              </span>
              <span className={cn(
                "text-xs hidden sm:block",
                isHome ? "text-white/80" : "text-muted-foreground"
              )}>
                .com
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors relative py-2',
                  isHome 
                    ? 'text-white hover:text-gold drop-shadow-lg'
                    : 'hover:text-primary',
                  (pathname === link.href || pathname.startsWith(link.href + '/'))
                    ? isHome 
                      ? 'text-gold font-semibold'
                      : 'text-primary'
                    : isHome
                      ? 'text-white'
                      : 'text-muted-foreground'
                )}
              >
                {link.label}
                {(pathname === link.href || pathname.startsWith(link.href + '/')) && (
                  <motion.div
                    layoutId="activeNav"
                    className={cn(
                      "absolute bottom-0 left-0 right-0 h-0.5",
                      isHome ? "bg-gold" : "bg-primary"
                    )}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search */}
            <div className="hidden md:flex items-center">
              <AnimatePresence>
                {searchOpen ? (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 'auto', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <Input
                      type="search"
                      placeholder="Search gifts..."
                      className={cn("w-48 lg:w-64", isHome && "bg-white/90")}
                      autoFocus
                      onBlur={() => setSearchOpen(false)}
                    />
                  </motion.div>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSearchOpen(true)}
                    className={cn(isHome && "text-white hover:text-gold hover:bg-white/10")}
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className={cn("hidden md:flex", isHome && "text-white hover:text-gold hover:bg-white/10")}>
              <Heart className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className={cn("relative", isHome && "text-white hover:text-gold hover:bg-white/10")}>
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-5 w-5 bg-maple text-white text-xs rounded-full flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </Button>
            </Link>

            {/* User */}
            <Link href="/account">
              <Button variant="ghost" size="icon" className={cn("hidden md:flex", isHome && "text-white hover:text-gold hover:bg-white/10")}>
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className={cn("h-5 w-5", isHome && "text-white")} />
              ) : (
                <Menu className={cn("h-5 w-5", isHome && "text-white")} />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search gifts..."
                  className="pl-10"
                />
              </div>

              {/* Mobile Nav Links */}
              <nav className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'block py-2 px-4 rounded-lg text-sm font-medium transition-colors',
                      pathname === link.href
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-muted'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Location */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground py-2 px-4">
                <MapPin className="h-4 w-4" />
                <span>Delivering to Toronto & GTA</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
