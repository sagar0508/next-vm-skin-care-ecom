import { Suspense } from "react";
import { Layout } from "@/components/layout/Layout";
import { ProductListing } from "@/components/product/ProductListing";
import { Category, Product } from "@/types";
import path from "path";
import fs from "fs";
// Simulated API Service
// This mimics "getStaticProps" fetching logic on the server

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

export default function ProductsPage() {
  const products = getProducts();
  const categories = getCategories();

  return (
    <Layout>
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductListing initialProducts={products} categories={categories} />
      </Suspense>
    </Layout>
  );
}
