
import { ArrowRight } from 'lucide-react';
import { Product } from '@/types';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface FeaturedProductsProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  viewAllLink?: string;
}

export function FeaturedProducts({
  products,
  title = "Featured Products",
  subtitle = "Handpicked products just for you",
  viewAllLink = "/products"
}: FeaturedProductsProps) {
  return (
    <section className="px-4 py-16 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-display font-bold text-foreground">
              {title}
            </h2>
            <p className="mt-2 text-muted-foreground">{subtitle}</p>
          </div>
          <Button variant="ghost" asChild className="self-start sm:self-auto">
            <Link href={viewAllLink} className="gap-2">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.slice(0, 8).map((product, index) => (
            <div
              key={product.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
