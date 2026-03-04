'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';

export default function AIRecommenderButton() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute bottom-16 right-0 bg-card border border-border rounded-lg p-4 shadow-lg w-64"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="text-sm font-medium mb-1">Need gift ideas? 🎁</p>
            <p className="text-xs text-muted-foreground mb-3">
              Let our AI find the perfect gift in seconds!
            </p>
            <Link href="/recommend">
              <Button size="sm" className="w-full bg-gold hover:bg-gold/90 text-slate">
                Try AI Recommender
              </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <Link href="/recommend">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <Button
            size="lg"
            className="rounded-full h-14 w-14 bg-gold hover:bg-gold/90 text-slate shadow-lg btn-shine"
          >
            <Sparkles className="h-6 w-6" />
          </Button>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-1 -right-1 h-4 w-4 bg-forest rounded-full flex items-center justify-center"
          >
            <span className="text-[8px] text-white font-bold">AI</span>
          </motion.span>
        </motion.div>
      </Link>
    </div>
  );
}
