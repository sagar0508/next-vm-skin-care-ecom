"use client";

import { Heart, ShoppingBag, Star } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/data/mockData";
import { useCartStore } from "@/store/cartStore";
// import { useWishlistStore } from "@/store/wishlistStore";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCartStore();
  // const { toggleItem, isInWishlist } = useWishlistStore();
  // const isWishlisted = isInWishlist(product.id);
  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0],
      price: product.price,
      quantity: 1,
    });

    toast.success("Added to cart", {
      description: product.name,
    });
  };

  // const handleToggleWishlist = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   toggleItem(product.id);

  //   toast.success(
  //     isWishlisted ? "Removed from wishlist" : "Added to wishlist",
  //     {
  //       description: product.name,
  //     }
  //   );
  // };

  return (
    <Link
      href={`/product-details/${product.slug}`}
      className={cn(
        "group relative flex flex-col bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/20",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount > 0 && (
            <span className="px-2 py-1 text-xs font-semibold bg-accent text-accent-foreground rounded-md">
              {discount}% OFF
            </span>
          )}
          {product.featured && (
            <span className="px-2 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-md">
              Featured
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        {/* <button
          onClick={handleToggleWishlist}
          className={cn(
            "absolute top-3 right-3 p-2 rounded-full bg-card/90 backdrop-blur transition-all duration-200 hover:bg-card",
            isWishlisted && "text-accent"
          )}
        >
          <Heart className={cn("h-5 w-5", isWishlisted && "fill-current")} />
        </button> */}

        {/* Quick Add Button */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <Button
            onClick={handleAddToCart}
            variant="default"
            size="sm"
            className="w-full"
          >
            <ShoppingBag className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col">
        {/* Brand */}
        {product.brand && (
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {product.brand}
          </span>
        )}

        {/* Title */}
        <h3 className="mt-1 font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1">
          <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-success/10 text-success rounded text-xs font-semibold">
            <Star className="h-3 w-3 fill-current" />
            {product.rating}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto pt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
