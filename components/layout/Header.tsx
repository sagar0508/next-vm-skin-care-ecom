"use client";
import { useCartStore } from "@/store/cartStore";
import {
  Menu,
  Search,
  ShoppingBag,
  User,
  X
} from "lucide-react";
import { useState } from "react";
// import { useWishlistStore } from "@/store/wishlistStore";
import logo from "@/assets/logo.png";
import { AuthModal } from "@/components/auth/AuthModal";
import Link from "next/link";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { cart } = useCartStore();
  // const { items: wishlistItems } = useWishlistStore();

  const cartItemCount = cart.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      {/* Top bar */}
      {/* <div className="hidden md:block bg-primary text-primary-foreground text-xs py-2 px-4">
        <div className="container flex justify-between items-center">
          <span>Free shipping on orders above ₹999</span>
          <div className="flex gap-4">
            <Link href="/track-order" className="hover:underline">
              Track Order
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div> */}

      {/* Main header */}
      <div className="container mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between gap-4 px-4">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 -ml-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img src={logo.src} alt="VM Skin Care" className="h-12 w-auto" />
            <span className="hidden sm:block font-display text-xl font-semibold text-foreground">
              VM Skin Care
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {/* {categories.map((category) => (
              <div key={category.id} className="relative group">
                <Link
                  href={`/category/${category.slug}`}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  {category.name}
                  {category.children && category.children.length > 0 && (
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                  )}
                </Link>

                {category.children && category.children.length > 0 && (
                  <div className="absolute top-full left-0 w-48 py-2 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {category.children.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/category/${category.slug}/${sub.slug}`}
                        className="block px-4 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-muted transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))} */}
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/korean-glass-treatment"
              className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Korean Glass Treatment
            </Link>
            <Link
              href="/products"
              className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/blog"
              className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Search bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search skincare products..."
                className="w-full h-10 pl-10 pr-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              className="lg:hidden p-2"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* <Link
              href="/wishlist"
              className="relative p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Heart className="h-5 w-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-5 w-5 flex items-center justify-center text-xs font-semibold bg-primary text-primary-foreground rounded-full">
                  {wishlistItems.length}
                </span>
              )}
            </Link> */}

            {/* <Link
              href="/account"
              className="hidden sm:block p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <User className="h-5 w-5" />
            </Link> */}
            <button
              onClick={() => setIsAuthOpen(true)}
              className="hidden sm:block p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <User className="h-5 w-5" />
            </button>

            <Link
              href="/cart"
              className="relative p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-5 w-5 flex items-center justify-center text-xs font-semibold bg-primary text-primary-foreground rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="lg:hidden py-3 border-t border-border animate-fade-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search skincare products..."
                className="w-full h-10 pl-10 pr-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-card animate-fade-in px-4">
          <nav className="container py-4 space-y-2 h-[calc(100vh-4rem)]">
            {/* {categories.map((category) => (
              <div key={category.id}>
                <Link
                  href={`/category/${category.slug}`}
                  className="block py-2 text-base font-medium text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
                {category.children && (
                  <div className="ml-4 space-y-1">
                    {category.children.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/category/${category.slug}/${sub.slug}`}
                        className="block py-1.5 text-sm text-muted-foreground"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))} */}
            <Link
              href="/"
              className="flex items-center gap-2 py-2 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {/* <Home className="h-5 w-5" /> */}
              Home
            </Link>
            <Link
              href="/korean-glass-treatment"
              className="block py-2 text-base font-medium text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Korean Glass Treatment
            </Link>

            <Link
              href="/products"
              className="block py-2 text-base font-medium text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/blog"
              className="block py-2 text-base font-medium text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="block py-2 text-base font-medium text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-4 border-t border-border ">
              <button
                className="flex items-center gap-2 py-2 text-base font-medium w-full text-left"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsAuthOpen(true);
                }}
              >
                <User className="h-5 w-5" />
                My Account
              </button>
            </div>
          </nav>
        </div>
      )}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </header>
  );
}
