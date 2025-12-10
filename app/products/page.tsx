import { Suspense } from "react";
import { Layout } from "@/components/layout/Layout";
import { ProductListing } from "@/components/product/ProductListing";
import { Product } from "@/types";

// Simulated API Service
// This mimics "getStaticProps" fetching logic on the server
const getProducts = async (): Promise<Product[]> => {
  // In a real app, this would be:
  // const res = await fetch('https://api.example.com/products'); // default no-cache in App Router unless configured
  // return res.json();

  // Simulating API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(require("@/data/mockData").products);
    }, 500); // reduced delay for better UX
  });
};

export default async function ProductsPage() {
  // Fetch data directly on the server (Server Component)
  // No useEffect or useState needed for data fetching here
  const products = await getProducts();

  return (
    <Layout>
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductListing initialProducts={products} />
      </Suspense>
    </Layout>
  );
}
