"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Product, Category } from "@/types";

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "popular", label: "Most Popular" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

const priceRanges = [
  { min: 0, max: 999, label: "Under ₹999" },
  { min: 1000, max: 2999, label: "₹1,000 - ₹2,999" },
  { min: 3000, max: 5999, label: "₹3,000 - ₹5,999" },
  { min: 6000, max: 9999, label: "₹6,000 - ₹9,999" },
  { min: 10000, max: Infinity, label: "₹10,000+" },
];

interface ProductListingProps {
  initialProducts: Product[];
  categories: Category[];
}

export const ProductListing = ({
  initialProducts,
  categories,
}: ProductListingProps) => {
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  // Use initialProducts directly, no need for useEffect fetching here
  const products = initialProducts;

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<{
    min: number;
    max: number;
  } | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "newest");

  // Filter products
  let filteredProducts = [...products];

  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter((p) =>
      selectedCategories.includes(p.category.slug)
    );
  }

  if (selectedPriceRange) {
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.price >= selectedPriceRange.min && p.price <= selectedPriceRange.max
    );
  }

  if (selectedRating) {
    filteredProducts = filteredProducts.filter(
      (p) => p.rating.rate >= selectedRating
    );
  }

  // Sort products
  filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        return b.rating.rate - a.rating.rate;
      case "popular":
        return b.rating.count - a.rating.count;
      default:
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  });

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRange(null);
    setSelectedRating(null);
  };

  const hasActiveFilters =
    selectedCategories.length > 0 || selectedPriceRange || selectedRating;

  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            All Products
          </h1>
          <p className="text-muted-foreground mt-1">
            {filteredProducts.length} products found
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle */}
          <Button
            variant="outline"
            className="lg:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="ml-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                {selectedCategories.length +
                  (selectedPriceRange ? 1 : 0) +
                  (selectedRating ? 1 : 0)}
              </span>
            )}
          </Button>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-10 pl-4 pr-10 rounded-lg border border-input bg-background text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <aside
          className={cn(
            "fixed lg:relative inset-0 z-50 lg:z-0 lg:w-64 lg:flex-shrink-0",
            showFilters ? "block" : "hidden lg:block"
          )}
        >
          {/* Mobile Overlay */}
          <div
            className="fixed inset-0 bg-foreground/50 lg:hidden"
            onClick={() => setShowFilters(false)}
          />

          {/* Filter Content */}
          <div className="fixed lg:sticky lg:top-24 right-0 top-0 h-full lg:h-auto w-80 lg:w-full max-h-screen overflow-y-auto bg-card lg:bg-transparent p-6 lg:p-0 z-50 lg:z-0">
            <div className="flex items-center justify-between lg:hidden mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={() => setShowFilters(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="mb-4 text-destructive"
              >
                Clear All Filters
              </Button>
            )}

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label
                    key={cat.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.slug)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCategories([
                            ...selectedCategories,
                            cat.slug,
                          ]);
                        } else {
                          setSelectedCategories(
                            selectedCategories.filter((c) => c !== cat.slug)
                          );
                        }
                      }}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-foreground">{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-3">
                Price Range
              </h3>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <label
                    key={range.label}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="priceRange"
                      checked={selectedPriceRange?.min === range.min}
                      onChange={() => setSelectedPriceRange(range)}
                      className="w-4 h-4 border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-foreground">
                      {range.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-3">
                Minimum Rating
              </h3>
              <div className="space-y-2">
                {[4, 3, 2].map((rating) => (
                  <label
                    key={rating}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="rating"
                      checked={selectedRating === rating}
                      onChange={() => setSelectedRating(rating)}
                      className="w-4 h-4 border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-foreground">
                      {rating}+ Stars
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Mobile Apply Button */}
            <Button
              variant="hero"
              className="w-full lg:hidden mt-4"
              onClick={() => setShowFilters(false)}
            >
              Apply Filters
            </Button>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">No products found</p>
              <Button variant="outline" className="mt-4" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
