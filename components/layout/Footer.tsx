import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
} from "lucide-react";
import logo from "@/assets/logo.png";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container px-4 py-12 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={logo.src}
                alt="VM Skin Care"
                className="h-12 w-auto brightness-0 invert"
              />
              <span className="font-display text-xl font-semibold">
                VM Skin Care
              </span>
            </div>
            <p className="text-sm text-background/70">
              Your trusted destination for premium skincare products. Discover
              radiant, healthy skin with our curated collection.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/people/VM-Korean-Glass-Treatement/61569783852868/?mibextid=wwXIfr&rdid=qrcLc3zzDgoV7X2v&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1EdMexCKc4%2F%3Fmibextid%3DwwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/70 hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/vm_korean_glass_treatment/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/70 hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/@vmskincare?si=Cf4R00_stXjvOAqK"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/70 hover:text-primary transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=9928821756&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/70 hover:text-primary transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <Link
                  href="/products"
                  className="hover:text-primary transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/category/skincare"
                  className="hover:text-primary transition-colors"
                >
                  Skincare
                </Link>
              </li>
              <li>
                <Link
                  href="/category/body-care"
                  className="hover:text-primary transition-colors"
                >
                  Body Care
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <Link
                  href="/track-order"
                  className="hover:text-primary transition-colors"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="hover:text-primary transition-colors"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="hover:text-primary transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-primary transition-colors"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <span>
                  line no .3, B-47, virenpark-2, Deesa - Tharad Hwy, Gujarat
                  385565, India
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
                <a
                  href="tel:+919928821756"
                  className="hover:text-primary transition-colors"
                >
                  +91 99288 21756
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                <a
                  href="mailto:info@vmskincare.com"
                  className="hover:text-primary transition-colors"
                >
                  info@vmskincare.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-background/10">
        <div className="container py-6 mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-background/60">
              &copy; {new Date().getFullYear()} VM Skin Care. All rights
              reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-background/60">
              <Link
                href="/privacy"
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </div>
            {/* Payment Methods */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-background/60">We accept:</span>
              <div className="flex gap-2">
                <div className="w-10 h-6 bg-background/10 rounded flex items-center justify-center text-xs font-semibold">
                  Visa
                </div>
                <div className="w-10 h-6 bg-background/10 rounded flex items-center justify-center text-xs font-semibold">
                  MC
                </div>
                <div className="w-10 h-6 bg-background/10 rounded flex items-center justify-center text-xs font-semibold">
                  UPI
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
