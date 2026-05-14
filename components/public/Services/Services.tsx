import Image from "next/image";
import Link from "next/link";

const services = [
  {
    name: "Front-end Development",
    icon: "/assets/img/icons/web-development.svg",
  },
  { name: "Support & Enhancement", icon: "/assets/img/icons/prd-design.svg" },
  { name: "UI/UX Implementation", icon: "/assets/img/icons/ui-ux.svg" },
  { name: "Mentoring & Teaching", icon: "/assets/img/icons/branding.svg" },
];

export function Services() {
  return (
    <section className="pb-8">
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr] gap-6">
        {/* Services card */}
        <div className="bg-card rounded-2xl border border-border shadow-[0_1px_2px_0_rgba(26,31,44,0.25)] overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-head">
                Services I Offered
              </h3>
              <Link
                href="/services"
                className="text-base font-medium text-[#5770FF] border-b border-border no-underline hover:border-p transition-all"
              >
                See All →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {services.map((service) => (
                <div
                  key={service.name}
                  className="flex items-center gap-3.5 border border-border rounded-xl p-5 hover:border-[#4770FF] transition-all cursor-default"
                >
                  <div className="w-12 h-12 bg-mini-card rounded-xl flex items-center justify-center shrink-0">
                    <Image
                      src={service.icon}
                      alt={service.name}
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-[15px] font-semibold text-p">
                    {service.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Let's Work Together card */}
        <div className="bg-card rounded-2xl border border-border shadow-[0_1px_2px_0_rgba(26,31,44,0.25)] overflow-hidden">
          <div className="p-8 flex flex-col h-full">
            {/* Marquee */}
            <div className="overflow-hidden mb-6">
              <p className="text-sm font-medium text-p whitespace-nowrap animate-[marquee_12s_linear_infinite] inline-block">
                Available For Hire 🚀 Crafting Digital Experiences 🎨 Available
                For Hire 🚀 Crafting Digital Experiences 🎨
              </p>
            </div>

            <h3 className="text-3xl font-bold text-head leading-snug mb-6">
              Let&apos;s 👋 <br /> Work Together
            </h3>

            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-base font-semibold text-indigo-500 border-b border-indigo-500 no-underline hover:opacity-80 transition-all w-fit pb-0.5"
            >
              Let&apos;s Talk →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
