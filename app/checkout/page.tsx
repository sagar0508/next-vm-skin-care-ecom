"use client";

import { useState, useEffect } from "react";
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
import { useRazorpay } from "@/hooks/useRazorpay";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { AuthModal } from "@/components/auth/AuthModal";
import axiosBaseURL from "@/axios";

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
  const [isSuccess, setIsSuccess] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { isLoggedIn, userDetails } = useSelector(
    (state: RootState) => state.auth
  );

  const [address, setAddress] = useState({
    name: "",
    phone_number: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  useEffect(() => {
    if (isLoggedIn && userDetails) {
      setAddress((prev) => ({
        ...prev,
        name: prev.name || userDetails.name || "",
        phone_number: prev.phone_number || userDetails.phone_number || "",
      }));
    }
  }, [isLoggedIn, userDetails]);

  const [isPincodeLoading, setIsPincodeLoading] = useState(false);

  useEffect(() => {
    const fetchPincodeDetails = async () => {
      if (address.pincode.length === 6) {
        setIsPincodeLoading(true);
        try {
          const response = await axios.get(
            `https://api.postalpincode.in/pincode/${address.pincode}`
          );
          if (response.data?.[0]?.Status === "Success") {
            const details = response.data[0].PostOffice[0];
            setAddress((prev) => ({
              ...prev,
              city: details.District,
              state: details.State,
              country: details.Country,
            }));
            toast.success("Address auto-filled from pincode");
          } else {
            toast.error("Invalid pincode or details not found");
          }
        } catch (error) {
          console.error("Pincode API Error:", error);
          toast.error("Failed to fetch address details for this pincode");
        } finally {
          setIsPincodeLoading(false);
        }
      }
    };

    fetchPincodeDetails();
  }, [address.pincode]);

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !address.name ||
      !address.phone_number ||
      !address.addressLine1 ||
      !address.city ||
      !address.state ||
      !address.pincode
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Pincode validation: 6 digits and numeric
    const pincodeRegex = /^\d{6}$/;
    if (!pincodeRegex.test(address.pincode)) {
      toast.error("Please enter a valid 6-digit PIN code");
      return;
    }

    setCurrentStep("shipping");
  };

  const handleShippingSubmit = () => {
    const option = shippingOptions.find((o) => o.id === selectedShipping);
    if (option) {
      setShipping(option.price);
    }

    if (!isLoggedIn) {
      setIsAuthOpen(true);
      return;
    }
    setCurrentStep("payment");
  };

  const { displayRazorpay } = useRazorpay();

  const handlePayment = async () => {
    setIsProcessing(true);
    console.log("handlePayment");
    try {
      // 1. Create Order via API

      const { items, total, couponCode } = cart;

      const normalizedItems = items.map((item) => ({
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
      }));
      const payload = {
        items: normalizedItems,
        shippingAddress: address,
        // shippingMethod: selectedShipping,
        // total,
        couponCode,
      };

      const orderRes = await axiosBaseURL.post(`/orders/checkout`, payload);

      const { orderId, currency, totalAmount, razorpayOrderId } =
        orderRes.data?.data;

      console.log(
        "orderRes--",
        orderRes?.data?.data,
        process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
      );
      // 2. Open Razorpay
      await displayRazorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "", // Add this to env
        amount: Math.round(Number(totalAmount) * 100).toString(),
        currency: Array.isArray(currency) ? currency[0] : currency || "INR",
        name: "VM Skin Care",
        description: "Transaction for Order #" + orderId,
        // image: "https://your-logo-url.com/logo.png", // Replace with valid logo URL
        order_id: razorpayOrderId,
        handler: async (response: any) => {
          try {
            console.log("response--payment", response);
            // 3. Verify Payment
            const verifyRes = await axiosBaseURL.post(`/payments/verify`, {
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });

            console.log("verifyRes", verifyRes);
            if (verifyRes?.data?.code === 200) {
              setIsSuccess(true);
              const orderData = verifyRes.data.data;
              sessionStorage.setItem("lastOrder", JSON.stringify(orderData));
              toast.success("Order placed successfully!", {
                description: "You will receive a confirmation on WhatsApp",
              });
              router.push(`/order-success?orderId=${orderData.orderId}`);
              clearCart();
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            console.error("Verification Error:", error);
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: address.name,
          email: userDetails?.email || "user@example.com",
          contact: address.phone_number,
        },
        notes: {
          address: `${address.addressLine1}, ${address.city}, ${address.state}`,
        },
        theme: {
          color: "#3399cc",
        },
      });
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("Failed to initiate payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.items.length === 0 && !isSuccess) {
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
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={address.phone_number}
                        onChange={(e) =>
                          setAddress({
                            ...address,
                            phone_number: e.target.value,
                          })
                        }
                        className="w-full h-11 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Address Line 1 *
                    </label>
                    <input
                      type="text"
                      value={address.addressLine1}
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          addressLine1: e.target.value,
                        })
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
                      value={address.addressLine2}
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          addressLine2: e.target.value,
                        })
                      }
                      placeholder="Landmark, Area (Optional)"
                      className="w-full h-11 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div
                      className={
                        !(address.city && address.state) ? "sm:col-span-3" : ""
                      }
                    >
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        PIN Code *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={address.pincode}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === "" || /^\d+$/.test(value)) {
                              setAddress({ ...address, pincode: value });
                            }
                          }}
                          className="w-full h-11 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                          required
                          maxLength={6}
                          placeholder="Enter your pincode"
                        />
                        {isPincodeLoading && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                          </div>
                        )}
                      </div>
                    </div>
                    {address.city && address.state && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">
                            City *
                          </label>
                          <input
                            type="text"
                            disabled
                            value={address.city}
                            onChange={(e) =>
                              setAddress({ ...address, city: e.target.value })
                            }
                            className="w-full h-11 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                            required
                            placeholder="Enter your city"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">
                            State *
                          </label>
                          <input
                            type="text"
                            disabled
                            value={address.state}
                            onChange={(e) =>
                              setAddress({ ...address, state: e.target.value })
                            }
                            className="w-full h-11 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                            required
                            placeholder="Enter your state"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full mt-6"
                    disabled={isPincodeLoading}
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
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => {
          setIsAuthOpen(false);
          setCurrentStep("payment");
        }}
        preFilledPhone={address?.phone_number}
      />
    </Layout>
  );
};

export default Checkout;
