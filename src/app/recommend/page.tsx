'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  RefreshCw,
  Heart,
  Gift,
  Users,
  Calendar,
  DollarSign,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import ProductCard from '@/components/shared/ProductCard';
import { products } from '@/data';
import { QuizAnswer } from '@/types';
import { cn } from '@/lib/utils';

const quizSteps = [
  {
    id: 'recipient',
    question: 'Who is this gift for?',
    icon: Users,
    options: [
      { value: 'partner', label: 'Partner / Spouse', emoji: '❤️' },
      { value: 'friend', label: 'Friend', emoji: '🤝' },
      { value: 'parent', label: 'Parent', emoji: '👨‍👩‍👧' },
      { value: 'colleague', label: 'Colleague', emoji: '💼' },
      { value: 'child', label: 'Child / Teen', emoji: '👶' },
      { value: 'other', label: 'Someone Special', emoji: '✨' },
    ],
  },
  {
    id: 'occasion',
    question: 'What\'s the occasion?',
    icon: Calendar,
    options: [
      { value: 'birthday', label: 'Birthday', emoji: '🎂' },
      { value: 'anniversary', label: 'Anniversary', emoji: '💕' },
      { value: 'holiday', label: 'Holiday / Seasonal', emoji: '🎄' },
      { value: 'thank-you', label: 'Thank You', emoji: '🙏' },
      { value: 'congrats', label: 'Congratulations', emoji: '🎉' },
      { value: 'just-because', label: 'Just Because', emoji: '🎁' },
    ],
  },
  {
    id: 'budget',
    question: 'What\'s your budget?',
    icon: DollarSign,
    options: [
      { value: 'under-50', label: 'Under $50', emoji: '💵' },
      { value: '50-100', label: '$50 - $100', emoji: '💰' },
      { value: '100-200', label: '$100 - $200', emoji: '💎' },
      { value: 'over-200', label: '$200+', emoji: '👑' },
    ],
  },
  {
    id: 'interests',
    question: 'What are their interests? (Select all that apply)',
    icon: Heart,
    multiSelect: true,
    options: [
      { value: 'wellness', label: 'Wellness & Self-care', emoji: '🧘' },
      { value: 'home', label: 'Home & Living', emoji: '🏠' },
      { value: 'food', label: 'Food & Gourmet', emoji: '🍯' },
      { value: 'art', label: 'Art & Design', emoji: '🎨' },
      { value: 'jewelry', label: 'Jewelry & Accessories', emoji: '💍' },
      { value: 'sustainable', label: 'Eco-friendly', emoji: '🌿' },
    ],
  },
];

