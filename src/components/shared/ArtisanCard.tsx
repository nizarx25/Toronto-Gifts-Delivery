'use client';

import { motion } from 'framer-motion';
import { MapPin, CheckCircle, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Artisan } from '@/types';

interface ArtisanCardProps {
  artisan: Artisan;
  index?: number;
  compact?: boolean;
}

export default function ArtisanCard({ artisan, index = 0, compact = false }: ArtisanCardProps) {
  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
        className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border hover:shadow-md transition-shadow"
      >
        <img
          src={artisan.image}
          alt={artisan.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="flex items-center gap-1">
            <span className="font-medium text-sm">{artisan.name}</span>
            {artisan.verified && (
              <CheckCircle className="h-4 w-4 text-forest" />
            )}
          </div>
          <span className="text-xs text-muted-foreground">{artisan.specialty}</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="overflow-hidden group hover:shadow-lg transition-shadow bg-card border-border">
        <div className="relative h-48 overflow-hidden">
          <img
            src={artisan.image}
            alt={artisan.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white font-heading">{artisan.name}</h3>
              {artisan.verified && (
                <Badge className="bg-forest text-white">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Location & Since */}
          <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{artisan.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="h-4 w-4" />
              <span>Since {artisan.since}</span>
            </div>
          </div>

          {/* Specialty */}
          <Badge variant="secondary" className="mb-3">
            {artisan.specialty}
          </Badge>

          {/* Bio */}
          <p className="text-sm text-muted-foreground line-clamp-3">
            {artisan.bio}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
