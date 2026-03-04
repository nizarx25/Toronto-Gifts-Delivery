'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  ChevronRight,
  ChevronLeft,
  Truck,
  Clock,
  Tag,
  CreditCard,
  MapPin,
  User,
  Mail,
  Phone,
  Building,
  CheckCircle,
  AlertCircle,
  Lock,
  Package,
  Gift,
  Video,
  Music,
  Loader2,
  Check,
  X,
} from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';

type CheckoutStep = 'shipping' | 'payment' | 'review';

interface ShippingInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

interface PaymentInfo {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    promoCode,
    discount,
    setPromoCode,
    deliveryOption,
    setDeliveryOption,
    getDeliveryFee,
    getTotal,
    clearCart,
  } = useCartStore();

  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Form states
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: 'Toronto',
    postalCode: '',
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [giftMessage, setGiftMessage] = useState('');

  // Promo code state
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // Validation errors
  const [shippingErrors, setShippingErrors] = useState<Partial<ShippingInfo>>({});
  const [paymentErrors, setPaymentErrors] = useState<Partial<PaymentInfo>>({});

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setMounted(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Calculate totals
  const subtotal = items.reduce((total, item) => {
    let itemTotal = item.product.price * item.quantity;
    if (item.singingTelegram?.enabled) {
      itemTotal += item.singingTelegram.price;
    }
    return total + itemTotal;
  }, 0);

  const deliveryFee = getDeliveryFee();
  const total = getTotal();

  // Validation functions
  const validateShipping = (): boolean => {
    const errors: Partial<ShippingInfo> = {};

    if (!shippingInfo.name.trim()) errors.name = 'Name is required';
    if (!shippingInfo.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingInfo.email)) {
      errors.email = 'Invalid email format';
    }
    if (!shippingInfo.phone.trim()) {
      errors.phone = 'Phone is required';
    } else if (!/^[\d\s\-()]+$/.test(shippingInfo.phone)) {
      errors.phone = 'Invalid phone format';
    }
    if (!shippingInfo.address.trim()) errors.address = 'Address is required';
    if (!shippingInfo.city.trim()) errors.city = 'City is required';
    if (!shippingInfo.postalCode.trim()) {
      errors.postalCode = 'Postal code is required';
    } else if (!/^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/.test(shippingInfo.postalCode)) {
      errors.postalCode = 'Invalid Canadian postal code';
    }

    setShippingErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePayment = (): boolean => {
    const errors: Partial<PaymentInfo> = {};

    if (!paymentInfo.cardName.trim()) errors.cardName = 'Name on card is required';
    if (!paymentInfo.cardNumber.trim()) {
      errors.cardNumber = 'Card number is required';
    } else if (!/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/.test(paymentInfo.cardNumber.replace(/\s/g, ''))) {
      errors.cardNumber = 'Invalid card number';
    }
    if (!paymentInfo.expiry.trim()) {
      errors.expiry = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(paymentInfo.expiry)) {
      errors.expiry = 'Use MM/YY format';
    }
    if (!paymentInfo.cvv.trim()) {
      errors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(paymentInfo.cvv)) {
      errors.cvv = 'Invalid CVV';
    }

    setPaymentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Promo code handling
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
      setPromoSuccess('15% discount applied!');
    } else if (code === 'LOCAL10') {
      const discountAmount = subtotal * 0.1;
      setPromoCode('LOCAL10', discountAmount);
      setPromoSuccess('10% discount applied!');
    } else {
      setPromoError('Invalid promo code');
    }
  };

  const handleRemovePromo = () => {
    setPromoCode(null, 0);
    setPromoInput('');
    setPromoSuccess('');
  };

  // Format card number
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  // Format expiry
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  // Handle step navigation
  const handleNextStep = () => {
    if (currentStep === 'shipping' && validateShipping()) {
      setCurrentStep('payment');
    } else if (currentStep === 'payment' && validatePayment()) {
      setCurrentStep('review');
    }
  };

  const handlePrevStep = () => {
    if (currentStep === 'payment') {
      setCurrentStep('shipping');
    } else if (currentStep === 'review') {
      setCurrentStep('payment');
    }
  };

  // Handle place order
  const handlePlaceOrder = async () => {
    if (!termsAccepted) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate fake order ID
    const orderId = 'TGD-' + Math.random().toString(36).substring(2, 10).toUpperCase();

    // Clear cart and redirect
    clearCart();

    // Redirect to confirmation page with order ID
    router.push(`/order-confirmation?orderId=${orderId}`);
  };

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-48 mb-8" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-96 bg-muted rounded-lg" />
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
            Add some items to your cart before checkout.
          </p>
          <Link href="/shop">
            <Button size="lg" className="bg-forest hover:bg-forest/90 text-cream btn-shine">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Start Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const steps = [
    { id: 'shipping', label: 'Shipping', icon: MapPin },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'review', label: 'Review', icon: Package },
  ];

  const stepIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
          <Link href="/cart" className="hover:text-forest transition-colors">
            Cart
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">Checkout</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-heading">Checkout</h1>
      </motion.div>

      {/* Progress Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-center md:justify-start">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  stepIndex >= index
                    ? 'bg-forest text-cream'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <step.icon className="h-4 w-4" />
                <span className="hidden sm:inline font-medium">{step.label}</span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-8 md:w-16 h-1 mx-2 rounded transition-colors ${
                    stepIndex > index ? 'bg-forest' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {/* Shipping Step */}
            {currentStep === 'shipping' && (
              <motion.div
                key="shipping"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-forest" />
                      Shipping Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            placeholder="John Smith"
                            className="pl-10"
                            value={shippingInfo.name}
                            onChange={(e) =>
                              setShippingInfo({ ...shippingInfo, name: e.target.value })
                            }
                          />
                        </div>
                        {shippingErrors.name && (
                          <p className="text-sm text-destructive">{shippingErrors.name}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            className="pl-10"
                            value={shippingInfo.email}
                            onChange={(e) =>
                              setShippingInfo({ ...shippingInfo, email: e.target.value })
                            }
                          />
                        </div>
                        {shippingErrors.email && (
                          <p className="text-sm text-destructive">{shippingErrors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          placeholder="(416) 555-0123"
                          className="pl-10"
                          value={shippingInfo.phone}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, phone: e.target.value })
                          }
                        />
                      </div>
                      {shippingErrors.phone && (
                        <p className="text-sm text-destructive">{shippingErrors.phone}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address *</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="address"
                          placeholder="123 Main Street, Apt 4B"
                          className="pl-10"
                          value={shippingInfo.address}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, address: e.target.value })
                          }
                        />
                      </div>
                      {shippingErrors.address && (
                        <p className="text-sm text-destructive">{shippingErrors.address}</p>
                      )}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          placeholder="Toronto"
                          value={shippingInfo.city}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, city: e.target.value })
                          }
                        />
                        {shippingErrors.city && (
                          <p className="text-sm text-destructive">{shippingErrors.city}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Postal Code *</Label>
                        <Input
                          id="postalCode"
                          placeholder="M5V 1A1"
                          value={shippingInfo.postalCode}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, postalCode: e.target.value })
                          }
                        />
                        {shippingErrors.postalCode && (
                          <p className="text-sm text-destructive">{shippingErrors.postalCode}</p>
                        )}
                      </div>
                    </div>

                    <Separator />

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
                          <RadioGroupItem value="standard" id="checkout-standard" />
                          <Label
                            htmlFor="checkout-standard"
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
                          <RadioGroupItem value="same-day" id="checkout-same-day" />
                          <Label htmlFor="checkout-same-day" className="flex-1 cursor-pointer">
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

                    <div className="flex justify-end pt-4">
                      <Button
                        size="lg"
                        className="bg-forest hover:bg-forest/90 text-cream btn-shine"
                        onClick={handleNextStep}
                      >
                        Continue to Payment
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Payment Step */}
            {currentStep === 'payment' && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-forest" />
                      Payment Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Security notice */}
                    <Alert className="bg-forest/10 border-forest/20">
                      <Lock className="h-4 w-4 text-forest" />
                      <AlertDescription className="text-forest">
                        Your payment information is encrypted and secure. We use Stripe for payment processing.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-2">
                      <Label htmlFor="cardName">Name on Card *</Label>
                      <Input
                        id="cardName"
                        placeholder="John Smith"
                        value={paymentInfo.cardName}
                        onChange={(e) =>
                          setPaymentInfo({ ...paymentInfo, cardName: e.target.value })
                        }
                      />
                      {paymentErrors.cardName && (
                        <p className="text-sm text-destructive">{paymentErrors.cardName}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        placeholder="4242 4242 4242 4242"
                        value={paymentInfo.cardNumber}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            cardNumber: formatCardNumber(e.target.value),
                          })
                        }
                        maxLength={19}
                      />
                      {paymentErrors.cardNumber && (
                        <p className="text-sm text-destructive">{paymentErrors.cardNumber}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date *</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={paymentInfo.expiry}
                          onChange={(e) =>
                            setPaymentInfo({
                              ...paymentInfo,
                              expiry: formatExpiry(e.target.value),
                            })
                          }
                          maxLength={5}
                        />
                        {paymentErrors.expiry && (
                          <p className="text-sm text-destructive">{paymentErrors.expiry}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          type="password"
                          placeholder="•••"
                          value={paymentInfo.cvv}
                          onChange={(e) =>
                            setPaymentInfo({
                              ...paymentInfo,
                              cvv: e.target.value.replace(/\D/g, '').slice(0, 4),
                            })
                          }
                          maxLength={4}
                        />
                        {paymentErrors.cvv && (
                          <p className="text-sm text-destructive">{paymentErrors.cvv}</p>
                        )}
                      </div>
                    </div>

                    {/* Accepted cards */}
                    <div className="flex items-center gap-4 pt-2">
                      <span className="text-sm text-muted-foreground">We accept:</span>
                      <div className="flex gap-2">
                        <div className="px-2 py-1 bg-muted rounded text-xs font-medium">Visa</div>
                        <div className="px-2 py-1 bg-muted rounded text-xs font-medium">Mastercard</div>
                        <div className="px-2 py-1 bg-muted rounded text-xs font-medium">Amex</div>
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button variant="outline" size="lg" onClick={handlePrevStep}>
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Shipping
                      </Button>
                      <Button
                        size="lg"
                        className="bg-forest hover:bg-forest/90 text-cream btn-shine"
                        onClick={handleNextStep}
                      >
                        Review Order
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Review Step */}
            {currentStep === 'review' && (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-forest" />
                      Review Your Order
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Shipping Info Summary */}
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-forest" />
                          Shipping Address
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCurrentStep('shipping')}
                        >
                          Edit
                        </Button>
                      </div>
                      <p className="text-muted-foreground">
                        {shippingInfo.name}<br />
                        {shippingInfo.address}<br />
                        {shippingInfo.city}, {shippingInfo.postalCode}<br />
                        {shippingInfo.email}<br />
                        {shippingInfo.phone}
                      </p>
                    </div>

                    {/* Payment Info Summary */}
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-forest" />
                          Payment Method
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCurrentStep('payment')}
                        >
                          Edit
                        </Button>
                      </div>
                      <p className="text-muted-foreground">
                        Card ending in {paymentInfo.cardNumber.slice(-4)}<br />
                        {paymentInfo.cardName}
                      </p>
                    </div>

                    {/* Delivery Method */}
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h3 className="font-semibold flex items-center gap-2 mb-2">
                        <Truck className="h-4 w-4 text-forest" />
                        Delivery Method
                      </h3>
                      <p className="text-muted-foreground">
                        {deliveryOption === 'same-day' ? 'Same-Day Delivery' : 'Standard Delivery'} - ${deliveryFee.toFixed(2)}
                      </p>
                    </div>

                    {/* Gift Message */}
                    <div className="space-y-2">
                      <Label htmlFor="giftMessage" className="flex items-center gap-2">
                        <Gift className="h-4 w-4 text-forest" />
                        Gift Message (Optional)
                      </Label>
                      <Textarea
                        id="giftMessage"
                        placeholder="Add a personal message for the recipient..."
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                        maxLength={500}
                      />
                      <p className="text-xs text-muted-foreground">
                        {giftMessage.length}/500 characters
                      </p>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3">
                      <h3 className="font-semibold">Order Items</h3>
                      {items.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                        >
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-16 h-16 rounded-md object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                            </p>
                            {item.singingTelegram?.enabled && (
                              <Badge variant="outline" className="mt-1 border-maple text-maple text-xs">
                                <Music className="h-3 w-3 mr-1" />
                                Singing Telegram
                              </Badge>
                            )}
                            {item.videoMessage && (
                              <Badge variant="outline" className="mt-1 ml-1 border-gold text-gold text-xs">
                                <Video className="h-3 w-3 mr-1" />
                                Video Message
                              </Badge>
                            )}
                          </div>
                          <p className="font-semibold">
                            ${(item.product.price * item.quantity + (item.singingTelegram?.enabled ? item.singingTelegram.price : 0)).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Terms */}
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="terms"
                        checked={termsAccepted}
                        onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                      />
                      <Label htmlFor="terms" className="text-sm leading-tight">
                        I agree to the{' '}
                        <Link href="/terms" className="text-forest hover:underline">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-forest hover:underline">
                          Privacy Policy
                        </Link>
                        . I understand that my order is final.
                      </Label>
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button variant="outline" size="lg" onClick={handlePrevStep}>
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Payment
                      </Button>
                      <Button
                        size="lg"
                        className="bg-forest hover:bg-forest/90 text-cream btn-shine"
                        onClick={handlePlaceOrder}
                        disabled={!termsAccepted || isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Lock className="mr-2 h-4 w-4" />
                            Place Order - ${total.toFixed(2)}
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Order Summary Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-forest" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Items List */}
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-md object-cover"
                      />
                      <span className="absolute -top-1 -right-1 bg-forest text-cream text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        ${item.product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Promo Code */}
              <div className="space-y-2">
                {promoCode ? (
                  <div className="flex items-center justify-between p-2 bg-forest/10 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-forest" />
                      <span className="text-sm font-medium text-forest">{promoCode}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={handleRemovePromo}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Promo code"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
                      className="text-sm"
                    />
                    <Button variant="outline" size="sm" onClick={handleApplyPromo}>
                      Apply
                    </Button>
                  </div>
                )}
                {promoError && (
                  <p className="text-xs text-destructive">{promoError}</p>
                )}
                {promoSuccess && (
                  <p className="text-xs text-forest">{promoSuccess}</p>
                )}
              </div>

              <Separator />

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Delivery ({deliveryOption === 'same-day' ? 'Same-Day' : 'Standard'})
                  </span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-forest">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-forest">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
                <Lock className="h-3 w-3" />
                <span>Secure checkout powered by Stripe</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
