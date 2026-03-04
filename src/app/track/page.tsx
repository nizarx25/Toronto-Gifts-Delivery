'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin,
  Phone,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { generateFakeOrder, getStatusIndex, Order, OrderStatus } from '@/data';
import { cn } from '@/lib/utils';

const statusIcons: Record<OrderStatus, typeof Package> = {
  pending: Clock,
  confirmed: CheckCircle,
  preparing: Package,
  'out-for-delivery': Truck,
  delivered: CheckCircle,
};

const statusLabels: Record<OrderStatus, string> = {
  pending: 'Order Placed',
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  'out-for-delivery': 'Out for Delivery',
  delivered: 'Delivered',
};

export default function TrackPage() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('pending');

  useEffect(() => {
    if (order) {
      // Simulate live updates every 3 seconds
      const interval = setInterval(() => {
        setCurrentStatus((prev) => {
          const statuses: OrderStatus[] = ['pending', 'confirmed', 'preparing', 'out-for-delivery', 'delivered'];
          const currentIndex = statuses.indexOf(prev);
          if (currentIndex < statuses.length - 1) {
            return statuses[currentIndex + 1];
          }
          return prev;
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [order]);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setNotFound(false);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const foundOrder = generateFakeOrder(orderId);
    if (foundOrder) {
      setOrder(foundOrder);
      setCurrentStatus(foundOrder.status);
    } else {
      setNotFound(true);
    }
    setIsLoading(false);
  };

  const statusIndex = order ? getStatusIndex(currentStatus) : 0;
  const progressPercent = (statusIndex / 4) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-forest py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-cream mb-4 font-heading">
              Track Your Gift
            </h1>
            <p className="text-cream/80 max-w-xl mx-auto">
              Enter your order ID to see real-time tracking of your Toronto gift delivery
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search Form */}
        <div className="max-w-xl mx-auto mb-12">
          <form onSubmit={handleTrack} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter Order ID (e.g., TGD-12345)"
                className="pl-10"
              />
            </div>
            <Button type="submit" disabled={isLoading || !orderId} className="bg-primary hover:bg-primary/90">
              {isLoading ? 'Searching...' : 'Track'}
            </Button>
          </form>
          <p className="text-sm text-muted-foreground mt-3 text-center">
            Demo: Enter any order ID to see tracking (e.g., TGD-12345)
          </p>
        </div>

        <AnimatePresence mode="wait">
          {notFound && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-xl mx-auto"
            >
              <Card className="border-destructive/50 bg-destructive/5">
                <CardContent className="flex items-center gap-4 p-6">
                  <AlertCircle className="h-8 w-8 text-destructive" />
                  <div>
                    <h3 className="font-semibold">Order Not Found</h3>
                    <p className="text-sm text-muted-foreground">
                      We couldn&apos;t find an order with that ID. Please check and try again.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {order && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              {/* Order Status Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Order ID</p>
                      <p className="text-xl font-bold">{order.id}</p>
                    </div>
                    <Badge 
                      className={cn(
                        'text-base px-4 py-1',
                        currentStatus === 'delivered' 
                          ? 'bg-forest text-white' 
                          : 'bg-gold text-slate'
                      )}
                    >
                      {statusLabels[currentStatus]}
                    </Badge>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-8">
                    <Progress value={progressPercent} className="h-2" />
                  </div>

                  {/* Status Steps */}
                  <div className="flex justify-between">
                    {(['pending', 'confirmed', 'preparing', 'out-for-delivery', 'delivered'] as OrderStatus[]).map((status, index) => {
                      const Icon = statusIcons[status];
                      const isActive = index <= statusIndex;
                      const isCurrent = index === statusIndex;
                      
                      return (
                        <div key={status} className="flex flex-col items-center">
                          <motion.div
                            animate={isCurrent ? { scale: [1, 1.2, 1] } : {}}
                            transition={{ duration: 0.5, repeat: isCurrent ? Infinity : 0, repeatDelay: 1 }}
                            className={cn(
                              'w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors',
                              isActive 
                                ? 'bg-forest text-white' 
                                : 'bg-muted text-muted-foreground'
                            )}
                          >
                            <Icon className="h-5 w-5" />
                          </motion.div>
                          <span className={cn(
                            'text-xs text-center',
                            isActive ? 'font-medium text-foreground' : 'text-muted-foreground'
                          )}>
                            {statusLabels[status]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card>
                <CardContent className="p-0">
                  <div className="relative h-64 md:h-80 bg-muted rounded-lg overflow-hidden">
                    {/* Fake map background */}
                    <img
                      src="https://images.unsplash.com/photo-1473181488821-2d23949a045a?w=1200&h=600&fit=crop"
                      alt="Toronto map"
                      className="w-full h-full object-cover opacity-50"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    
                    {/* Delivery pin animation */}
                    {currentStatus === 'out-for-delivery' && (
                      <motion.div
                        initial={{ top: '30%', left: '20%' }}
                        animate={{ 
                          top: ['30%', '40%', '50%', '60%'],
                          left: ['20%', '35%', '50%', '70%']
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="absolute"
                      >
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <div className="bg-maple text-white p-2 rounded-full shadow-lg">
                            <Truck className="h-6 w-6" />
                          </div>
                        </motion.div>
                      </motion.div>
                    )}

                    {/* Destination marker */}
                    <div className="absolute bottom-8 right-8">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div className="bg-forest text-white p-2 rounded-full shadow-lg">
                          <MapPin className="h-6 w-6" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Info overlay */}
                    <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-4">
                      <p className="font-semibold mb-1">Delivery Address</p>
                      <p className="text-sm text-muted-foreground">
                        {order.customer.address}, {order.customer.city}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        ETA: {currentStatus === 'delivered' ? 'Delivered!' : 'Arriving soon'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Customer</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-muted-foreground">Name:</span> {order.customer.name}</p>
                      <p><span className="text-muted-foreground">Email:</span> {order.customer.email}</p>
                      <p><span className="text-muted-foreground">Phone:</span> {order.customer.phone}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Tracking History</h3>
                    <div className="space-y-3">
                      {order.tracking.slice().reverse().map((event, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className={cn(
                            'w-2 h-2 rounded-full mt-2',
                            index === 0 ? 'bg-forest' : 'bg-muted-foreground'
                          )} />
                          <div>
                            <p className="font-medium text-sm">{event.description}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(event.timestamp).toLocaleTimeString('en-CA', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Support */}
              <div className="text-center">
                <p className="text-muted-foreground mb-4">Need help with your order?</p>
                <div className="flex justify-center gap-4">
                  <Button variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Support
                  </Button>
                  <Button variant="outline">
                    Contact Us
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
