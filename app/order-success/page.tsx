import { CheckCircle, Package, MessageCircle, ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const OrderSuccess = () => {
  const orderId = `ORD${Date.now().toString().slice(-8)}`;

  return (
    <Layout>
      <div className="container px-4 py-20 mx-auto max-w-7xl">
        <div className="max-w-lg mx-auto text-center max-w-7xl">
          {/* Success Icon */}
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-success/10 flex items-center justify-center animate-scale-in">
            <CheckCircle className="h-14 w-14 text-success" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground animate-slide-up">
            Order Placed Successfully!
          </h1>

          <p
            className="mt-4 text-sm sm:text-lg text-muted-foreground animate-slide-up"
            style={{ animationDelay: "100ms" }}
          >
            Thank you for your order. We've received your payment and will start
            processing your order right away.
          </p>

          {/* Order ID */}
          <div
            className="mt-8 p-4 bg-muted rounded-xl inline-block animate-slide-up"
            style={{ animationDelay: "200ms" }}
          >
            <p className="text-sm text-muted-foreground">Order ID</p>
            <p className="text-xl font-mono font-bold text-foreground">
              {orderId}
            </p>
          </div>

          {/* What's Next */}
          <div
            className="mt-10 space-y-4 text-left animate-slide-up"
            style={{ animationDelay: "300ms" }}
          >
            <h2 className="text-lg font-semibold text-foreground text-center">
              What happens next?
            </h2>

            <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">
                  WhatsApp Confirmation
                </h3>
                <p className="text-sm text-muted-foreground">
                  You'll receive order updates on WhatsApp including tracking
                  details.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">
                  Shipping Updates
                </h3>
                <p className="text-sm text-muted-foreground">
                  We'll notify you when your order is packed and shipped with
                  tracking link.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
            style={{ animationDelay: "400ms" }}
          >
            <Button variant="hero" size="lg" asChild>
              <Link href="/products">
                Continue Shopping
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/account/orders">View Orders</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderSuccess;
