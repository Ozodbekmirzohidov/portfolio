import { Navbar } from "@/components/public/Navbar";
import Image from "next/image";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Aylanuvchi fonlar */}
      <div className="fixed inset-0 -z-10">
        {/* Chap */}
        {/* Chap yuqori */}
        <div
          className="absolute inset-0 scale-[2.1]"
          style={{ animation: "bgRotate 80s linear infinite" }}
        >
          <Image
            src="/assets/img/bg/banner-shape-1.png"
            alt="background 1"
            fill
            className="object-cover opacity-40"
          />
        </div>

        {/* O'ng pastki */}
        <div
          className="absolute inset-0 scale-[2.1]"
          style={{ animation: "bgRotate 80s linear infinite reverse" }}
        >
          <Image
            src="/assets/img/bg/banner-shape-1.png"
            alt="background 2"
            fill
            className="object-cover opacity-40"
          />
        </div>
      </div>

      <Navbar />
      <main className="max-w-[1300px] mx-auto px-3">
        {children}
      </main>
    </div>
  );
}
