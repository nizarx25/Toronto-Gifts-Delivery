'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Users, 
  Gift, 
  Star, 
  CheckCircle, 
  Upload,
  Phone,
  Mail,
  ArrowRight,
  Leaf,
  Truck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { products, artisans } from '@/data';

export default function CorporatePage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    productInterest: '',
    quantity: '',
    budget: '',
    deadline: '',
    branding: false,
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate via-slate/90 to-forest py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <Badge className="bg-gold text-slate mb-4">
              <Building2 className="h-3 w-3 mr-1" />
              Corporate Gifting
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-cream mb-6 font-heading">
              Elevate Your Corporate Gifting with Local Toronto Artisans
            </h1>
            <p className="text-lg text-cream/80 mb-8">
              Impress clients, reward employees, and celebrate milestones with handcrafted gifts from Toronto&apos;s finest local makers. Bulk orders, custom branding, and dedicated support.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#quote-form">
                <Button size="lg" className="bg-gold hover:bg-gold/90 text-slate">
                  Request a Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <Button size="lg" variant="outline" className="border-cream text-cream hover:bg-cream/10">
                View Portfolio
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-heading">Why Choose TorontoGiftsDelivery for Corporate?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We make corporate gifting effortless while supporting Toronto&apos;s artisan community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Gift,
                title: 'Custom Branding',
                description: 'Add your company logo and custom packaging to any gift',
              },
              {
                icon: Users,
                title: 'Bulk Discounts',
                description: 'Special pricing for orders of 10+ items',
              },
              {
                icon: Truck,
                title: 'Managed Delivery',
                description: 'We handle shipping to multiple addresses',
              },
              {
                icon: Leaf,
                title: 'Eco-Friendly',
                description: 'Zero-waste packaging aligns with CSR goals',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center p-6">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products for Corporate */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-heading">Popular Corporate Gift Choices</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Curated selections that impress every time
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.slice(0, 3).map((product) => (
              <Card key={product.id} className="overflow-hidden group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">by {product.artisan.name}</p>
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary">${product.price.toFixed(2)}</span>
                    <Badge variant="secondary">Bulk Available</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-forest">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-gold text-gold" />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl text-cream mb-6 font-heading italic">
              &ldquo;TorontoGiftsDelivery made our holiday client gifting effortless. The custom branded gift boxes were stunning, and our clients loved the local artisan stories. Will definitely use again!&rdquo;
            </blockquote>
            <div>
              <p className="font-semibold text-cream">Sarah Chen</p>
              <p className="text-cream/80">Head of Partnerships, TechScale Toronto</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote-form" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-heading">Request a Corporate Quote</h2>
              <p className="text-muted-foreground">
                Fill out the form below and our corporate team will get back to you within 24 hours
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-forest" />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-heading">Thank You!</h3>
                <p className="text-muted-foreground mb-6">
                  Your request has been received. Our corporate team will contact you within 24 hours with a custom quote.
                </p>
                <Button onClick={() => setSubmitted(false)} variant="outline">
                  Submit Another Request
                </Button>
              </motion.div>
            ) : (
              <Card>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name *</Label>
                        <Input
                          id="companyName"
                          required
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          placeholder="Your Company Inc."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactName">Contact Name *</Label>
                        <Input
                          id="contactName"
                          required
                          value={formData.contactName}
                          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                          placeholder="John Smith"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            required
                            className="pl-10"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@company.com"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            type="tel"
                            className="pl-10"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="(416) 555-0123"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label>Product Interest *</Label>
                        <Select
                          value={formData.productInterest}
                          onValueChange={(value) => setFormData({ ...formData, productInterest: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gift-boxes">Curated Gift Boxes</SelectItem>
                            <SelectItem value="wellness">Wellness Products</SelectItem>
                            <SelectItem value="food">Gourmet Food</SelectItem>
                            <SelectItem value="home">Home Décor</SelectItem>
                            <SelectItem value="custom">Custom Selection</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Quantity *</Label>
                        <Select
                          value={formData.quantity}
                          onValueChange={(value) => setFormData({ ...formData, quantity: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="How many?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10-25">10 - 25</SelectItem>
                            <SelectItem value="25-50">25 - 50</SelectItem>
                            <SelectItem value="50-100">50 - 100</SelectItem>
                            <SelectItem value="100+">100+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Budget per Gift *</Label>
                        <Select
                          value={formData.budget}
                          onValueChange={(value) => setFormData({ ...formData, budget: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="25-50">$25 - $50</SelectItem>
                            <SelectItem value="50-100">$50 - $100</SelectItem>
                            <SelectItem value="100-150">$100 - $150</SelectItem>
                            <SelectItem value="150+">$150+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Delivery Deadline</Label>
                      <Input
                        type="date"
                        value={formData.deadline}
                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      />
                    </div>

                    <div className="flex items-start space-x-3 p-4 border rounded-lg bg-muted/30">
                      <Checkbox
                        id="branding"
                        checked={formData.branding}
                        onCheckedChange={(checked) => setFormData({ ...formData, branding: checked as boolean })}
                      />
                      <div>
                        <Label htmlFor="branding" className="cursor-pointer">
                          Add custom branding (logo, custom packaging)
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          We&apos;ll contact you for your logo files and branding specifications
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Additional Details</Label>
                      <Textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your event, special requirements, or any questions..."
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Submit Quote Request
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6 font-heading">Prefer to Talk?</h2>
            <p className="text-muted-foreground mb-6">
              Our corporate gifting specialists are ready to help you create the perfect gift program.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="tel:+905528875997" className="flex items-center gap-2 text-primary hover:underline">
                <Phone className="h-5 w-5" />
                +905528875997
              </a>
              <a href="mailto:info@nizarrahme.com" className="flex items-center gap-2 text-primary hover:underline">
                <Mail className="h-5 w-5" />
                info@nizarrahme.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
