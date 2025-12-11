"use client";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Subscribed successfully!", {
        description: "You'll receive updates at " + email,
      });
      setEmail("");
    }
  };

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="h-12 w-12 mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl font-display font-bold">
            Subscribe to Our Newsletter new
          </h2>
          <p className="mt-3 text-primary-foreground/80">
            Get exclusive offers, new arrivals updates, and 10% off your first
            order!
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 h-12 px-4 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
              required
            />
            <Button
              type="submit"
              variant="accent"
              size="lg"
              className="whitespace-nowrap"
            >
              Subscribe
            </Button>
          </form>

          <p className="mt-4 text-xs text-primary-foreground/60">
            By subscribing, you agree to our Privacy Policy and consent to
            receive updates.
          </p>
        </div>
      </div>
    </section>
  );
}
