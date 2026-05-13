import { Suspense } from "react";
import { AboutContent } from "@/components/public/About/AboutContent";
import { AboutSkeleton } from "@/components/public/About/AboutSkeleton";

export default function AboutPage() {
  return (
    <Suspense fallback={<AboutSkeleton />}>
      <AboutContent />
    </Suspense>
  );
}
