import fs from "fs";
import path from "path";
import { ProductDetailClient } from "@/components/product/ProductDetailClient";
import { Category, Product, Review } from "@/types";

const getProducts = (): Product[] => {
  const filePath = path.join(process.cwd(), "data/products/products.json");
  if (!fs.existsSync(filePath)) return [];
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
};

const getReviews = (): Review[] => {
  const filePath = path.join(process.cwd(), "data/reviews/reviews.json");
  if (!fs.existsSync(filePath)) return [];
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
};

export async function generateStaticParams() {
  const products = getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { slug } = params;

  const products = getProducts();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  const allReviews = getReviews();
  const reviews = allReviews.filter((r) => r.productId === product.id);

  return <ProductDetailClient product={product} reviews={reviews} />;
}
