import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/data/mockData"; // Keep formatPrice for now or move to utils
import logo from "@/assets/logo.png";
import Link from "next/link";
import { Product } from "@/types";

interface HeroSectionProps {
  featuredProduct?: Product;
}

export function HeroSection({ featuredProduct }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-muted ">
      <div className="container py-8 lg:py-20 mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              Premium Collection
            </div>

            <div className="flex items-center gap-4 mb-4">
              <img src={logo.src} alt="VM Skin Care" className="h-16 w-auto" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight">
              Discover Your
              <span className="text-primary block">Perfect Style</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg">
              Explore our curated collection of premium products. Find exactly
              what you need with quality you can trust.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-2xl font-bold text-foreground">10K+</div>
                <div className="text-sm text-muted-foreground">
                  Happy Customers
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">100%</div>
                <div className="text-sm text-muted-foreground">
                  Natural Ingredients
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">4.9</div>
                <div className="text-sm text-muted-foreground">
                  Customer Rating
                </div>
              </div>
            </div>
          </div>

          {/* Featured Product Card */}
          {featuredProduct && (
            <div
              className="relative animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              <div className="relative bg-card rounded-2xl shadow-xl overflow-hidden border border-primary/20">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={featuredProduct.images[0]}
                    alt={featuredProduct.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>

                {/* Product info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-foreground/90 via-foreground/60 to-transparent">
                  <div className="text-card space-y-2">
                    <span className="text-sm font-medium text-primary">
                      VM Skin Care
                    </span>
                    <h3 className="text-xl font-semibold">
                      {featuredProduct.name}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">
                        {formatPrice(featuredProduct.price)}
                      </span>
                      {featuredProduct.compareAtPrice && (
                        <span className="text-card/60 line-through">
                          {formatPrice(featuredProduct.compareAtPrice)}
                        </span>
                      )}
                    </div>
                    <Button variant="accent" size="lg" asChild className="mt-2">
                      <Link href={`/product-details/${featuredProduct.slug}`}>
                        View Product
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Discount badge */}
                {featuredProduct.compareAtPrice && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
                    {Math.round(
                      (1 -
                        featuredProduct.price /
                          featuredProduct.compareAtPrice) *
                        100
                    )}
                    % OFF
                  </div>
                )}
              </div>

              {/* Decorative elements */}
              <div className="absolute -z-10 top-8 -right-8 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -z-10 -bottom-8 -left-8 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
            </div>
          )}
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent -z-10" />
    </section>
  );
}
