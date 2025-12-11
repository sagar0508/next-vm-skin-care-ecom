import { Instagram, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const instaPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600",
    link: "#",
    likes: 1245,
    type: "image",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600",
    link: "#",
    likes: 892,
    type: "reel",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600",
    link: "#",
    likes: 2103,
    type: "image",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600",
    link: "#",
    likes: 1567,
    type: "reel",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1556227702-d1e4e7b5c232?w=600",
    link: "#",
    likes: 945,
    type: "image",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600",
    link: "#",
    likes: 3421,
    type: "reel",
  },
];

export function InstaFeed() {
  return (
    <section className="py-16 bg-background">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3 text-primary">
            <Instagram className="h-6 w-6" />
            <span className="font-semibold tracking-wide uppercase">
              @VMSkinCare
            </span>
          </div>
          <h2 className="text-3xl font-display font-bold text-foreground">
            Follow Us on Instagram
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Join our community of skincare enthusiasts. Tag us in your photos to
            get featured!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instaPosts.map((post) => (
            <Link
              key={post.id}
              href={post.link}
              target="_blank"
              className="group relative aspect-square overflow-hidden rounded-xl bg-muted block"
            >
              <Image
                src={post.image}
                alt={`Instagram post ${post.id}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Reel Indicator */}
              {post.type === "reel" && (
                <div className="absolute top-2 right-2 text-white/90 drop-shadow-md">
                  <Play className="h-5 w-5 fill-current" />
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex items-center gap-2 text-white font-medium">
                  {post.type === "reel" ? (
                    <Play className="h-8 w-8 fill-current" />
                  ) : (
                    <>
                      <Instagram className="h-5 w-5" />
                      <span>{post.likes}</span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" size="lg" asChild className="rounded-full">
            <Link href="https://instagram.com" target="_blank">
              View Our Profile
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
