import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function prebuild() {
  console.log("Starting prebuild: Fetching products...");

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error(`Failed to fetch products: ${res.statusText}`);

    const responseData = await res.json();
    const products = responseData.results || responseData;

    if (!Array.isArray(products)) {
      throw new Error("Products data is not an array");
    }

    // Transform to match local Product type
    const transformedProducts = products.map((p) => {
      return {
        id: p.id ? p.id.toString() : "",
        name: p.name || p.title || "Untitled",
        slug: p.slug,
        description: p.description || "",
        shortDescription: p.shortDescription || "",
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        images: p.images || (p.image ? [p.image] : []),
        category: {
          id: p.category?.id || "uncategorized",
          name: p.category?.name || "Uncategorized",
          slug: p.category?.slug || "uncategorized",
        },
        subcategory: p.subcategory,
        brand: p.brand || "Generic",
        variants: p.variants || [],
        attributes: p.attributes || {},
        rating:
          typeof p.rating === "number"
            ? { rate: p.rating, count: p.reviewCount || 0 }
            : p.rating || { rate: 0, count: 0 },
        reviewCount: p.reviewCount || 0,
        tags: p.tags || [],
        inStock: p.inStock ?? true,
        featured: p.featured ?? false,
        createdAt: p.createdAt || new Date().toISOString(),
        updatedAt: p.updatedAt || new Date().toISOString(),
      };
    });

    const dataDir = path.join(process.cwd(), "data/products");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const filePath = path.join(dataDir, "products.json");
    fs.writeFileSync(filePath, JSON.stringify(transformedProducts, null, 2));

    console.log(
      `Successfully wrote ${transformedProducts.length} products to ${filePath}`
    );

    // --- Categories ---
    console.log("Fetching categories...");
    const catRes = await fetch("https://fakestoreapi.com/products/categories");
    const apiCategories = await catRes.json();

    const categories = apiCategories.map((c, index) => ({
      id: `cat-${c.replace(/\s+/g, "-")}`,
      name: c,
      slug: c.replace(/\s+/g, "-"),
      description: `Browse our collection of ${c}`,
      image: `https://source.unsplash.com/400x400/?${c.replace(/\s+/g, ",")}`,
      children: [],
    }));

    const catDir = path.join(process.cwd(), "data/categories");
    if (!fs.existsSync(catDir)) fs.mkdirSync(catDir, { recursive: true });
    fs.writeFileSync(
      path.join(catDir, "categories.json"),
      JSON.stringify(categories, null, 2)
    );

    // --- Reviews ---
    const reviews = [
      {
        id: "rev-1",
        productId: "1", // Updated to match ID from products.json (Foldsack)
        userId: "user-1",
        userName: "Priya Sharma",
        rating: 5,
        title: "Amazing results!",
        content: "Great bag, fits my laptop perfectly.",
        helpful: 234,
        verified: true,
        createdAt: "2024-03-01",
      },
      {
        id: "rev-2",
        productId: "1",
        userId: "user-2",
        userName: "Neha Patel",
        rating: 4,
        title: "Good quality",
        content: "Solid material, but the straps could be more padded.",
        helpful: 156,
        verified: true,
        createdAt: "2024-02-28",
      },
      {
        id: "rev-3",
        productId: "5", // Dragon Station Chain Bracelet
        userId: "user-3",
        userName: "Ananya Singh",
        rating: 5,
        title: "Stunning piece",
        content:
          "Looks exactly like the picture. Very heavy and feels premium.",
        helpful: 412,
        verified: true,
        createdAt: "2024-03-05",
      },
    ];
    const reviewsDir = path.join(process.cwd(), "data/reviews");
    if (!fs.existsSync(reviewsDir))
      fs.mkdirSync(reviewsDir, { recursive: true });
    fs.writeFileSync(
      path.join(reviewsDir, "reviews.json"),
      JSON.stringify(reviews, null, 2)
    );

    // --- Blogs ---
    const blogPosts = [
      {
        id: "blog-1",
        title: "The Ultimate Guide to Mens Fashion",
        excerpt: "Discover the step-by-step guide to dressing sharp.",
        content: "Content placeholder...",
        image:
          "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
        author: "Dr. Style",
        date: "2024-03-15",
        slug: "ultimate-guide-mens-fashion",
        tags: ["fashion", "men", "style"],
      },
      {
        id: "blog-2",
        title: "Jewelry Care 101",
        excerpt: "How to keep your silver and gold shining.",
        content: "Content placeholder...",
        image:
          "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png",
        author: "Sarah Chen",
        date: "2024-03-10",
        slug: "jewelry-care-101",
        tags: ["jewelry", "care", "tips"],
      },
    ];
    const blogsDir = path.join(process.cwd(), "data/blogs");
    if (!fs.existsSync(blogsDir)) fs.mkdirSync(blogsDir, { recursive: true });
    fs.writeFileSync(
      path.join(blogsDir, "blogs.json"),
      JSON.stringify(blogPosts, null, 2)
    );

    console.log("Prebuild complete: Categories, Reviews, and Blogs generated.");
  } catch (error) {
    console.error("Error during prebuild:", error);
    process.exit(1);
  }
}

prebuild();
