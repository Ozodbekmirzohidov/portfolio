import { Suspense } from "react";
import { PortfolioContent } from "@/components/public/Portfolio/PortfolioContent";
import { PortfolioSkeleton } from "@/components/public/Portfolio/PortfolioSkeleton";

export default function PortfolioPage() {
  return (
    <Suspense fallback={<PortfolioSkeleton />}>
      <PortfolioContent />
    </Suspense>
  );
}
