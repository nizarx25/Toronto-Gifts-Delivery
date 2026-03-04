'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Search, 
  Palette, 
  Hammer, 
  Truck, 
  Sparkles, 
  Video, 
  Clock, 
  MapPin, 
  CreditCard,
  Package,
  Shield,
  CheckCircle,
  ArrowRight,
  HelpCircle,
  Phone,
  Mail,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function HowItWorksPage() {
  const steps = [
    {
      number: '01',
      icon: Search,
      title: 'Browse & Choose',
      description: 'Explore our curated selection of handcrafted gifts. Filter by category, artisan, price, or special attributes like Halal-certified or same-day delivery.',
      color: 'text-forest bg-forest/10',
    },
    {
      number: '02',
      icon: Palette,
      title: 'Customize Your Gift',
      description: 'Add personal touches to make your gift extra special. Include a handwritten note, add a video message, or request custom gift wrapping.',
      color: 'text-gold bg-gold/10',
    },
    {
      number: '03',
      icon: Hammer,
      title: 'We Handcraft',
      description: 'Your artisan prepares your gift with care. Each item is made fresh, packaged sustainably, and quality-checked before shipping.',
      color: 'text-maple bg-maple/10',
    },
    {
      number: '04',
      icon: Truck,
      title: 'Same-Day Delivery',
      description: 'Order before 2PM for same-day delivery across Toronto & GTA. Track your gift in real-time as it makes its way to your loved one.',
      color: 'text-forest bg-forest/10',
    },
  ];

  const features = [
    {
      icon: Video,
      title: 'Video Messages',
      description: 'Add a personal video message to your gift. Record up to 60 seconds and we\'ll include a QR code with your gift for the recipient to scan and watch.',
    },
    {
      icon: Sparkles,
      title: 'AI Gift Recommender',
      description: 'Not sure what to get? Our AI-powered recommender asks a few questions about the recipient and suggests the perfect gift from our collection.',
    },
  ];

  const deliveryInfo = [
    {
      icon: Clock,
      title: 'Same-Day Delivery',
      description: 'Order before 2PM for delivery the same day. Orders after 2PM are delivered the next business day.',
    },
    {
      icon: MapPin,
      title: 'Delivery Area',
      description: 'We deliver to all of Toronto and the GTA, including Scarborough, North York, Etobicoke, Mississauga, and more.',
    },
    {
      icon: CreditCard,
      title: 'Delivery Fee',
      description: 'Flat rate of $9.99 for same-day delivery. Free delivery on orders over $100.',
    },
    {
      icon: Package,
      title: 'Tracking',
      description: 'Track your order in real-time with our live tracking system. Know exactly when your gift will arrive.',
    },
  ];

  const faqs = [
    {
      question: 'How does same-day delivery work?',
      answer: 'Order any item marked with the "Same-Day" badge before 2PM, and we\'ll deliver it the same day within Toronto & GTA. Our local delivery partners ensure your gift arrives safely and on time. You\'ll receive a tracking link to monitor your delivery in real-time.',
    },
    {
      question: 'Are all products really handmade by local artisans?',
      answer: 'Yes! Every product on TorontoGiftsDelivery.com is handcrafted by one of our 8 verified Toronto-based artisans. We personally vet each artisan and their workshop to ensure authenticity and quality. You can read each artisan\'s story on their product pages.',
    },
    {
      question: 'How do video messages work?',
      answer: 'When you add a video message to your order, you\'ll receive a link to record up to 60 seconds of video. We include a beautiful QR card with your gift that the recipient can scan to watch your personal message. It\'s perfect for birthdays, anniversaries, or any special occasion.',
    },
    {
      question: 'What makes your packaging eco-friendly?',
      answer: 'All our packaging is 100% plastic-free and made from recycled or sustainable materials. We use biodegradable tissue paper, compostable fillers, and recyclable boxes. Even our tape is paper-based. Your gift looks beautiful and leaves no trace behind.',
    },
    {
      question: 'How does the AI Gift Recommender work?',
      answer: 'Our AI asks you a few simple questions about the recipient—their interests, the occasion, your budget, and any special requirements. Using this information, it analyzes our product catalog to recommend the perfect gift. It\'s like having a personal shopper who knows every product intimately.',
    },
    {
      question: 'Can I track my order?',
      answer: 'Absolutely! Once your order ships, you\'ll receive a tracking link via email and SMS. You can watch your gift move through our delivery network in real-time. You can also track orders from our website using your order number.',
    },
    {
      question: 'What if I\'m not satisfied with my purchase?',
      answer: 'We offer a 100% satisfaction guarantee. If you or your recipient aren\'t completely happy with the gift, contact us within 7 days and we\'ll make it right—whether that\'s a replacement, exchange, or refund. Your happiness is our priority.',
    },
    {
      question: 'Do you offer corporate or bulk orders?',
      answer: 'Yes! We specialize in corporate gifting with custom branding options, bulk pricing, and dedicated account management. Visit our Corporate page to learn more about how we can help with employee gifts, client appreciation, and corporate events.',
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&h=800&fit=crop"
            alt="Gift delivery process"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate/90 via-slate/80 to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-forest text-cream mb-4 text-sm px-4 py-1">
              <HelpCircle className="h-4 w-4 mr-2" />
              Simple & Transparent
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6 leading-tight font-heading"
          >
            How <span className="text-gold">TorontoGiftsDelivery</span> Works
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-cream/90 mb-8 max-w-2xl mx-auto"
          >
            From browsing to delivery, we&apos;ve made gifting as easy as possible. 
            Here&apos;s how to send a piece of Toronto to someone special.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/shop">
              <Button size="lg" className="bg-gold hover:bg-gold/90 text-slate text-lg px-8 btn-shine">
                Start Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 4-Step Process */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-4">
              <Clock className="h-4 w-4 mr-1" />
              Simple 4-Step Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
              From Browse to <span className="text-primary">Delivery</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We&apos;ve streamlined the gift-giving process so you can focus on what matters—making someone smile.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-border" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <Card className="h-full text-center p-6 hover:shadow-lg transition-shadow border-border bg-card">
                    <CardContent className="p-0">
                      {/* Step Number */}
                      <div className="text-6xl font-bold text-muted-foreground/20 mb-4 font-heading">
                        {step.number}
                      </div>
                      
                      {/* Icon */}
                      <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mx-auto mb-4 relative z-10`}>
                        <step.icon className="h-8 w-8" />
                      </div>

                      <h3 className="text-xl font-semibold mb-2 font-heading">{step.title}</h3>
                      <p className="text-muted-foreground text-sm">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video/AI Recommender Feature Highlight */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="bg-gold text-slate mb-4">
              <Sparkles className="h-4 w-4 mr-1" />
              Special Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
              Make Your Gift <span className="text-primary">Unforgettable</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer unique features that make gifting more personal and easier than ever.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full p-6 border-border hover:shadow-lg transition-shadow bg-card">
                  <CardContent className="p-0">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-forest/10 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="h-7 w-7 text-forest" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 font-heading">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/recommend">
              <Button size="lg" className="bg-forest hover:bg-forest/90 text-cream">
                <Sparkles className="mr-2 h-5 w-5" />
                Try AI Gift Recommender
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Delivery Information */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="secondary" className="mb-4">
              <Truck className="h-4 w-4 mr-1" />
              Delivery Details
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
              Fast & <span className="text-primary">Reliable</span> Delivery
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We partner with local delivery services to ensure your gifts arrive safely and on time.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliveryInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center p-6 hover:shadow-lg transition-shadow border-border bg-card">
                  <CardContent className="p-0">
                    <div className="w-14 h-14 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-4">
                      <info.icon className="h-7 w-7 text-forest" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 font-heading">{info.title}</h3>
                    <p className="text-muted-foreground text-sm">{info.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Delivery Map Visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 relative rounded-2xl overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=1200&h=400&fit=crop"
              alt="Toronto delivery area map"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-forest/90 to-forest/70 flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <MapPin className="h-6 w-6 text-gold" />
                  <span className="text-2xl font-bold text-cream font-heading">Toronto & GTA</span>
                </div>
                <p className="text-cream/90">Same-day delivery across the Greater Toronto Area</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="secondary" className="mb-4">
              <HelpCircle className="h-4 w-4 mr-1" />
              FAQ
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Got questions? We&apos;ve got answers. If you don&apos;t find what you&apos;re looking for, 
              feel free to contact us.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="bg-card border border-border rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-left font-medium hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-forest">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-gold text-slate mb-4">
              Ready to Start?
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4 font-heading">
              Send a Piece of Toronto Today
            </h2>
            <p className="text-cream/90 mb-8 max-w-2xl mx-auto">
              Browse our collection of handcrafted gifts and make someone&apos;s day with a unique, 
              locally-made present delivered right to their door.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link href="/shop">
                <Button size="lg" className="bg-cream text-forest hover:bg-cream/90 text-lg px-8 btn-shine">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/recommend">
                <Button size="lg" variant="outline" className="bg-transparent border-cream text-cream hover:bg-cream/10 text-lg px-8">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Get AI Recommendation
                </Button>
              </Link>
            </div>

            {/* Contact Options */}
            <div className="flex flex-wrap justify-center gap-6 text-cream/80">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span>(416) 555-GIFT</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <span>hello@torontogiftsdelivery.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                <span>Live Chat Available</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-forest" />
              <span className="text-sm">100% Satisfaction Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-forest" />
              <span className="text-sm">Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-forest" />
              <span className="text-sm">Real-Time Tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-forest" />
              <span className="text-sm">Zero-Waste Packaging</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
