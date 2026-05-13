import { Navbar } from "@/components/public/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <main className="max-w-[1300px] mx-auto">{children}</main>
      </div>
    </>
  );
}
