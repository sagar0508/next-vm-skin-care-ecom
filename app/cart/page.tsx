"use client";
import { useState } from "react";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/data/mockData";
import { toast } from "sonner";
import Link from "next/link";

const Cart = () => {
  const { cart, updateQuantity, removeItem, applyCoupon, removeCoupon } =
    useCartStore();
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;

    setIsApplyingCoupon(true);

    // Simulate coupon validation
    setTimeout(() => {
      if (couponCode.toUpperCase() === "SAVE10") {
        const discount = cart.subtotal * 0.1;
        applyCoupon(couponCode.toUpperCase(), discount);
        toast.success("Coupon applied!", {
          description: "10% discount applied",
        });
      } else if (couponCode.toUpperCase() === "FLAT500") {
        applyCoupon(couponCode.toUpperCase(), 500);
        toast.success("Coupon applied!", {
          description: "₹500 discount applied",
        });
      } else {
        toast.error("Invalid coupon code");
      }
      setIsApplyingCoupon(false);
    }, 500);
  };

  if (cart.items.length === 0) {
    return (
      <Layout>
        <div className="container py-20 mx-auto max-w-7xl">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Your cart is empty
            </h1>
            <p className="mt-2 text-muted-foreground">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button variant="hero" size="lg" className="mt-6" asChild>
              <Link href="/products">
                Start Shopping
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 mx-auto max-w-7xl px-4">
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-8">
          Shopping Cart ({cart.items.length} items)
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 bg-card border border-border rounded-xl"
              >
                {/* Image */}
                <Link
                  href={`/product-details/${item.slug}`}
                  className="flex-shrink-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 sm:w-24 h-20 sm:h-24 object-cover rounded-lg"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/product-details/${item.slug}`}
                    className="text-sm sm:text-base font-semibold text-foreground hover:text-primary transition-colors line-clamp-2"
                  >
                    {item.name}
                  </Link>

                  {item.variant && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {Object.entries(item.variant)
                        .map(([k, v]) => `${k}: ${v}`)
                        .join(", ")}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity */}
                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-2 hover:bg-muted transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-4 sm:w-10 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-2 hover:bg-muted transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Price */}
                    <span className="font-bold text-foreground text-sm sm:text-base">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => {
                    removeItem(item.id);
                    toast.success("Item removed from cart");
                  }}
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors self-start"
                >
                  <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border border-border rounded-xl p-6 space-y-6">
              <h2 className="text-lg font-semibold text-foreground">
                Order Summary
              </h2>

              {/* Coupon */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Have a coupon?
                </label>
                {cart.couponCode ? (
                  <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-success" />
                      <span className="text-sm font-medium text-success">
                        {cart.couponCode}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        removeCoupon();
                        setCouponCode("");
                        toast.success("Coupon removed");
                      }}
                      className="text-sm text-muted-foreground hover:text-destructive"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <Button
                      variant="secondary"
                      onClick={handleApplyCoupon}
                      disabled={isApplyingCoupon}
                    >
                      Apply
                    </Button>
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  Try: SAVE10 or FLAT500
                </p>
              </div>

              {/* Totals */}
              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    Subtotal
                  </span>
                  <span className="font-medium text-xs sm:text-sm">
                    {formatPrice(cart.subtotal)}
                  </span>
                </div>
                {cart.discount > 0 && (
                  <div className="text-xs sm:text-sm flex justify-between text-sm text-success">
                    <span>Discount</span>
                    <span className="text-xs sm:text-sm">
                      -{formatPrice(cart.discount)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    Tax (GST 18%)
                  </span>
                  <span className="font-medium text-xs sm:text-sm">
                    {formatPrice(cart.tax)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    Shipping
                  </span>
                  <span className="font-medium text-xs sm:text-sm">
                    {cart.subtotal >= 999
                      ? "FREE"
                      : formatPrice(cart.shipping || 99)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-border">
                <span className="text-lg font-semibold ">Total</span>
                <span className="text-xl font-bold text-foreground">
                  {formatPrice(cart.total)}
                </span>
              </div>

              <Button variant="hero" size="xl" className="w-full" asChild>
                <Link href="/checkout" className="text-xs sm:text-sm">
                  Proceed to Checkout
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Secure checkout powered by Razorpay
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
