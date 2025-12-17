"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  Minus,
  Plus,
  Share2,
  Truck,
  Shield,
  RefreshCw,
  Star,
  ChevronRight,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { products as mockProducts, formatPrice } from "@/data/mockData";
import { useCartStore } from "@/store/cartStore";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Product, Review } from "@/types";

interface ProductDetailClientProps {
  product: Product;
  reviews: Review[];
}

export const ProductDetailClient = ({
  product,
  reviews,
}: ProductDetailClientProps) => {
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<
    Record<string, string>
  >({});

  const { addItem } = useCartStore();

  if (!product) {
    return (
      <Layout>
        <div className="container px-4 py-20 text-center mx-auto max-w-7xl">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <Link
            href="/products"
            className="text-primary hover:underline mt-4 inline-block"
          >
            Browse all products
          </Link>
        </div>
      </Layout>
    );
  }

  const productReviews = reviews;
  const relatedProducts = mockProducts
    .filter((p) => p.category.id === product.category.id && p.id !== product.id)
    .slice(0, 4);

  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0],
      price: product.price,
      quantity,
      variant:
        Object.keys(selectedVariant).length > 0 ? selectedVariant : undefined,
    });
    toast.success("Added to cart!", {
      description: `${quantity}x ${product.name}`,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-muted/50 border-b border-border">
        <div className="container py-3 mx-auto max-w-7xl px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href={`/category/${product.category.slug}`}
              className="hover:text-foreground"
            >
              {product.category.name}
            </Link>
            {product.subcategory && (
              <>
                <ChevronRight className="h-4 w-4" />
                <Link
                  href={`/category/${product.category.slug}/${product.subcategory.slug}`}
                  className="hover:text-foreground"
                >
                  {product.subcategory.name}
                </Link>
              </>
            )}
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="container py-8 mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <ProductGallery images={product.images} name={product.name} />

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand & Title */}
            <div>
              {product.brand && (
                <Link
                  href={`/brand/${product.brand.toLowerCase()}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  {product.brand}
                </Link>
              )}
              <h1 className="mt-2 text-2xl md:text-3xl font-display font-bold text-foreground">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < Math.floor(product.rating.rate)
                        ? "fill-warning text-warning"
                        : "text-muted"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating.rate} ({product.rating.count.toLocaleString()}{" "}
                reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                  <span className="px-2 py-1 bg-accent/10 text-accent text-sm font-semibold rounded">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-muted-foreground">{product.shortDescription}</p>

            {/* Variants */}
            {Object.entries(product.attributes).map(([key, values]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-foreground mb-2 capitalize">
                  {key}:{" "}
                  {selectedVariant[key] && (
                    <span className="text-primary">{selectedVariant[key]}</span>
                  )}
                </label>
                <div className="flex flex-wrap gap-2">
                  {values.map((value) => (
                    <button
                      key={value}
                      onClick={() =>
                        setSelectedVariant({ ...selectedVariant, [key]: value })
                      }
                      className={cn(
                        "px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all",
                        selectedVariant[key] === value
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Quantity
              </label>
              <div className="inline-flex items-center border border-border rounded-lg">
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

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="default"
                size="xl"
                className="flex-1"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <Button
                variant="accent"
                size="xl"
                className="flex-1"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </div>

            {/* Wishlist & Share */}
            <div className="flex gap-4">
              <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                <Share2 className="h-5 w-5" />
                Share
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="flex flex-col items-center text-center p-3">
                <Truck className="h-6 w-6 text-primary mb-2" />
                <span className="text-xs text-muted-foreground">
                  Free Shipping
                </span>
              </div>
              <div className="flex flex-col items-center text-center p-3">
                <Shield className="h-6 w-6 text-primary mb-2" />
                <span className="text-xs text-muted-foreground">
                  Secure Payment
                </span>
              </div>
              <div className="flex flex-col items-center text-center p-3">
                <RefreshCw className="h-6 w-6 text-primary mb-2" />
                <span className="text-xs text-muted-foreground">
                  Easy Returns
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Description & Reviews */}
        <div className="mt-16 space-y-12">
          {/* Description */}
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              Product Description
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Reviews */}
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">
              Customer Reviews ({product.reviewCount})
            </h2>
            <div className="space-y-6">
              {productReviews.length > 0 ? (
                productReviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-6 bg-card border border-border rounded-xl"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">
                            {review.userName}
                          </span>
                          {review.verified && (
                            <span className="px-2 py-0.5 bg-success/10 text-success text-xs rounded">
                              Verified
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-4 w-4",
                                i < review.rating
                                  ? "fill-warning text-warning"
                                  : "text-muted"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {review.createdAt}
                      </span>
                    </div>
                    <h4 className="mt-3 font-semibold text-foreground">
                      {review.title}
                    </h4>
                    <p className="mt-2 text-muted-foreground">
                      {review.content}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">
                  No reviews yet. Be the first to review!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
