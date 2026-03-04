'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Leaf, 
  MapPin, 
  Heart, 
  Users, 
  Award, 
  Package, 
  Calendar,
  ArrowRight,
  Sparkles,
  TreePine,
  Shield,
  Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ArtisanCard from '@/components/shared/ArtisanCard';
import { artisans } from '@/data';

export default function AboutPage() {
  const values = [
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'Every product is crafted with eco-friendly materials and packaged in zero-waste, recyclable packaging.',
      color: 'text-forest bg-forest/10',
    },
    {
      icon: MapPin,
      title: 'Local First',
      description: 'We believe in supporting our neighbors. 100% of our artisans are based right here in Toronto.',
      color: 'text-gold bg-gold/10',
    },
    {
      icon: Award,
      title: 'Quality',
      description: 'Each artisan is carefully vetted. Every product is handcrafted with meticulous attention to detail.',
      color: 'text-maple bg-maple/10',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We\'re building more than a marketplace—we\'re creating a community of makers and gift-givers.',
      color: 'text-forest bg-forest/10',
    },
  ];

  const stats = [
    { value: '5000+', label: 'Happy Customers', icon: Heart },
    { value: '8', label: 'Local Artisans', icon: Users },
    { value: '24', label: 'Unique Products', icon: Package },
    { value: '2+', label: 'Years Serving Toronto', icon: Calendar },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517935706615-2717063c2225?w=1920&h=1080&fit=crop"
            alt="Toronto cityscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate/95 via-slate/80 to-slate/60" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-forest text-cream mb-4 text-sm px-4 py-1">
                <Building2 className="h-4 w-4 mr-2" />
                Est. 2022 • Toronto, Canada
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6 leading-tight font-heading"
            >
              Connecting Toronto&apos;s <span className="text-gold">Artisans</span> with <span className="text-gold">Gift Givers</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-cream/90 mb-8"
            >
              We&apos;re a marketplace built by Torontonians, for Torontonians. Every gift tells a story of our vibrant city.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/shop">
                <Button size="lg" className="bg-forest hover:bg-forest/90 text-cream text-lg px-8 btn-shine">
                  Shop Local Gifts
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button size="lg" variant="outline" className="bg-transparent border-cream text-cream hover:bg-cream/10 text-lg px-8">
                  How It Works
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-10 right-10 hidden lg:block"
        >
          <TreePine className="h-20 w-20 text-forest/30" />
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="secondary" className="mb-4">
                Our Story
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading">
                Born from a Love of <span className="text-primary">Local Craft</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  TorontoGiftsDelivery.com started with a simple observation: Toronto is home to incredibly talented artisans, 
                  yet finding their work often meant visiting crowded markets or obscure shops.
                </p>
                <p>
                  In 2022, we set out to change that. We built a platform that connects Toronto&apos;s finest craftspeople 
                  with those seeking meaningful, unique gifts. No mass-produced items. No overseas shipping. Just authentic, 
                  handcrafted products made with love in our city.
                </p>
                <p>
                  Today, we work with 8 verified artisans across neighborhoods from Kensington Market to Liberty Village. 
                  Each one brings their unique story, heritage, and craft to our marketplace. When you buy from us, 
                  you&apos;re not just getting a gift—you&apos;re supporting a neighbor.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&h=800&fit=crop"
                  alt="Artisan crafting handmade gifts"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-forest text-cream p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold font-heading">100%</div>
                <div className="text-sm">Toronto Made</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet Our Artisans Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="secondary" className="mb-4">
              <Users className="h-4 w-4 mr-1" />
              Our Makers
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
              Meet Our <span className="text-primary">Talented Artisans</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every artisan in our marketplace has been carefully vetted and brings their unique story and craft to Toronto.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {artisans.map((artisan, index) => (
              <ArtisanCard key={artisan.id} artisan={artisan} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="secondary" className="mb-4">
              <Heart className="h-4 w-4 mr-1" />
              What We Stand For
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
              Our <span className="text-primary">Core Values</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do, from the artisans we partner with to how we package your gifts.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center p-6 hover:shadow-lg transition-shadow border-border">
                  <div className={`w-16 h-16 rounded-full ${value.color} flex items-center justify-center mx-auto mb-4`}>
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 font-heading">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-forest">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="bg-gold text-slate mb-4">
              Our Impact
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-cream font-heading">
              TorontoGiftsDelivery by the Numbers
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-cream/10 backdrop-blur border-none text-center p-6">
                  <CardContent className="p-0">
                    <stat.icon className="h-8 w-8 text-gold mx-auto mb-3" />
                    <div className="text-4xl md:text-5xl font-bold text-cream mb-2 font-heading">{stat.value}</div>
                    <div className="text-cream/80 text-sm">{stat.label}</div>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Shop CTA */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&h=500&fit=crop"
                  alt="Gift shopping"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-forest/95 to-forest/80" />
              </div>

              <div className="relative z-10 py-12 px-8">
                <Badge className="bg-gold text-slate mb-4">
                  <Package className="h-4 w-4 mr-1" />
                  Start Shopping
                </Badge>
                <h3 className="text-2xl md:text-3xl font-bold text-cream mb-4 font-heading">
                  Find the Perfect Toronto Gift
                </h3>
                <p className="text-cream/90 mb-6">
                  Browse our curated collection of handcrafted gifts, all made with love by local artisans.
                </p>
                <Link href="/shop">
                  <Button size="lg" className="bg-cream text-forest hover:bg-cream/90">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Become Artisan CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&h=500&fit=crop"
                  alt="Artisan workspace"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-maple/95 to-maple/80" />
              </div>

              <div className="relative z-10 py-12 px-8">
                <Badge className="bg-cream text-maple mb-4">
                  <Shield className="h-4 w-4 mr-1" />
                  Join Us
                </Badge>
                <h3 className="text-2xl md:text-3xl font-bold text-cream mb-4 font-heading">
                  Become a Toronto Artisan
                </h3>
                <p className="text-cream/90 mb-6">
                  Are you a Toronto-based maker? We&apos;d love to feature your handcrafted products on our platform.
                </p>
                <Button size="lg" className="bg-cream text-maple hover:bg-cream/90">
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-forest" />
              <span className="text-sm">Verified Artisans</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-forest" />
              <span className="text-sm">Zero-Waste Packaging</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-forest" />
              <span className="text-sm">100% Toronto Made</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-forest" />
              <span className="text-sm">Satisfaction Guaranteed</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
