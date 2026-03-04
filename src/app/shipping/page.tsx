'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Truck, 
  Clock, 
  MapPin, 
  Package, 
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail
} from 'lucide-react';
import { cn } from '@/lib/utils';

const deliveryZones = [
  {
    zone: 'Toronto Proper',
    areas: ['Downtown', 'Midtown', 'North York', 'Scarborough', 'Etobicoke', 'East York', 'York'],
    standardDelivery: '$7.99',
    freeDeliveryMin: '$75',
    sameDay: 'Available (order by 12 PM)',
    estimatedDays: '1-2 days'
  },
  {
    zone: 'Inner GTA',
    areas: ['Mississauga', 'Brampton', 'Markham', 'Richmond Hill', 'Vaughan'],
    standardDelivery: '$9.99',
    freeDeliveryMin: '$100',
    sameDay: 'Available (order by 10 AM)',
    estimatedDays: '1-3 days'
  },
  {
    zone: 'Outer GTA',
    areas: ['Pickering', 'Ajax', 'Oakville', 'Burlington', 'Milton', 'Newmarket'],
    standardDelivery: '$12.99',
    freeDeliveryMin: '$125',
    sameDay: 'Not available',
    estimatedDays: '2-4 days'
  }
];

const deliverySchedule = [
  { day: 'Monday - Friday', hours: '9:00 AM - 8:00 PM' },
  { day: 'Saturday', hours: '10:00 AM - 6:00 PM' },
  { day: 'Sunday', hours: '11:00 AM - 5:00 PM' },
  { day: 'Holidays', hours: 'Varies (check announcements)' }
];

const timeSlots = [
  { slot: 'Morning', time: '9:00 AM - 12:00 PM', icon: '🌅' },
  { slot: 'Afternoon', time: '12:00 PM - 5:00 PM', icon: '☀️' },
  { slot: 'Evening', time: '5:00 PM - 8:00 PM', icon: '🌙' }
];

const shippingPolicies = [
  {
    title: 'Order Processing',
    description: 'Orders are processed within 1-2 business days. You\'ll receive a confirmation email with tracking information once your order ships.',
    icon: Package
  },
  {
    title: 'Tracking Your Order',
    description: 'All orders include real-time tracking. Use the tracking number from your confirmation email or log into your account to track your delivery.',
    icon: MapPin
  },
  {
    title: 'Delivery Notifications',
    description: 'Receive SMS and email updates at every stage: order confirmed, preparing, out for delivery, and delivered. Opt-out anytime.',
    icon: Clock
  },
  {
    title: 'Safe Delivery',
    description: 'If no one is home, our drivers will leave your package in a safe place and send you a photo confirmation. Add special instructions at checkout.',
    icon: CheckCircle2
  }
];

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Truck className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Shipping Information
            </h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Fast, reliable delivery across Toronto and the GTA. Same-day delivery available 
              for orders placed before 12 PM.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Info Banner */}
      <section className="bg-white py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-center">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Same-Day Delivery Available</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Free Delivery Over $75</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Toronto & GTA Coverage</span>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Zones */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold font-heading mb-4">Delivery Zones & Rates</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We deliver across Toronto and the Greater Toronto Area. Find your zone below.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {deliveryZones.map((zone, index) => (
              <motion.div
                key={zone.zone}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <div className={cn(
                  "px-6 py-4 border-b",
                  index === 0 ? "bg-primary text-primary-foreground" : "bg-primary/5"
                )}>
                  <h3 className="text-xl font-semibold font-heading">{zone.zone}</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Areas Covered</p>
                    <p className="text-sm">{zone.areas.join(', ')}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Standard Delivery</p>
                      <p className="font-semibold">{zone.standardDelivery}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Free Delivery Min.</p>
                      <p className="font-semibold">{zone.freeDeliveryMin}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Same-Day Delivery</p>
                    <p className={cn(
                      "font-medium",
                      zone.sameDay === 'Not available' ? 'text-maple' : 'text-primary'
                    )}>
                      {zone.sameDay}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Time</p>
                    <p className="font-medium">{zone.estimatedDays}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Time Slots */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold font-heading mb-4">Delivery Time Slots</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose your preferred delivery window at checkout. We offer flexible slots to fit your schedule.
            </p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-3 max-w-3xl mx-auto">
            {timeSlots.map((slot, index) => (
              <motion.div
                key={slot.slot}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-cream rounded-xl p-6 text-center"
              >
                <span className="text-3xl mb-2 block">{slot.icon}</span>
                <h3 className="font-semibold mb-1">{slot.slot}</h3>
                <p className="text-sm text-muted-foreground">{slot.time}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Schedule */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl font-bold font-heading mb-4">Delivery Schedule</h2>
              <p className="text-muted-foreground">
                Our delivery team operates seven days a week to bring your gifts to you.
              </p>
            </motion.div>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-primary/5">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Day</th>
                    <th className="px-6 py-4 text-left font-semibold">Delivery Hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {deliverySchedule.map((item, index) => (
                    <tr key={index} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 font-medium">{item.day}</td>
                      <td className="px-6 py-4 text-muted-foreground">{item.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Policies */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold font-heading mb-4">Shipping Policies</h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {shippingPolicies.map((policy, index) => (
              <motion.div
                key={policy.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 p-6 bg-cream rounded-xl"
              >
                <div className="shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <policy.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{policy.title}</h3>
                  <p className="text-sm text-muted-foreground">{policy.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-8">
            <div className="flex gap-4">
              <AlertCircle className="h-6 w-6 text-amber-600 shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-900 mb-2">Important Delivery Notes</h3>
                <ul className="space-y-2 text-sm text-amber-800">
                  <li>• Same-day delivery is only available for in-stock items. Custom or personalized items require additional processing time.</li>
                  <li>• Delivery times may vary during peak seasons (Valentine&apos;s Day, Mother&apos;s Day, Christmas).</li>
                  <li>• Weather conditions may cause delays. We&apos;ll notify you if your delivery is affected.</li>
                  <li>• Signature confirmation is recommended for orders over $200.</li>
                  <li>• We do not deliver to PO boxes. Please provide a physical address.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold font-heading mb-4">Questions About Shipping?</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
              Our team is here to help with any delivery questions or special requests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+905528875997"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary rounded-lg hover:bg-white/90 transition-colors"
              >
                <Phone className="h-5 w-5" />
                Call +905528875997
              </a>
              <a
                href="mailto:info@nizarrahme.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                <Mail className="h-5 w-5" />
                Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
