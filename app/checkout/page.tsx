"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  MapPin,
  CreditCard,
  Truck,
  CheckCircle,
  Lock,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/data/mockData";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type CheckoutStep = "address" | "shipping" | "payment";

const steps: {
  id: CheckoutStep;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "address", label: "Address", icon: MapPin },
  { id: "shipping", label: "Shipping", icon: Truck },
  { id: "payment", label: "Payment", icon: CreditCard },
];

const shippingOptions = [
  {
    id: "standard",
    name: "Standard Delivery",
    description: "5-7 business days",
    price: 0,
  },
  {
    id: "express",
    name: "Express Delivery",
    description: "2-3 business days",
    price: 149,
  },
  {
    id: "overnight",
    name: "Overnight Delivery",
    description: "Next business day",
    price: 299,
  },
];

const Checkout = () => {
  const router = useRouter();
  const { cart, setShipping, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("address");
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [isProcessing, setIsProcessing] = useState(false);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !address.name ||
      !address.phone ||
      !address.line1 ||
      !address.city ||
      !address.state ||
      !address.postalCode
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    setCurrentStep("shipping");
  };

  const handleShippingSubmit = () => {
    const option = shippingOptions.find((o) => o.id === selectedShipping);
    if (option) {
      setShipping(option.price);
    }
    setCurrentStep("payment");
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simulate Razorpay payment
    toast.info("Redirecting to payment...", {
      description: "This is a demo - no actual payment will be processed",
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate successful payment
    clearCart();
    toast.success("Order placed successfully!", {
      description: "You will receive a confirmation on WhatsApp",
    });

    router.push("/order-success");
    setIsProcessing(false);
  };

  if (cart.items.length === 0) {
    router.push("/cart");
    return null;
  }

  return (
    <Layout>
      <div className="container py-8 mx-auto max-w-7xl px-4">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-10">
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = step.id === currentStep;

            return (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors",
                      isCompleted &&
                        "bg-primary border-primary text-primary-foreground",
                      isCurrent && "border-primary text-primary",
                      !isCompleted &&
                        !isCurrent &&
                        "border-border text-muted-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <step.icon className="h-5 w-5" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "hidden sm:block text-sm font-medium",
                      isCurrent ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="h-5 w-5 mx-4 text-muted-foreground" />
                )}
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            {currentStep === "address" && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Shipping Address
                </h2>
                <form onSubmit={handleAddressSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={address.name}
                        onChange={(e) =>
                          setAddress({ ...address, name: e.target.value })
                        }
                        className="w-full h-11 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={address.phone}
                        onChange={(e) =>
                          setAddress({ ...address, phone: e.target.value })
                        }
                        className="w-full h-11 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Address Line 1 *
                    </label>
                    <input
                      type="text"
                      value={address.line1}
                      onChange={(e) =>
                        setAddress({ ...address, line1: e.target.value })
                      }
                      placeholder="House no., Building, Street"
                      className="w-full h-11 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      value={address.line2}
                      onChange={(e) =>
                        setAddress({ ...address, line2: e.target.value })
                      }
                      placeholder="Landmark, Area (Optional)"
                      className="w-full h-11 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        City *
                      </label>
                      <input
                        type="text"
                        value={address.city}
                        onChange={(e) =>
                          setAddress({ ...address, city: e.target.value })
                        }
                        className="w-full h-11 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        State *
                      </label>
                      <input
                        type="text"
                        value={address.state}
                        onChange={(e) =>
                          setAddress({ ...address, state: e.target.value })
                        }
                        className="w-full h-11 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        value={address.postalCode}
                        onChange={(e) =>
                          setAddress({ ...address, postalCode: e.target.value })
                        }
                        className="w-full h-11 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full mt-6"
                  >
                    Continue to Shipping
                  </Button>
                </form>
              </div>
            )}

            {currentStep === "shipping" && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Shipping Method
                </h2>
                <div className="space-y-3">
                  {shippingOptions.map((option) => (
                    <label
                      key={option.id}
                      className={cn(
                        "flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all",
                        selectedShipping === option.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          value={option.id}
                          checked={selectedShipping === option.id}
                          onChange={(e) => setSelectedShipping(e.target.value)}
                          className="w-5 h-5 text-primary"
                        />
                        <div>
                          <span className="font-medium text-foreground">
                            {option.name}
                          </span>
                          <p className="text-sm text-muted-foreground">
                            {option.description}
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold text-foreground">
                        {option.price === 0
                          ? "FREE"
                          : formatPrice(option.price)}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setCurrentStep("address")}
                  >
                    Back
                  </Button>
                  <Button
                    variant="hero"
                    size="lg"
                    className="flex-1"
                    onClick={handleShippingSubmit}
                  >
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {currentStep === "payment" && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Payment
                </h2>

                <div className="p-6 bg-muted/50 rounded-xl text-center">
                  <Lock className="h-12 w-12 mx-auto text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-foreground">
                    Secure Payment with Razorpay
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    You will be redirected to Razorpay's secure payment gateway
                    to complete your purchase. We accept UPI, Cards, Net
                    Banking, and Wallets.
                  </p>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setCurrentStep("shipping")}
                  >
                    Back
                  </Button>
                  <Button
                    variant="accent"
                    size="lg"
                    className="flex-1"
                    onClick={handlePayment}
                    disabled={isProcessing}
                  >
                    {isProcessing
                      ? "Processing..."
                      : `Pay ${formatPrice(cart.total)}`}
                  </Button>
                </div>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  By placing your order, you agree to our Terms of Service and
                  Privacy Policy
                </p>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border border-border rounded-xl p-6 space-y-6">
              <h2 className="text-lg font-semibold text-foreground">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-4 max-h-60 overflow-y-auto">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">
                    {formatPrice(cart.subtotal)}
                  </span>
                </div>
                {cart.discount > 0 && (
                  <div className="flex justify-between text-sm text-success">
                    <span>Discount</span>
                    <span>-{formatPrice(cart.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (GST 18%)</span>
                  <span className="font-medium">{formatPrice(cart.tax)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {cart.shipping === 0 ? "FREE" : formatPrice(cart.shipping)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-border">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-xl font-bold text-foreground">
                  {formatPrice(cart.total)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
