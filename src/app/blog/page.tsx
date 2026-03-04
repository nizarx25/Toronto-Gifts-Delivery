'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/data';

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-forest py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Badge className="bg-gold text-slate mb-4">Our Stories</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-cream mb-4 font-heading">
              Artisan Stories
            </h1>
            <p className="text-cream/80 max-w-2xl mx-auto text-lg">
              Discover the passionate makers behind your gifts. Each artisan has a unique story of craft, community, and Toronto pride.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-6 font-heading">Featured Story</h2>
          <Card className="overflow-hidden group">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  {featuredPost.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag.replace('-', ' ')}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 font-heading group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h3>
                <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={featuredPost.artisan.image}
                    alt={featuredPost.artisan.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{featuredPost.artisan.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      {new Date(featuredPost.publishedAt).toLocaleDateString('en-CA', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <Button className="w-fit bg-primary hover:bg-primary/90">
                  Read Full Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </div>
          </Card>
        </motion.div>

        {/* Other Posts */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 font-heading">Latest Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      {post.tags.slice(0, 1).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag.replace('-', ' ')}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3">
                      <img
                        src={post.artisan.image}
                        alt={post.artisan.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium">{post.artisan.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(post.publishedAt).toLocaleDateString('en-CA', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Meet the Artisans CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1200&h=400&fit=crop"
              alt="Artisan workshop"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-forest/95 to-forest/80" />
          </div>
          <div className="relative z-10 py-16 px-8 md:px-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4 font-heading">
              Meet Our Artisans
            </h2>
            <p className="text-cream/80 mb-8 max-w-xl mx-auto">
              Every gift tells a story. Learn more about the talented makers behind our curated collection.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/about">
                <Button size="lg" className="bg-gold hover:bg-gold/90 text-slate">
                  Meet All Artisans
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/shop">
                <Button size="lg" variant="outline" className="border-cream text-cream hover:bg-cream/10">
                  Shop Their Work
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Newsletter */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold mb-4 font-heading">Stay Inspired</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Get artisan stories, new product launches, and exclusive offers delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
