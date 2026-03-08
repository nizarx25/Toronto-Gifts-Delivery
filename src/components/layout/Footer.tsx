'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Leaf, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Twitter,
  CreditCard,
  Truck,
  Shield,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const footerLinks = {
  shop: [
    { href: '/shop?category=jewelry', label: 'Jewelry' },
    { href: '/shop?category=home', label: 'Home Décor' },
    { href: '/shop?category=food', label: 'Gourmet Food' },
    { href: '/shop?category=wellness', label: 'Wellness' },
    { href: '/shop?category=candles', label: 'Candles' },
    { href: '/shop?category=art', label: 'Art Prints' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/blog', label: 'Artisan Stories' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/corporate', label: 'Corporate Gifts' },
  ],
  support: [
    { href: '/track', label: 'Track Order' },
    { href: '/faq', label: 'FAQ' },
    { href: '/shipping', label: 'Shipping Info' },
    { href: '/returns', label: 'Returns' },
    { href: '/contact', label: 'Contact Us' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate text-cream mt-auto">
      {/* Support Local Banner */}
      <div className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Leaf className="h-12 w-12" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold font-heading">Support Local Toronto</h3>
                <p className="text-sm opacity-90">Every purchase helps a local artisan thrive</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                <span>Same-Day Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>Zero Waste Packaging</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                <span>5000+ Happy Customers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Leaf className="h-8 w-8 text-cream" />
                <span className="font-bold text-xl font-heading">Toronto Gifts Delivery</span>
              </Link>
              <p className="text-cream/80 text-sm mb-6 max-w-md">
                Handcrafted gifts from real Toronto artisans. Same-day delivery across Toronto & GTA. 
                Zero-waste packaging, sustainable products, and Halal options available.
              </p>

              {/* Newsletter */}
              <div className="space-y-3">
                <p className="text-sm font-medium">Subscribe to our newsletter</p>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    className="bg-slate/50 border-cream/20 text-cream placeholder:text-cream/50"
                  />
                  <Button className="bg-gold hover:bg-gold/90 text-slate shrink-0">
                    Subscribe
                  </Button>
                </div>
              </div>

              {/* Contact */}
              <div className="mt-6 space-y-2 text-sm text-cream/80">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Toronto, Ontario, Canada</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+905528875997" className="hover:text-gold transition-colors">+905528875997</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:info@nizarrahme.com" className="hover:text-gold transition-colors">info@nizarrahme.com</a>
                </div>
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2">
                {footerLinks.shop.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/80 hover:text-cream transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/80 hover:text-cream transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/80 hover:text-cream transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-cream/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Payment Methods */}
              <div className="flex items-center gap-4">
                <CreditCard className="h-5 w-5 text-cream/60" />
                <div className="flex gap-2 text-xs text-cream/60">
                  <span className="px-2 py-1 bg-cream/10 rounded">Visa</span>
                  <span className="px-2 py-1 bg-cream/10 rounded">Mastercard</span>
                  <span className="px-2 py-1 bg-cream/10 rounded">Amex</span>
                  <span className="px-2 py-1 bg-cream/10 rounded">Apple Pay</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <a
                  href="https://www.instagram.com/torontogiftsdelivery"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/80 hover:text-cream transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://www.facebook.com/torontogiftsdelivery"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/80 hover:text-cream transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://x.com/TGiftsDelivery"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/80 hover:text-cream transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>

              {/* Copyright */}
              <p className="text-sm text-cream/60">
                © {new Date().getFullYear()} TorontoGiftsDelivery.com. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
