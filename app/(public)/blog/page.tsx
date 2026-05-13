import { Suspense } from "react";
import { BlogContent } from "@/components/public/Blog/BlogContent";
import { BlogSkeleton } from "@/components/public/Blog/BlogSkeleton";

export default function BlogPage() {
  return (
    <Suspense fallback={<BlogSkeleton />}>
      <BlogContent />
    </Suspense>
  );
}
