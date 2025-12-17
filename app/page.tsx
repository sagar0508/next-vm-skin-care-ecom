import fs from "fs";
import path from "path";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { CategorySection } from "@/components/home/CategorySection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { FeaturesBanner } from "@/components/home/FeaturesBanner";
import { Newsletter } from "@/components/home/Newsletter";
import { InstaFeed } from "@/components/home/InstaFeed";
import { Category, Product } from "@/types";

const getProducts = (): Product[] => {
  const filePath = path.join(process.cwd(), "data/products/products.json");
  if (!fs.existsSync(filePath)) return [];
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
};

const getCategories = (): Category[] => {
  const filePath = path.join(process.cwd(), "data/categories/categories.json");
  if (!fs.existsSync(filePath)) return [];
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
};

export default function Index() {
  const products = getProducts();
  const categories = getCategories();

  const featuredProducts = products.filter((p) => p.featured);
  // If no manually marked bestsellers, just take some products
  const bestSellers = products
    .filter((p) => p.rating && p.rating.rate > 4.5)
    .slice(0, 4);

  // Fallback for featured product if none marked
  const heroProduct =
    featuredProducts.length > 0 ? featuredProducts[0] : products[0];

  return (
    <Layout>
      <HeroSection featuredProduct={heroProduct} />
      {/* <FeaturesBanner /> */}
      <CategorySection categories={categories} />
      <FeaturedProducts
        products={
          featuredProducts.length > 0 ? featuredProducts : products.slice(0, 4)
        }
        title="Featured Products"
        subtitle="Handpicked products just for you"
      />
      <FeaturedProducts
        products={bestSellers.length > 0 ? bestSellers : products.slice(4, 8)}
        title="Best Sellers"
        subtitle="Our most popular products"
        viewAllLink="/products?sort=popular"
      />
      <InstaFeed />
      <Newsletter />
    </Layout>
  );
}
