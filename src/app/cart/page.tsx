'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Tag,
  Truck,
  Clock,
  AlertCircle,
  ShoppingBag as ShopIcon,
  ChevronRight,
  Video,
  Music,
  X,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    removeItem,
    updateQuantity,
    promoCode,
    discount,
    setPromoCode,
    deliveryOption,
    setDeliveryOption,
    getDeliveryFee,
    getTotal,
    getItemCount,
    clearCart,
  } = useCartStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [mounted, setMounted] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setMounted(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const subtotal = items.reduce((total, item) => {
    let itemTotal = item.product.price * item.quantity;
    if (item.singingTelegram?.enabled) {
      itemTotal += item.singingTelegram.price;
    }
    return total + itemTotal;
  }, 0);

  const deliveryFee = getDeliveryFee();
  const total = getTotal();
  const itemCount = getItemCount();

  const handleApplyPromo = () => {
    setPromoError('');
    setPromoSuccess('');

    const code = promoInput.trim().toUpperCase();

    if (!code) {
      setPromoError('Please enter a promo code');
      return;
    }

    if (code === 'TORONTO15') {
      const discountAmount = subtotal * 0.15;
      setPromoCode('TORONTO15', discountAmount);
      setPromoSuccess('15% discount applied! You saved $' + discountAmount.toFixed(2));
    } else if (code === 'LOCAL10') {
      const discountAmount = subtotal * 0.1;
      setPromoCode('LOCAL10', discountAmount);
      setPromoSuccess('10% discount applied! You saved $' + discountAmount.toFixed(2));
    } else {
      setPromoError('Invalid promo code. Try TORONTO15 or LOCAL10');
    }
  };

  const handleRemovePromo = () => {
    setPromoCode(null, 0);
    setPromoInput('');
    setPromoSuccess('');
  };

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-48 mb-8" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-muted rounded-lg" />
              ))}
            </div>
            <div className="h-96 bg-muted rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto text-center"
        >
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-4 font-heading">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven&apos;t added any gifts yet. Explore our handcrafted Toronto artisan products!
          </p>
          <Link href="/shop">
            <Button size="lg" className="bg-forest hover:bg-forest/90 text-cream btn-shine">
              <ShopIcon className="mr-2 h-5 w-5" />
              Start Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
          <Link href="/shop" className="hover:text-forest transition-colors">
            Shop
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">Cart</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-heading">
          Your Shopping Cart
          <Badge variant="secondary" className="ml-3 text-base">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </Badge>
        </h1>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      {/* Product Image */}
                      <div className="w-full sm:w-32 h-32 flex-shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 p-4">
                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                          <div className="flex-1">
                            <Link
                              href={`/product/${item.product.slug}`}
                              className="font-semibold text-lg hover:text-forest transition-colors line-clamp-1"
                            >
                              {item.product.name}
                            </Link>
                            <p className="text-sm text-muted-foreground mt-1">
                              by{' '}
                              <Link
                                href={`/artisan/${item.product.artisanId}`}
                                className="hover:text-forest transition-colors"
                              >
                                {item.product.artisan.name}
                              </Link>
                            </p>
                            <p className="text-lg font-semibold text-forest mt-2">
                              ${item.product.price.toFixed(2)}
                            </p>

                            {/* Video Message Badge */}
                            {item.videoMessage && (
                              <Badge variant="outline" className="mt-2 border-gold text-gold">
                                <Video className="h-3 w-3 mr-1" />
                                Video Message Added
                              </Badge>
                            )}

                            {/* Singing Telegram Badge */}
                            {item.singingTelegram?.enabled && (
                              <Badge variant="outline" className="mt-2 ml-2 border-maple text-maple">
                                <Music className="h-3 w-3 mr-1" />
                                Singing Telegram (+${item.singingTelegram.price.toFixed(2)})
                              </Badge>
                            )}
                          </div>

                          {/* Quantity Controls & Remove */}
                          <div className="flex items-center justify-between sm:flex-col sm:items-end gap-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(item.product.id, item.quantity - 1)
                                }
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-12 text-center font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(item.product.id, item.quantity + 1)
                                }
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => removeItem(item.product.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Continue Shopping */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="pt-4"
          >
            <Link href="/shop">
              <Button variant="outline" size="lg">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-forest" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Subtotal */}
              <div className="flex justify-between text-lg">
                <span>Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>

              {/* Delivery Options */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Delivery Method</Label>
                <RadioGroup
                  value={deliveryOption}
                  onValueChange={(value) =>
                    setDeliveryOption(value as 'standard' | 'same-day')
                  }
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-forest transition-colors cursor-pointer">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label
                      htmlFor="standard"
                      className="flex-1 cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4 text-forest" />
                            <span className="font-medium">Standard Delivery</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            2-3 business days
                          </p>
                        </div>
                        <span className="font-semibold">$6.99</span>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-forest transition-colors cursor-pointer">
                    <RadioGroupItem value="same-day" id="same-day" />
                    <Label htmlFor="same-day" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gold" />
                            <span className="font-medium">Same-Day Delivery</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Order before 2PM
                          </p>
                        </div>
                        <span className="font-semibold">$12.99</span>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              {/* Promo Code */}
              <div className="space-y-3">
                <Label className="text-base font-medium flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Promo Code
                </Label>
                {promoCode ? (
                  <div className="flex items-center justify-between p-3 bg-forest/10 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-forest" />
                      <span className="font-medium text-forest">{promoCode}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRemovePromo}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter code"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
                      />
                      <Button variant="outline" onClick={handleApplyPromo}>
                        Apply
                      </Button>
                    </div>
                    {promoError && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {promoError}
                      </p>
                    )}
                  </div>
                )}
                {promoSuccess && (
                  <Alert className="bg-forest/10 border-forest/20">
                    <CheckCircle className="h-4 w-4 text-forest" />
                    <AlertDescription className="text-forest">
                      {promoSuccess}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <Separator />

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-forest">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-forest">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link href="/checkout" className="block">
                <Button
                  size="lg"
                  className="w-full bg-forest hover:bg-forest/90 text-cream btn-shine"
                >
                  Proceed to Checkout
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              {/* Trust Signals */}
              <div className="text-center text-sm text-muted-foreground space-y-1">
                <p>Secure checkout powered by Stripe</p>
                <p>Free returns within 30 days</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
