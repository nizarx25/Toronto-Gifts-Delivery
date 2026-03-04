'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Package,
  Truck,
  Mail,
  ArrowRight,
  Home,
  MapPin,
  Clock,
  Leaf,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function OrderConfirmationClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [mounted, setMounted] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setMounted(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto animate-pulse">
          <div className="h-64 bg-muted rounded-lg" />
        </div>
      </div>
    );
  }

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 2);

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="h-12 w-12 text-forest" />
        </motion.div>

        {/* Success Message */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold font-heading mb-4"
          >
            Order Confirmed!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-muted-foreground"
          >
            Thank you for supporting Toronto artisans!
          </motion.p>
        </div>

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="overflow-hidden">
            <div className="bg-forest p-4 text-cream">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-80">Order Number</p>
                  <p className="text-xl font-bold">{orderId || 'TGD-XXXXXXX'}</p>
                </div>
                <Badge className="bg-cream text-forest">
                  <Package className="h-3 w-3 mr-1" />
                  Processing
                </Badge>
              </div>
            </div>
            <CardContent className="p-6 space-y-6">
              {/* What Happens Next */}
              <div>
                <h2 className="font-semibold text-lg mb-4">What Happens Next?</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-forest/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-4 w-4 text-forest" />
                    </div>
                    <div>
                      <p className="font-medium">Confirmation Email</p>
                      <p className="text-sm text-muted-foreground">
                        You&apos;ll receive an email with your order details and receipt.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-forest/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Package className="h-4 w-4 text-forest" />
                    </div>
                    <div>
                      <p className="font-medium">Artisan Preparation</p>
                      <p className="text-sm text-muted-foreground">
                        Your gift is being handcrafted by our local Toronto artisans.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-forest/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Truck className="h-4 w-4 text-forest" />
                    </div>
                    <div>
                      <p className="font-medium">On Its Way</p>
                      <p className="text-sm text-muted-foreground">
                        Track your delivery in real-time with the link in your email.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Delivery Estimate */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gold" />
                  <div>
                    <p className="font-medium">Estimated Delivery</p>
                    <p className="text-muted-foreground">
                      {estimatedDelivery.toLocaleDateString('en-CA', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sustainability Note */}
              <div className="bg-forest/5 p-4 rounded-lg border border-forest/20">
                <div className="flex items-start gap-3">
                  <Leaf className="h-5 w-5 text-forest flex-shrink-0" />
                  <div>
                    <p className="font-medium text-forest">Zero-Waste Packaging</p>
                    <p className="text-sm text-muted-foreground">
                      Your gift is packed with 100% recyclable and biodegradable materials.
                      Thank you for choosing sustainable gifting!
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/track" className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Track Order
                  </Button>
                </Link>
                <Link href="/shop" className="flex-1">
                  <Button
                    size="lg"
                    className="w-full bg-forest hover:bg-forest/90 text-cream btn-shine"
                  >
                    Continue Shopping
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-8"
        >
          <Link
            href="/"
            className="text-muted-foreground hover:text-forest transition-colors inline-flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}