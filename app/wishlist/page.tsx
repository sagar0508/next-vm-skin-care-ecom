"use client";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { products, formatPrice } from "@/data/mockData";
import { toast } from "sonner";
import Link from "next/link";

const Wishlist = () => {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const { addItem } = useCartStore();

  const wishlistProducts = products.filter((p) => items.includes(p.id));

  const handleAddToCart = (product: (typeof products)[0]) => {
    addItem({
      productId: product.id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      quantity: 1,
      slug: product.slug,
    });
    toast.success("Added to cart", { description: product.name });
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container px-4 py-20 mx-auto max-w-7xl">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Heart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Your wishlist is empty
            </h1>
            <p className="mt-2 text-muted-foreground">
              Save items you love to your wishlist and shop later.
            </p>
            <Button variant="hero" size="lg" className="mt-6" asChild>
              <Link href="/products">Explore Products</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              My Wishlist
            </h1>
            <p className="text-muted-foreground mt-1">
              {items.length} items saved
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              clearWishlist();
              toast.success("Wishlist cleared");
            }}
            className="text-destructive"
          >
            Clear All
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <div
              key={product.id}
              className="bg-card border border-border rounded-xl overflow-hidden group"
            >
              {/* Image */}
              <Link
                href={`/product/${product.slug}`}
                className="relative block aspect-square overflow-hidden"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.compareAtPrice && (
                  <span className="absolute top-3 left-3 px-2 py-1 text-xs font-semibold bg-accent text-accent-foreground rounded-md">
                    {Math.round(
                      (1 - product.price / product.compareAtPrice) * 100
                    )}
                    % OFF
                  </span>
                )}
              </Link>

              {/* Content */}
              <div className="p-4">
                {product.brand && (
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {product.brand}
                  </span>
                )}
                <Link href={`/product/${product.slug}`}>
                  <h3 className="mt-1 font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-lg font-bold text-foreground">
                    {formatPrice(product.price)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-4 flex gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      removeItem(product.id);
                      toast.success("Removed from wishlist");
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Wishlist;
