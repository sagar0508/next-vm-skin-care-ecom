import React, { Suspense } from "react";
import fs from "fs";
import path from "path";
import { Category, Product } from "@/types";
import { Layout } from "@/components/layout/Layout";
import { ProductListing } from "@/components/product/ProductListing";
import { notFound } from "next/navigation";

const getCategories = (): Category[] => {
  const filePath = path.join(process.cwd(), "data/categories/categories.json");
  if (!fs.existsSync(filePath)) return [];
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
};

const getProducts = (): Product[] => {
  const filePath = path.join(process.cwd(), "data/products/products.json");
  if (!fs.existsSync(filePath)) return [];
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
};

// 1. Generate Static Params for all categories
export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categories = getCategories();
  const products = getProducts();

  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  // Filter products for this category
  // Note: API categories might be simple strings, but our mapped category has slug.
  // The product.category object has a slug too.
  const categoryProducts = products.filter((p) => p.category.slug === slug);

  return (
    <Layout>
      <div className="bg-muted/30 py-12 mb-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            {category.name}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {category.description}
          </p>
        </div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        {/* We pass filtered products as initialProducts. 
            The ProductListing component will still allow further filtering on client side 
            if we pass the full list of categories for the sidebar. */}
        <ProductListing
          initialProducts={categoryProducts}
          categories={categories}
        />
      </Suspense>
    </Layout>
  );
}
