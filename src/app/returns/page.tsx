'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  RefreshCw, 
  Package, 
  Clock, 
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Phone,
  Mail,
  MessageCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

const returnSteps = [
  {
    step: 1,
    title: 'Initiate Return',
    description: 'Log into your account, go to Order History, and select "Return Item" next to the product you wish to return.',
    icon: Package
  },
  {
    step: 2,
    title: 'Choose Resolution',
    description: 'Select your preferred resolution: full refund, store credit, or exchange for a different item.',
    icon: RefreshCw
  },
  {
    step: 3,
    title: 'Pack Your Item',
    description: 'Pack the item in its original packaging with all tags attached. Include any accessories and the original receipt.',
    icon: Package
  },
  {
    step: 4,
    title: 'Ship or Schedule Pickup',
    description: 'Use the prepaid shipping label we email you, or schedule a free pickup within Toronto & GTA.',
    icon: CheckCircle2
  }
];

const returnPolicy = {
  eligible: [
    'Items in original condition with tags attached',
    'Unopened and unused products in original packaging',
    'Items returned within 30 days of delivery',
    'Non-personalized products (unless defective)',
    'Items with manufacturing defects or errors'
  ],
  notEligible: [
    'Personalized or custom-made items (unless defective)',
    'Perishable food items',
    'Items marked as "Final Sale"',
    'Items returned after 30 days',
    'Items damaged due to misuse or negligence',
    'Gift cards and digital products'
  ]
};

const refundTimeline = [
  { status: 'Return Initiated', time: 'Day 0', description: 'Return request submitted online' },
  { status: 'Return Label Sent', time: 'Within 24 hours', description: 'Prepaid shipping label emailed' },
  { status: 'Item Received', time: '3-5 business days', description: 'We receive and inspect your return' },
  { status: 'Refund Processed', time: '1-3 business days', description: 'Refund issued to original payment method' },
  { status: 'Refund Reflected', time: '3-5 business days', description: 'Amount appears in your account' }
];

const exchangeInfo = [
  {
    title: 'Same Item Exchange',
    description: 'Exchange for the same product in a different size, color, or variant. Subject to availability.',
    available: true
  },
  {
    title: 'Different Item Exchange',
    description: 'Exchange for any product of equal or lesser value. If choosing a higher-value item, pay the difference.',
    available: true
  },
  {
    title: 'Store Credit',
    description: 'Receive store credit for the full purchase amount, valid for 1 year. Great for gifts!',
    available: true
  }
];

export default function ReturnsPage() {
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
            <RefreshCw className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Returns & Exchanges
            </h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Not completely satisfied? We offer a 30-day satisfaction guarantee with free returns 
              within Toronto & GTA.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Info Banner */}
      <section className="bg-white py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-center">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">30-Day Return Window</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Free Returns in GTA</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Easy Exchanges</span>
            </div>
          </div>
        </div>
      </section>

      {/* Return Policy Overview */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl font-bold font-heading mb-4">Our Return Policy</h2>
              <p className="text-muted-foreground">
                We want you to love your purchase. If you&apos;re not completely satisfied, 
                we&apos;re here to make it right.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Eligible */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="bg-primary/10 px-6 py-4 border-b border-border flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-primary">Eligible for Return</h3>
                </div>
                <ul className="p-6 space-y-3">
                  {returnPolicy.eligible.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Not Eligible */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="bg-maple/10 px-6 py-4 border-b border-border flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-maple" />
                  <h3 className="font-semibold text-maple">Not Eligible for Return</h3>
                </div>
                <ul className="p-6 space-y-3">
                  {returnPolicy.notEligible.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <XCircle className="h-4 w-4 text-maple shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Return */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold font-heading mb-4">How to Return</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Returning an item is easy. Follow these simple steps to process your return.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
              
              {returnSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex gap-6 mb-8 last:mb-0"
                >
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold shrink-0">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1 bg-cream rounded-xl p-6">
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Refund Timeline */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold font-heading mb-4">Refund Timeline</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Here&apos;s what to expect after you initiate a return.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-primary/5">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Status</th>
                  <th className="px-6 py-4 text-left font-semibold">Time</th>
                  <th className="px-6 py-4 text-left font-semibold hidden sm:table-cell">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {refundTimeline.map((item, index) => (
                  <tr key={index} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 font-medium">{item.status}</td>
                    <td className="px-6 py-4 text-primary font-medium">{item.time}</td>
                    <td className="px-6 py-4 text-muted-foreground text-sm hidden sm:table-cell">
                      {item.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Exchange Options */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold font-heading mb-4">Exchange Options</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Prefer to exchange? We offer flexible options to get you the perfect item.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            {exchangeInfo.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-cream rounded-xl p-6 text-center"
              >
                <CheckCircle2 className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{option.title}</h3>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Damaged Items */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-maple/5 border border-maple/20 rounded-2xl p-6 md:p-8">
            <div className="flex gap-4">
              <AlertTriangle className="h-6 w-6 text-maple shrink-0" />
              <div>
                <h3 className="font-semibold text-maple mb-2">Received a Damaged Item?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We&apos;re so sorry! Please contact us immediately with photos of the damage. 
                  We&apos;ll send a replacement right away at no cost, or issue a full refund if you prefer.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="tel:+905528875997"
                    className="inline-flex items-center gap-2 text-sm font-medium text-maple hover:underline"
                  >
                    <Phone className="h-4 w-4" />
                    +905528875997
                  </a>
                  <a
                    href="mailto:info@nizarrahme.com"
                    className="inline-flex items-center gap-2 text-sm font-medium text-maple hover:underline"
                  >
                    <Mail className="h-4 w-4" />
                    info@nizarrahme.com
                  </a>
                </div>
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
            <h2 className="text-3xl font-bold font-heading mb-4">Need Help With a Return?</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
              Our customer support team is here to help you with any questions or concerns about returns and exchanges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary rounded-lg hover:bg-white/90 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                Contact Support
              </Link>
              <a
                href="tel:+905528875997"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                <Phone className="h-5 w-5" />
                Call +905528875997
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
