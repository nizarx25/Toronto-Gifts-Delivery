'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  SlidersHorizontal, 
  Grid3X3, 
  List, 
  X,
  Leaf,
  Clock
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import ProductCard from '@/components/shared/ProductCard';
import { products, artisans } from '@/data';
import { ProductCategory, FilterState } from '@/types';
import { cn } from '@/lib/utils';

const categories: { value: ProductCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Categories' },
  { value: 'jewelry', label: 'Jewelry' },
  { value: 'home', label: 'Home Décor' },
  { value: 'food', label: 'Gourmet Food' },
  { value: 'wellness', label: 'Wellness' },
  { value: 'candles', label: 'Candles' },
  { value: 'art', label: 'Art Prints' },
  { value: 'accessories', label: 'Accessories' },
];

interface FilterPanelProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  activeFilterCount: number;
  clearAllFilters: () => void;
}

function FilterPanel({ filters, setFilters, activeFilterCount, clearAllFilters }: FilterPanelProps) {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilters({ ...filters, category: cat.value })}
              className={cn(
                'block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                filters.category === cat.value
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">
          Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
        </h3>
        <Slider
          value={filters.priceRange}
          onValueChange={(value) =>
            setFilters({ ...filters, priceRange: value as [number, number] })
          }
          max={250}
          step={5}
          className="w-full"
        />
      </div>

      {/* Artisans */}
      <div>
        <h3 className="font-semibold mb-3">Artisan</h3>
        <Select
          value={filters.artisan}
          onValueChange={(value) => setFilters({ ...filters, artisan: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Artisans" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Artisans</SelectItem>
            {artisans.map((artisan) => (
              <SelectItem key={artisan.id} value={artisan.id}>
                {artisan.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Toggles */}
      <div className="space-y-3">
        <h3 className="font-semibold">Special Filters</h3>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="halal"
            checked={filters.isHalal}
            onCheckedChange={(checked) =>
              setFilters({ ...filters, isHalal: checked as boolean })
            }
          />
          <Label htmlFor="halal" className="flex items-center gap-2 cursor-pointer">
            <Badge className="bg-gold text-white">Halal</Badge>
            <span className="text-sm">Halal Certified</span>
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="sustainable"
            checked={filters.isSustainable}
            onCheckedChange={(checked) =>
              setFilters({ ...filters, isSustainable: checked as boolean })
            }
          />
          <Label htmlFor="sustainable" className="flex items-center gap-2 cursor-pointer">
            <Leaf className="h-4 w-4 text-forest" />
            <span className="text-sm">Zero Waste</span>
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="sameDay"
            checked={filters.isSameDay}
            onCheckedChange={(checked) =>
              setFilters({ ...filters, isSameDay: checked as boolean })
            }
          />
          <Label htmlFor="sameDay" className="flex items-center gap-2 cursor-pointer">
            <Clock className="h-4 w-4 text-forest" />
            <span className="text-sm">Same-Day Delivery</span>
          </Label>
        </div>
      </div>

      {/* Clear Filters */}
      {activeFilterCount > 0 && (
        <Button variant="outline" onClick={clearAllFilters} className="w-full">
          Clear All Filters
        </Button>
      )}
    </div>
  );
}

export default function ShopPage() {
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    priceRange: [0, 250],
    artisan: 'all',
    isHalal: false,
    isSustainable: false,
    isSameDay: false,
    sortBy: 'best-match',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.artisan.name.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (filters.category !== 'all') {
      result = result.filter((p) => p.category === filters.category);
    }

    // Price filter
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Artisan filter
    if (filters.artisan !== 'all') {
      result = result.filter((p) => p.artisanId === filters.artisan);
    }

    // Halal filter
    if (filters.isHalal) {
      result = result.filter((p) => p.isHalal);
    }

    // Sustainable filter
    if (filters.isSustainable) {
      result = result.filter((p) => p.isSustainable);
    }

    // Same day filter
    if (filters.isSameDay) {
      result = result.filter((p) => p.isSameDay);
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      default:
        // Best match - by rating and reviews
        result.sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount);
    }

    return result;
  }, [filters, searchQuery]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.category !== 'all') count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 250) count++;
    if (filters.artisan !== 'all') count++;
    if (filters.isHalal) count++;
    if (filters.isSustainable) count++;
    if (filters.isSameDay) count++;
    return count;
  }, [filters]);

  const clearAllFilters = () => {
    setFilters({
      category: 'all',
      priceRange: [0, 250],
      artisan: 'all',
      isHalal: false,
      isSustainable: false,
      isSameDay: false,
      sortBy: 'best-match',
    });
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-forest py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-cream mb-4 font-heading">
              Toronto Artisan Marketplace
            </h1>
            <p className="text-cream/80 max-w-2xl mx-auto">
              Discover handcrafted gifts from verified Toronto artisans. Every purchase supports local creators.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search gifts, artisans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Sort */}
            <Select
              value={filters.sortBy}
              onValueChange={(value) =>
                setFilters({ ...filters, sortBy: value as FilterState['sortBy'] })
              }
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="best-match">Best Match</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="hidden md:flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'p-2 transition-colors',
                  viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                )}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'p-2 transition-colors',
                  viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                )}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Mobile Filters */}
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                  {activeFilterCount > 0 && (
                    <Badge className="ml-2 bg-primary text-primary-foreground">
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterPanel 
                    filters={filters} 
                    setFilters={setFilters} 
                    activeFilterCount={activeFilterCount}
                    clearAllFilters={clearAllFilters}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Active Filters */}
        <AnimatePresence>
          {activeFilterCount > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {filters.category !== 'all' && (
                  <Badge variant="secondary" className="gap-1">
                    {categories.find((c) => c.value === filters.category)?.label}
                    <button
                      onClick={() => setFilters({ ...filters, category: 'all' })}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {filters.artisan !== 'all' && (
                  <Badge variant="secondary" className="gap-1">
                    {artisans.find((a) => a.id === filters.artisan)?.name}
                    <button
                      onClick={() => setFilters({ ...filters, artisan: 'all' })}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {filters.isHalal && (
                  <Badge variant="secondary" className="gap-1">
                    Halal
                    <button
                      onClick={() => setFilters({ ...filters, isHalal: false })}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {filters.isSustainable && (
                  <Badge variant="secondary" className="gap-1">
                    Zero Waste
                    <button
                      onClick={() => setFilters({ ...filters, isSustainable: false })}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {filters.isSameDay && (
                  <Badge variant="secondary" className="gap-1">
                    Same-Day
                    <button
                      onClick={() => setFilters({ ...filters, isSameDay: false })}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 bg-card border rounded-lg p-6">
              <FilterPanel 
                filters={filters} 
                setFilters={setFilters} 
                activeFilterCount={activeFilterCount}
                clearAllFilters={clearAllFilters}
              />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results count */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                Showing <span className="font-medium text-foreground">{filteredProducts.length}</span> products
              </p>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div
                className={cn(
                  'grid gap-6',
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                    : 'grid-cols-1'
                )}
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search query
                </p>
                <Button variant="outline" onClick={clearAllFilters}>
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
