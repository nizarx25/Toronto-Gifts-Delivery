'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  ChevronDown, 
  Truck, 
  Package, 
  CreditCard, 
  RefreshCw,
  Gift,
  Users,
  Clock,
  MessageCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

const faqCategories = [
  {
    icon: Truck,
    title: 'Delivery & Shipping',
    faqs: [
      {
        question: 'What areas do you deliver to?',
        answer: 'We deliver to all areas within Toronto and the Greater Toronto Area (GTA), including Scarborough, Etobicoke, North York, Mississauga, Brampton, Markham, Richmond Hill, Vaughan, and Pickering. Same-day delivery is available for orders placed before 12 PM within Toronto proper.'
      },
      {
        question: 'How much does delivery cost?',
        answer: 'Standard delivery within Toronto is $7.99. GTA delivery ranges from $9.99-$12.99 depending on distance. Orders over $75 qualify for FREE standard delivery. Same-day express delivery is available for an additional $5.'
      },
      {
        question: 'Can I schedule a specific delivery time?',
        answer: 'Yes! During checkout, you can select a preferred delivery window. We offer morning (9 AM - 12 PM), afternoon (12 PM - 5 PM), and evening (5 PM - 8 PM) delivery slots. For special timing requests, please contact us directly.'
      },
      {
        question: 'Do you offer same-day delivery?',
        answer: 'Yes! Same-day delivery is available for orders placed before 12 PM within Toronto. Orders placed after 12 PM will be delivered the next business day. Same-day delivery to GTA suburbs may require orders placed before 10 AM.'
      },
      {
        question: 'What happens if the recipient is not home?',
        answer: 'Our delivery partners will leave the package in a safe place at the door and send you a photo confirmation. For high-value items, we recommend selecting "Signature Required" at checkout. You can also add special delivery instructions during checkout.'
      }
    ]
  },
  {
    icon: Package,
    title: 'Products & Artisans',
    faqs: [
      {
        question: 'Are all products handmade by local artisans?',
        answer: 'Yes! Every product in our marketplace is handcrafted by talented local artisans based in Toronto and surrounding areas. We personally vet each artisan to ensure quality, sustainability, and authenticity. You can read about each artisan\'s story on their product pages.'
      },
      {
        question: 'Do products come with gift packaging?',
        answer: 'All orders include our signature eco-friendly gift packaging at no extra cost. We use zero-waste materials including recycled paper, biodegradable tissue, and reusable fabric wraps. Premium gift boxes are available for an additional $5.'
      },
      {
        question: 'Can I request custom or personalized items?',
        answer: 'Absolutely! Many of our artisans offer personalization options including engraving, custom colors, and made-to-order pieces. Look for the "Personalize" option on product pages or contact us for custom requests. Lead times vary by artisan (typically 3-7 days).'
      },
      {
        question: 'Are your products Halal-certified?',
        answer: 'We offer a curated selection of Halal-certified products, especially in our Gourmet Food category. Look for the Halal badge on product listings. Our food artisans source ingredients from certified suppliers, and we maintain strict handling protocols.'
      },
      {
        question: 'How do I know a product is truly sustainable?',
        answer: 'We have a rigorous sustainability criteria for all products: locally sourced materials, eco-friendly production processes, zero-waste packaging, and ethical labor practices. Each product page shows our sustainability certifications and the environmental impact of your purchase.'
      }
    ]
  },
  {
    icon: CreditCard,
    title: 'Orders & Payment',
    faqs: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, Mastercard, American Express), debit cards, Apple Pay, Google Pay, and PayPal. For corporate accounts, we also offer invoice billing with NET 30 terms.'
      },
      {
        question: 'How do I use a promo code?',
        answer: 'Enter your promo code in the "Promo Code" field during checkout. The discount will be applied to your order total before payment. Only one promo code can be used per order, and codes cannot be combined with other offers unless specified.'
      },
      {
        question: 'Can I modify or cancel my order?',
        answer: 'Orders can be modified or cancelled within 2 hours of placement. After that, orders enter processing and cannot be changed. Contact us immediately at +905528875997 if you need to make urgent changes.'
      },
      {
        question: 'Do you offer gift receipts?',
        answer: 'Yes! Select "Gift Receipt" at checkout to include a receipt without prices. You can also add a personalized gift message (up to 200 characters) that will be printed on premium card stock.'
      },
      {
        question: 'Is my payment information secure?',
        answer: 'Absolutely. We use industry-standard SSL encryption and never store your full credit card information. All payments are processed through PCI-compliant payment processors. Your security is our top priority.'
      }
    ]
  },
  {
    icon: RefreshCw,
    title: 'Returns & Exchanges',
    faqs: [
      {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day satisfaction guarantee on all non-perishable items. Returns are free within Toronto and GTA. For personalized items, we accept returns only if there\'s a defect or error on our part. Food items cannot be returned due to health regulations.'
      },
      {
        question: 'How do I initiate a return?',
        answer: 'Log into your account, go to Order History, and select "Return Item" next to the product. Choose your reason and preferred resolution (refund or exchange). You\'ll receive a prepaid shipping label via email within 24 hours.'
      },
      {
        question: 'When will I receive my refund?',
        answer: 'Refunds are processed within 3-5 business days of receiving the returned item. The refund will be credited to your original payment method. You\'ll receive an email confirmation once the refund is processed.'
      },
      {
        question: 'What if I receive a damaged item?',
        answer: 'We\'re so sorry if this happens! Contact us immediately at info@nizarrahme.com with photos of the damage. We\'ll send a replacement right away at no cost, or issue a full refund if you prefer.'
      },
      {
        question: 'Can I exchange for a different item?',
        answer: 'Yes! Select "Exchange" when initiating your return. You can exchange for any item of equal or lesser value. For items of greater value, you\'ll pay the difference during checkout.'
      }
    ]
  },
  {
    icon: Gift,
    title: 'Gift Services',
    faqs: [
      {
        question: 'Do you offer gift wrapping?',
        answer: 'Yes! All orders include complimentary eco-friendly gift wrapping. We offer three styles: Classic (kraft paper with twine), Luxe (fabric wrap with ribbon), and Premium (gift box with dried flowers). Premium wrapping is $5 extra.'
      },
      {
        question: 'Can I send a gift directly to the recipient?',
        answer: 'Absolutely! Enter the recipient\'s address as the shipping address during checkout. You can add a gift message and select "Hide Prices" for a gift receipt. We\'ll never include pricing information in packages sent as gifts.'
      },
      {
        question: 'What is the video message add-on?',
        answer: 'For $15, our artisans will record a personalized video message for your gift recipient. They\'ll share the story behind the product, how it was made, and a special message from you. The video is sent via email to you or directly to the recipient.'
      },
      {
        question: 'Tell me about the singing telegram service.',
        answer: 'Our singing telegram service is a unique add-on for $25. A local performer will deliver your gift while singing a personalized message. Available within Toronto only. Perfect for birthdays, anniversaries, and special celebrations!'
      },
      {
        question: 'Do you offer corporate gifting services?',
        answer: 'Yes! We specialize in corporate gifts for all occasions - client appreciation, employee recognition, holidays, and events. Visit our Corporate Gifts page for custom packages, bulk pricing, and branded gift options.'
      }
    ]
  },
  {
    icon: Users,
    title: 'Account & Membership',
    faqs: [
      {
        question: 'Do I need an account to shop?',
        answer: 'No, you can checkout as a guest. However, creating an account gives you benefits like order tracking, wishlist, faster checkout, exclusive offers, and early access to new products and sales.'
      },
      {
        question: 'What are the benefits of creating an account?',
        answer: 'Account holders enjoy: order history and easy reordering, wishlists and gift registries, exclusive member discounts, birthday rewards, early access to sales, faster checkout with saved addresses, and artisan updates for your favorite makers.'
      },
      {
        question: 'How do I reset my password?',
        answer: 'Click "Forgot Password" on the login page. Enter your email address, and we\'ll send a password reset link. The link expires in 24 hours for security. If you don\'t receive the email, check your spam folder or contact us.'
      },
      {
        question: 'Can I become an artisan seller?',
        answer: 'We\'re always looking for talented local artisans! If you\'re a Toronto-area maker with sustainable, handmade products, we\'d love to hear from you. Contact us at info@nizarrahme.com with your portfolio and product information.'
      },
      {
        question: 'How do I unsubscribe from emails?',
        answer: 'You can manage your email preferences in your account settings under "Notifications." You can also unsubscribe using the link at the bottom of any marketing email. We\'ll still send order-related emails for purchases you make.'
      }
    ]
  }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-start justify-between gap-4 text-left hover:text-primary transition-colors"
      >
        <span className="font-medium">{question}</span>
        <ChevronDown 
          className={cn(
            "h-5 w-5 shrink-0 transition-transform duration-300",
            isOpen && "rotate-180"
          )} 
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-4 text-muted-foreground">{answer}</p>
      </motion.div>
    </div>
  );
}

export default function FAQPage() {
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
            <MessageCircle className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Find answers to common questions about our products, delivery, returns, and more.
              Can&apos;t find what you&apos;re looking for? Contact us!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Contact Banner */}
      <section className="bg-white py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-center">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-sm">Response within 24 hours</span>
            </div>
            <a href="tel:+905528875997" className="flex items-center gap-2 text-primary hover:underline">
              <span className="font-medium">+905528875997</span>
            </a>
            <a href="mailto:info@nizarrahme.com" className="flex items-center gap-2 text-primary hover:underline">
              <span className="font-medium">info@nizarrahme.com</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                {/* Category Header */}
                <div className="bg-primary/5 px-6 py-4 flex items-center gap-3 border-b border-border">
                  <category.icon className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-semibold font-heading">{category.title}</h2>
                </div>
                
                {/* FAQs */}
                <div className="px-6">
                  {category.faqs.map((faq, faqIndex) => (
                    <FAQItem 
                      key={faqIndex} 
                      question={faq.question} 
                      answer={faq.answer} 
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold font-heading mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-8">
              Our friendly customer support team is here to help you with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                Contact Us
              </a>
              <a
                href="tel:+905528875997"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors"
              >
                <span>Call +905528875997</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
