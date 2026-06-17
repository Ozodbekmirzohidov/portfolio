"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ProfileCard } from "@/components/public/ProfileCard";

const services = [
  {
    name: "Front-end Development",
    icon: "/assets/img/icons/web-development.svg",
  },
  { name: "Support & Enhancement", icon: "/assets/img/icons/prd-design.svg" },
  { name: "UI/UX Implementation", icon: "/assets/img/icons/ui-ux.svg" },
  { name: "Mentoring & Teaching", icon: "/assets/img/icons/branding.svg" },
];

const faqs = [
  {
    question: "What kind of projects do you specialize in?",
    answer:
      "I focus on building modern, responsive web applications using technologies like React, TypeScript, and Tailwind CSS.",
  },
  {
    question: "Can you update or improve my existing website?",
    answer:
      "Yes, I offer support for existing projects — including bug fixes, performance optimization, and new feature implementation.",
  },
  {
    question: "Do you offer private tutoring or mentorship?",
    answer:
      "Absolutely! I teach frontend development for beginners and intermediate learners through structured lessons and hands-on practice.",
  },
  {
    question: "What is your typical workflow for new projects?",
    answer:
      "I start by understanding your goals, then plan the structure, choose the best tech stack, and keep you updated throughout the development process.",
  },
  {
    question: "How can I get in touch with you?",
    answer:
      "You can contact me via the form on this website, by email, or through Telegram. I usually respond within 24 hours.",
  },
];

export function ServicesContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="py-10 pb-8">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[32%_66%] gap-[26px]">
          <div className="w-full lg:self-start lg:sticky lg:top-[104px]">
            <ProfileCard />
          </div>

          <div className="w-full h-full">
            <div className="bg-card rounded-2xl border border-border shadow-[0_1px_2px_0_rgba(26,31,44,0.25)] overflow-hidden h-full">
              <div className="px-10 pt-12 pb-10">
                {/* Top info */}
                <div className="mb-12">
                  <h1 className="text-[40px] font-semibold text-head mb-6">
                    My <span className="text-[#4770FF]">Services</span>
                  </h1>
                  <p className="max-w-[500px] text-2xl font-medium text-p leading-[1.3]">
                    Delivering high-quality frontend development services
                    tailored to your needs.
                  </p>
                </div>

                {/* Services grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-[50px]">
                  {services.map((service) => (
                    <div
                      key={service.name}
                      className="flex flex-col items-center text-center px-4 py-6 border border-border rounded-2xl transition-all hover:border-[#4770FF] cursor-default"
                    >
                      <div className="w-[70px] h-[70px] bg-mini-card rounded-[14px] flex items-center justify-center mb-3.5">
                        <Image
                          src={service.icon}
                          alt={service.name}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                      <h3 className="text-sm font-semibold text-p leading-[1.4]">
                        {service.name}
                      </h3>
                    </div>
                  ))}
                </div>

                {/* FAQ */}
                <div className="mb-7">
                  <h2 className="text-3xl font-semibold text-head mb-8">
                    Frequently Asked Questions
                  </h2>
                  <div className="flex flex-col gap-5">
                    {faqs.map((faq, i) => (
                      <div
                        key={i}
                        className="border border-border rounded-xl overflow-hidden transition-colors hover:border-[#4770FF]"
                      >
                        <button
                          onClick={() => toggle(i)}
                          className={`w-full flex items-center justify-between gap-3 px-5 py-5 text-left text-lg font-medium transition-colors cursor-pointer border-none ${
                            openIndex === i
                              ? "bg-card text-[4770FF]"
                              : "bg-transparent text-p hover:text-head"
                          }`}
                        >
                          {faq.question}
                          <span className="shrink-0 text-[#4770FF] flex items-center">
                            {openIndex === i ? (
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M5 12h14"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                              </svg>
                            ) : (
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M12 5v14M5 12h14"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                              </svg>
                            )}
                          </span>
                        </button>
                        {openIndex === i && (
                          <div className="px-5 pb-4 border-t border-border">
                            <p className="text-base text-head leading-[1.7] pt-3">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Work Together Slider */}
                <div className="overflow-hidden border-t border-border pt-5">
                  <div className="flex w-max animate-marquee-slide">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="flex gap-8 pr-8">
                        {[...Array(4)].map((_, j) => (
                          <Link
                            key={j}
                            href="/contact"
                            className="text-[40px] font-bold text-p no-underline whitespace-nowrap transition-colors hover:text-head"
                          >
                            Let&apos;s 👋 Work Together
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
