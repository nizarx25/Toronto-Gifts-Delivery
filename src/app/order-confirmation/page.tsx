import { Suspense } from 'react';
import OrderConfirmationClient from './client';

// Force dynamic rendering to prevent pre-render issues with useSearchParams
export const dynamic = 'force-dynamic';

// Loading fallback component
function OrderConfirmationSkeleton() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto animate-pulse">
        <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-6" />
        <div className="h-8 bg-muted rounded w-1/2 mx-auto mb-4" />
        <div className="h-4 bg-muted rounded w-1/3 mx-auto mb-8" />
        <div className="h-96 bg-muted rounded-lg" />
      </div>
    </div>
  );
}

// Main page component (Server Component)
export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<OrderConfirmationSkeleton />}>
      <OrderConfirmationClient />
    </Suspense>
  );
}