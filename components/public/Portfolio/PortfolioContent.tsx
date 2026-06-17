import Image from "next/image";
import Link from "next/link";
import { ProfileCard } from "@/components/public/ProfileCard";
import { getProjects } from "@/lib/supabase/cached-queries";

const ArrowIcon = () => (
  <svg
    width="14"
    height="15"
    viewBox="0 0 14 15"
    fill="none"
    className="w-3.5 h-[15px]"
  >
    <path
      d="M9.91634 4.5835L4.08301 10.4168"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.66699 4.5835H9.91699V9.8335"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export async function PortfolioContent() {
  const projects = await getProjects();

  return (
    <section className="py-10 pb-8">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[32%_66%] gap-[26px]">
          <div className="w-full self-start sticky top-[104px]">
            <ProfileCard />
          </div>

          <div className="w-full h-full">
            <div className="bg-card rounded-2xl border border-border shadow-[0_1px_2px_0_rgba(26,31,44,0.25)] overflow-hidden h-full">
              <div className="px-10 pt-12 pb-10">
                <div className="mb-12">
                  <h1 className="text-[40px] font-bold text-head mb-6">
                    Check Out My Latest{" "}
                    <span className="text-[#4770FF]">Projects</span>
                  </h1>
                  <p className="max-w-[630px] text-lg font-semibold text-p leading-normal">
                    Explore a curated collection of my recent frontend
                    applications. Built with a focus on performance, responsive
                    design, and clean architecture using modern web
                    technologies.
                  </p>
                </div>

                <div className="flex flex-col gap-5 mb-7">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="border border-border rounded-2xl overflow-hidden transition-colors hover:border-[#4770FF] "
                    >
                      {project.image && (
                        <div className="group relative overflow-hidden">
                          <Image
                            src={project.image}
                            alt={project.title}
                            width={800}
                            height={600}
                            className="w-full h-auto block transition-transform duration-300 group-hover:scale-[1.02]"
                          />
                          <Link
                            href={project.image}
                            target="_blank"
                            className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center text-gray-900 no-underline opacity-0 group-hover:opacity-100 transition-all hover:bg-[#4770FF] hover:text-white"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              width="20"
                              height="20"
                            >
                              <path d="M10 4.167v11.666M4.167 10h11.666" />
                            </svg>
                          </Link>
                        </div>
                      )}
                      <div className="flex items-center justify-between px-5 py-4 gap-4">
                        <div>
                          <Link
                            href={project.detail_link ?? "/portfolio"}
                            className="no-underline group/title"
                          >
                            <h3 className="text-2xl font-semibold text-head mb-1 transition-colors group-hover/title:text-indigo-500">
                              {project.title}
                            </h3>
                          </Link>
                          {project.subtitle && (
                            <p className="text-[13px] text-p">
                              {project.subtitle}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <Link
                            href={project.detail_link ?? "/portfolio"}
                            className="flex items-center gap-1 text-sm font-medium text-[#4770FF] no-underline hover:opacity-96 transition-opacity"
                          >
                            View Details <ArrowIcon />
                          </Link>
                          {project.site_link && (
                            <Link
                              href={project.site_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-sm font-medium text-[#4770FF] no-underline hover:opacity-96 transition-opacity"
                            >
                              Visit Site <ArrowIcon />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

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
