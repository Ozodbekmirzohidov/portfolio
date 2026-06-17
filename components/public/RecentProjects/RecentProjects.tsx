import Image from "next/image";
import Link from "next/link";
import { IProject } from "@/types";

interface RecentProjectsProps {
  projects: IProject[];
}

export function RecentProjects({ projects }: RecentProjectsProps) {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-[0_1px_2px_0_rgba(26,31,44,0.25)] h-full overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-semibold text-head">Recent Projects</h3>
          <Link
            href="/portfolio"
            className="text-base font-medium text-[#5770FF] border-b border-gray-200 no-underline hover:border-p transition-all"
          >
            See all →
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={project.detail_link ?? "/portfolio"}
              className="border border-border rounded-2xl overflow-hidden transition-colors hover:border-[#4770FF] no-underline"
            >
              <div className="bg-mini-card rounded-lg p-2">
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={220}
                    className="w-full h-auto rounded-lg object-cover"
                  />
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
