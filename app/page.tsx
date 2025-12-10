import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { CategorySection } from "@/components/home/CategorySection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { FeaturesBanner } from "@/components/home/FeaturesBanner";
import { Newsletter } from "@/components/home/Newsletter";
import { products } from "@/data/mockData";
import { InstaFeed } from "@/components/home/InstaFeed";

const Index = () => {
  const featuredProducts = products.filter((p) => p.featured);
  const bestSellers = products.filter((p) => p.tags.includes("bestseller"));

  return (
    <Layout>
      <HeroSection />
      {/* <FeaturesBanner /> */}
      <CategorySection />
      <FeaturedProducts
        products={featuredProducts}
        title="Featured Products"
        subtitle="Handpicked products just for you"
      />
      <FeaturedProducts
        products={bestSellers}
        title="Best Sellers"
        subtitle="Our most popular products"
        viewAllLink="/products?sort=popular"
      />
      <InstaFeed />
      <Newsletter />
    </Layout>
  );
};

export default Index;
