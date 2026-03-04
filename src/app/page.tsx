'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Truck, 
  Leaf, 
  Shield, 
  Heart, 
  Star, 
  ArrowRight, 
  Sparkles,
  Clock,
  MapPin,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/shared/ProductCard';
import ArtisanCard from '@/components/shared/ArtisanCard';
import { products, artisans, testimonials } from '@/data';

export default function HomePage() {
  // Featured products (best sellers)
  const featuredProducts = products.slice(0, 8);
  // Featured artisans
  const featuredArtisans = artisans.slice(0, 4);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1920&h=1080&fit=crop"
            alt="Toronto skyline with gift boxes"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate/90 via-slate/70 to-transparent" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-gold text-slate mb-4 text-sm px-4 py-1">
                <Sparkles className="h-4 w-4 mr-2" />
                AI-Powered Gift Recommendations
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-cream mb-6 leading-tight font-heading"
            >
              Gifts Made by{' '}
              <span className="text-gold">Toronto Hands</span>,{' '}
              Delivered Today
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-cream/90 mb-8"
            >
              100% Local Artisans • Zero Waste • Same Day Delivery
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/shop">
                <Button size="lg" className="bg-forest hover:bg-forest/90 text-cream text-lg px-8 btn-shine">
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
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 flex flex-wrap gap-6 text-cream/80"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-forest" />
                <span>Verified Artisans</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-forest" />
                <span>Same-Day Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-forest" />
                <span>Zero-Waste Packaging</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-10 right-10 hidden lg:block"
        >
          <Leaf className="h-24 w-24 text-forest/30" />
        </motion.div>
      </section>

      {/* Trust Bar */}
      <section className="bg-forest py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-cream text-center">
            <div className="flex items-center gap-3">
              <Truck className="h-8 w-8" />
              <div className="text-left">
                <div className="font-semibold">Same-Day Delivery</div>
                <div className="text-sm opacity-80">Order before 2PM</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Leaf className="h-8 w-8" />
              <div className="text-left">
                <div className="font-semibold">Carbon Negative</div>
                <div className="text-sm opacity-80">Eco-friendly shipping</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8" />
              <div className="text-left">
                <div className="font-semibold">5000+ Happy Customers</div>
                <div className="text-sm opacity-80">Across Toronto & GTA</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8" />
              <div className="text-left">
                <div className="font-semibold">100% Satisfaction</div>
                <div className="text-sm opacity-80">Quality guaranteed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artisans */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="secondary" className="mb-4">
              Meet Our Makers
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
              Featured <span className="text-primary">Toronto Artisans</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every gift tells a story. Meet the talented local artisans who pour their heart into every creation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredArtisans.map((artisan, index) => (
              <ArtisanCard key={artisan.id} artisan={artisan} index={index} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/about">
              <Button variant="outline" size="lg">
                Meet All Artisans
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="secondary" className="mb-4">
              <Star className="h-4 w-4 mr-1" />
              Top Rated
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
              Best Selling <span className="text-primary">Toronto Gifts</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our most-loved handcrafted gifts, all made right here in Toronto.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/shop">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Local */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="secondary" className="mb-4">
              Why Local Matters
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
              Why Choose <span className="text-primary">TorontoGiftsDelivery</span>?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: MapPin,
                title: '100% Toronto Made',
                description: 'Every product is handcrafted by verified local artisans right here in Toronto.',
                color: 'text-forest bg-forest/10',
              },
              {
                icon: Truck,
                title: 'Same-Day Delivery',
                description: 'Order before 2PM and receive your gift the same day in Toronto & GTA.',
                color: 'text-gold bg-gold/10',
              },
              {
                icon: Leaf,
                title: 'Zero-Waste Packaging',
                description: 'All gifts are packaged sustainably with recyclable and biodegradable materials.',
                color: 'text-forest bg-forest/10',
              },
              {
                icon: Heart,
                title: 'Support Your City',
                description: 'Every purchase directly supports local families and the Toronto artisan community.',
                color: 'text-maple bg-maple/10',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center p-6 hover:shadow-lg transition-shadow">
                  <div className={`w-16 h-16 rounded-full ${item.color} flex items-center justify-center mx-auto mb-4`}>
                    <item.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 font-heading">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-forest">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="bg-gold text-slate mb-4">
              Happy Customers
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cream font-heading">
              What Torontonians Are Saying
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-cream border-none p-6">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                      ))}
                    </div>
                    <p className="text-slate mb-4">&ldquo;{testimonial.text}&rdquo;</p>
                    <div className="flex items-center gap-3">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold text-slate">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {testimonial.location}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=400&fit=crop"
                alt="Gift wrapping"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
            </div>

            <div className="relative z-10 py-16 px-8 md:px-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 font-heading">
                Need Help Finding the Perfect Gift?
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                Our AI-powered gift recommender will help you find the perfect present in seconds. 
                Just answer a few quick questions!
              </p>
              <Link href="/recommend">
                <Button size="lg" className="bg-gold hover:bg-gold/90 text-slate text-lg px-8 btn-shine">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Try AI Gift Recommender
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 font-heading">
              Stay Updated with <span className="text-primary">Local Artisans</span>
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Get exclusive offers, new artisan features, and gift inspiration delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
