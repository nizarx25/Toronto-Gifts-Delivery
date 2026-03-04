'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Truck, 
  Leaf, 
  Clock,
  CheckCircle,
  Minus,
  Plus,
  Share2,
  ChevronLeft,
  ChevronRight,
  Video,
  Music,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useCartStore } from '@/lib/cart-store';
import { products } from '@/data';
import { SingingTelegram, VideoMessage } from '@/types';
import { cn } from '@/lib/utils';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const product = products.find((p) => p.slug === slug);
  const addToCart = useCartStore((state) => state.addItem);
  
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  
  const [videoMessage, setVideoMessage] = useState<VideoMessage>({
    message: '',
    url: '',
  });
  const [singingTelegram, setSingingTelegram] = useState<SingingTelegram>({
    enabled: false,
    song: 'birthday',
    price: 15,
  });

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(
      product,
      quantity,
      videoMessage.message ? videoMessage : undefined,
      singingTelegram.enabled ? singingTelegram : undefined
    );
    router.push('/cart');
  };

  const totalPrice = product.price * quantity + (singingTelegram.enabled ? singingTelegram.price : 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-primary">Home</Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/shop" className="text-muted-foreground hover:text-primary">Shop</Link>
            <span className="text-muted-foreground">/</span>
            <Link href={`/shop?category=${product.category}`} className="text-muted-foreground hover:text-primary capitalize">
              {product.category}
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
              <motion.img
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === 0 ? product.images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === product.images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.comparePrice && (
                  <Badge className="bg-maple text-white">Sale</Badge>
                )}
                {product.isSameDay && (
                  <Badge className="bg-forest text-white flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Same Day
                  </Badge>
                )}
              </div>

              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors"
              >
                <Heart
                  className={cn(
                    'h-5 w-5 transition-colors',
                    isWishlisted ? 'fill-maple text-maple' : 'text-slate'
                  )}
                />
              </button>
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      'relative w-20 h-20 rounded-lg overflow-hidden shrink-0 transition-all',
                      currentImageIndex === index
                        ? 'ring-2 ring-primary ring-offset-2'
                        : 'opacity-60 hover:opacity-100'
                    )}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Artisan */}
            <div className="flex items-center gap-3">
              <img
                src={product.artisan.image}
                alt={product.artisan.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{product.artisan.name}</span>
                  {product.artisan.verified && (
                    <CheckCircle className="h-4 w-4 text-forest" />
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.artisan.location}
                </span>
              </div>
            </div>

            {/* Title & Rating */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 font-heading">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'h-5 w-5',
                        i < Math.floor(product.rating)
                          ? 'fill-gold text-gold'
                          : 'text-muted'
                      )}
                    />
                  ))}
                  <span className="ml-2 font-medium">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
              {product.comparePrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.comparePrice.toFixed(2)}
                  </span>
                  <Badge className="bg-maple text-white">
                    Save ${(product.comparePrice - product.price).toFixed(2)}
                  </Badge>
                </>
              )}
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {product.isSustainable && (
                <Badge variant="secondary" className="gap-1">
                  <Leaf className="h-3 w-3" />
                  Zero Waste
                </Badge>
              )}
              {product.isHalal && (
                <Badge className="bg-gold text-white">Halal</Badge>
              )}
              {product.inStock ? (
                <Badge className="bg-forest text-white">In Stock</Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>

            {/* Same Day Delivery Info */}
            {product.isSameDay && (
              <Card className="bg-forest/5 border-forest/20">
                <CardContent className="flex items-center gap-3 p-4">
                  <Truck className="h-5 w-5 text-forest" />
                  <div>
                    <p className="font-medium text-forest">Ships today if ordered before 2PM</p>
                    <p className="text-sm text-muted-foreground">Same-day delivery in Toronto & GTA</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quantity */}
            <div className="space-y-2">
              <Label>Quantity</Label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-muted transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-muted transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Video Message Add-on */}
            <Card className="border-2 border-dashed border-primary/30">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Video className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Add Personal Video Message</h4>
                    <p className="text-sm text-muted-foreground">Record or upload a video for your recipient</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="video-upload">Upload Video (optional)</Label>
                  <input
                    type="file"
                    id="video-upload"
                    accept="video/*"
                    className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                  
                  <div className="space-y-2">
                    <Label htmlFor="video-message">Message to include</Label>
                    <Textarea
                      id="video-message"
                      placeholder="Write a personal message..."
                      value={videoMessage.message}
                      onChange={(e) => setVideoMessage({ ...videoMessage, message: e.target.value })}
                      rows={2}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Singing Telegram Add-on */}
            <Card className="border-2 border-dashed border-gold/30">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                      <Music className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Add Singing Telegram</h4>
                      <p className="text-sm text-muted-foreground">A singer will perform at delivery (+$15)</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={singingTelegram.enabled}
                    onCheckedChange={(checked) =>
                      setSingingTelegram({ ...singingTelegram, enabled: checked as boolean })
                    }
                  />
                </div>

                <AnimatePresence>
                  {singingTelegram.enabled && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3"
                    >
                      <Label>Select a Song</Label>
                      <RadioGroup
                        value={singingTelegram.song}
                        onValueChange={(value) =>
                          setSingingTelegram({
                            ...singingTelegram,
                            song: value as SingingTelegram['song'],
                          })
                        }
                        className="grid grid-cols-2 gap-3"
                      >
                        {[
                          { value: 'birthday', label: '🎂 Happy Birthday' },
                          { value: 'toronto-anthem', label: '🏙️ Toronto Anthem' },
                          { value: 'love-song', label: '💕 Love Song' },
                          { value: 'custom', label: '✨ Custom Message' },
                        ].map((song) => (
                          <div key={song.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={song.value} id={song.value} />
                            <Label htmlFor={song.value} className="cursor-pointer text-sm">
                              {song.label}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>

                      {singingTelegram.song === 'custom' && (
                        <Textarea
                          placeholder="What should the singer say?"
                          value={singingTelegram.customMessage || ''}
                          onChange={(e) =>
                            setSingingTelegram({
                              ...singingTelegram,
                              customMessage: e.target.value,
                            })
                          }
                          rows={2}
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* Add to Cart */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 btn-shine"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart - ${totalPrice.toFixed(2)}
              </Button>

              <div className="flex gap-3">
                <Link href="/corporate" className="flex-1">
                  <Button variant="outline" size="lg" className="w-full">
                    Buy as Corporate Gift
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 rounded-lg bg-muted/50">
                <Truck className="h-5 w-5 mx-auto mb-1 text-primary" />
                <p className="text-xs font-medium">Free Shipping over $75</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <Leaf className="h-5 w-5 mx-auto mb-1 text-primary" />
                <p className="text-xs font-medium">Zero Waste</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <CheckCircle className="h-5 w-5 mx-auto mb-1 text-primary" />
                <p className="text-xs font-medium">Quality Guaranteed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger
                value="details"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Details
              </TabsTrigger>
              <TabsTrigger
                value="story"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Artisan Story
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Shipping & Returns
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="pt-6">
              <div className="prose max-w-none">
                <p className="text-lg text-muted-foreground">{product.description}</p>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">Features</h3>
                <ul className="space-y-2">
                  {product.tags.map((tag) => (
                    <li key={tag} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="capitalize">{tag.replace('-', ' ')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="story" className="pt-6">
              <Card className="bg-muted/30">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={product.artisan.image}
                      alt={product.artisan.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{product.artisan.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {product.artisan.specialty} • {product.artisan.location}
                      </p>
                      <p className="text-muted-foreground">{product.story}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shipping" className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Truck className="h-5 w-5 text-primary" />
                      Delivery Information
                    </h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <Clock className="h-4 w-4 text-primary mt-0.5" />
                        <span>Same-day delivery available in Toronto & GTA (order before 2PM)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Leaf className="h-4 w-4 text-primary mt-0.5" />
                        <span>All packages are shipped in zero-waste, recyclable materials</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                        <span>Free delivery on orders over $75</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Returns & Guarantees
                    </h3>
                    <ul className="space-y-3 text-sm">
                      <li>30-day satisfaction guarantee</li>
                      <li>Easy returns and exchanges</li>
                      <li>Full refund if product doesn&apos;t match description</li>
                      <li>Support local artisans with every purchase</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 font-heading">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter((p) => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/shop/${relatedProduct.slug}`}>
                  <Card className="overflow-hidden group product-card-hover h-full">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium line-clamp-1">{relatedProduct.name}</h3>
                      <p className="text-primary font-semibold">${relatedProduct.price.toFixed(2)}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
