'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, Leaf, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { useCartStore } from '@/lib/cart-store';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const addToCart = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/shop/${product.slug}`}>
        <Card className="group overflow-hidden product-card-hover bg-card border-border h-full">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
              <motion.div
                initial={{ scale: 0 }}
                whileHover={{ scale: 1.1 }}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full bg-white text-slate hover:bg-cream"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </motion.div>
            </div>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.comparePrice && (
                <Badge className="bg-maple text-white">
                  Sale
                </Badge>
              )}
              {product.isSameDay && (
                <Badge className="bg-forest text-white flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Same Day
                </Badge>
              )}
              {product.isSustainable && (
                <Badge className="bg-forest/90 text-white flex items-center gap-1">
                  <Leaf className="h-3 w-3" />
                  Zero Waste
                </Badge>
              )}
              {product.isHalal && (
                <Badge className="bg-gold text-white">
                  Halal
                </Badge>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={toggleWishlist}
              className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
            >
              <Heart
                className={`h-5 w-5 transition-colors ${
                  isWishlisted ? 'fill-maple text-maple' : 'text-slate'
                }`}
              />
            </button>
          </div>

          {/* Content */}
          <CardContent className="p-4">
            {/* Artisan */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-muted-foreground">
                by {product.artisan.name}
              </span>
              {product.artisan.verified && (
                <CheckCircle className="h-3 w-3 text-forest" />
              )}
            </div>

            {/* Name */}
            <h3 className="font-semibold text-base mb-1 line-clamp-2 group-hover:text-primary transition-colors font-heading">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-gold text-gold" />
                <span className="text-sm font-medium">{product.rating}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
              {product.comparePrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.comparePrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Category Badge */}
            <Badge variant="outline" className="mt-2 text-xs capitalize">
              {product.category}
            </Badge>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
