import { Suspense } from "react";
import { ServicesContent } from "@/components/public/Services/ServicesContent";
import { ServicesSkeleton } from "@/components/public/Services/ServicesSkeleton";

export default function ServicesPage() {
  return (
    <Suspense fallback={<ServicesSkeleton />}>
      <ServicesContent />
    </Suspense>
  );
}