export default function AIRecommenderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswer>>({});
  const [showResults, setShowResults] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState<typeof products>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const step = quizSteps[currentStep];
  const progress = ((currentStep + 1) / quizSteps.length) * 100;

  const handleSelect = (value: string) => {
    if (step.multiSelect) {
      const currentValues = (answers[step.id as keyof QuizAnswer] as string[]) || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      setAnswers({ ...answers, [step.id]: newValues });
    } else {
      setAnswers({ ...answers, [step.id]: value });
    }
  };

  const isSelected = (value: string) => {
    const answer = answers[step.id as keyof QuizAnswer];
    if (Array.isArray(answer)) {
      return answer.includes(value);
    }
    return answer === value;
  };

  const canProceed = () => {
    const answer = answers[step.id as keyof QuizAnswer];
    if (step.multiSelect) {
      return Array.isArray(answer) && answer.length > 0;
    }
    return !!answer;
  };

  const handleNext = () => {
    if (currentStep < quizSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateRecommendations();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateRecommendations = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Fake AI logic - filter products based on answers
    let filtered = [...products];
    
    const budget = answers.budget as string;
    if (budget) {
      const budgetRanges: Record<string, [number, number]> = {
        'under-50': [0, 50],
        '50-100': [50, 100],
        '100-200': [100, 200],
        'over-200': [200, 1000],
      };
      const [min, max] = budgetRanges[budget] || [0, 1000];
      filtered = filtered.filter((p) => p.price >= min && p.price <= max);
    }

    const interests = answers.interests as string[];
    if (interests && interests.length > 0) {
      const categoryMap: Record<string, string[]> = {
        wellness: ['wellness'],
        home: ['home', 'candles'],
        food: ['food'],
        art: ['art'],
        jewelry: ['jewelry', 'accessories'],
        sustainable: [], // Will filter by isSustainable
      };
      
      const categories = interests.flatMap((i) => categoryMap[i] || []);
      filtered = filtered.filter(
        (p) =>
          categories.includes(p.category) ||
          (interests.includes('sustainable') && p.isSustainable)
      );
    }

    // Sort by rating and take top 6
    filtered = filtered.sort((a, b) => b.rating - a.rating).slice(0, 6);
    
    // If not enough products, add some random ones
    if (filtered.length < 6) {
      const remaining = products
        .filter((p) => !filtered.includes(p))
        .sort(() => Math.random() - 0.5)
        .slice(0, 6 - filtered.length);
      filtered = [...filtered, ...remaining];
    }

    setRecommendedProducts(filtered);
    setIsAnalyzing(false);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
    setRecommendedProducts([]);
  };

  // Generate "Why this gift?" explanations
  const getGiftReason = (product: typeof products[0], index: number) => {
    const reasons = [
      `Perfect for a ${answers.occasion?.replace('-', ' ')} gift! This handcrafted ${product.category} item from ${product.artisan.name} shows you care.`,
      `${product.artisan.name}'s work is highly rated (${product.rating}⭐) and aligns with ${answers.recipient}'s interests.`,
      `This ${product.isSustainable ? 'zero-waste, eco-friendly' : 'beautiful'} piece is ideal for someone who appreciates ${product.category}.`,
      `A Toronto-made treasure that supports local artisans. ${product.isSameDay ? 'Available for same-day delivery!' : ''}`,
      `Rated ${product.rating} stars by ${product.reviewCount} happy customers. A thoughtful choice for ${answers.occasion?.replace('-', ' ')}.`,
      `${product.artisan.name} from ${product.artisan.location} creates stunning ${product.category}. Your ${answers.recipient} will love this!`,
    ];
    return reasons[index % reasons.length];
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-forest to-primary py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-8 w-8 text-gold" />
              <Badge className="bg-gold text-slate text-sm">AI-Powered</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-cream mb-4 font-heading">
              Find the Perfect Toronto Gift
            </h1>
            <p className="text-cream/80 max-w-2xl mx-auto">
              Answer a few quick questions and our AI will recommend personalized gifts from local Toronto artisans.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto"
            >
              {/* Progress */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    Step {currentStep + 1} of {quizSteps.length}
                  </span>
                  <span className="text-sm font-medium">{Math.round(progress)}% complete</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Question Card */}
              <Card className="overflow-hidden">
                <CardContent className="p-8">
                  {/* Question Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <step.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold font-heading">{step.question}</h2>
                  </div>

                  {/* Options */}
                  <div className={cn(
                    'grid gap-3',
                    step.multiSelect ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'
                  )}>
                    {step.options.map((option) => (
                      <motion.button
                        key={option.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelect(option.value)}
                        className={cn(
                          'p-4 rounded-xl border-2 text-left transition-all',
                          isSelected(option.value)
                            ? 'border-primary bg-primary/5 shadow-md'
                            : 'border-border hover:border-primary/50 hover:bg-muted/50'
                        )}
                      >
                        <span className="text-2xl mb-2 block">{option.emoji}</span>
                        <span className="font-medium text-sm">{option.label}</span>
                        {isSelected(option.value) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="mt-2"
                          >
                            <Badge className="bg-primary text-primary-foreground text-xs">
                              Selected
                            </Badge>
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>

                  {/* Multi-select hint */}
                  {step.multiSelect && (
                    <p className="text-sm text-muted-foreground mt-4 text-center">
                      Select one or more interests
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="bg-primary hover:bg-primary/90"
                >
                  {currentStep === quizSteps.length - 1 ? (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Get Recommendations
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          ) : isAnalyzing ? (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="inline-block mb-6"
              >
                <Sparkles className="h-16 w-16 text-primary" />
              </motion.div>
              <h2 className="text-2xl font-bold mb-4 font-heading">Analyzing Your Preferences...</h2>
              <p className="text-muted-foreground">
                Our AI is finding the perfect Toronto-made gifts for you
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Results Header */}
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center gap-2 mb-4"
                >
                  <Gift className="h-8 w-8 text-primary" />
                  <Badge className="bg-gold text-slate">Personalized for You</Badge>
                </motion.div>
                <h2 className="text-3xl font-bold mb-4 font-heading">
                  Your Perfect Toronto Gifts
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Based on your answers, we found {recommendedProducts.length} handcrafted gifts from local artisans that are perfect for your {answers.occasion?.replace('-', ' ')}.
                </p>
                <Button variant="outline" onClick={resetQuiz} className="mt-6">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Start Over
                </Button>
              </div>

              {/* Product Recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden h-full">
                      <ProductCard product={product} index={0} />
                      <div className="px-4 pb-4">
                        <div className="bg-muted/50 rounded-lg p-3 mt-2">
                          <div className="flex items-start gap-2">
                            <Sparkles className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                            <p className="text-sm text-muted-foreground">
                              {getGiftReason(product, index)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <div className="text-center mt-12">
                <p className="text-muted-foreground mb-4">
                  Not quite right? Let us help you find more options.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="outline" onClick={resetQuiz}>
                    Try Different Answers
                  </Button>
                  <Link href="/shop">
                    <Button className="bg-primary hover:bg-primary/90">
                      Browse All Products
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
