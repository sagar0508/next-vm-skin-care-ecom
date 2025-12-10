import { products } from "@/data/mockData";
import { ProductDetailClient } from "@/components/product/ProductDetailClient";

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { slug } = params;

  return <ProductDetailClient slug={slug} />;
}
