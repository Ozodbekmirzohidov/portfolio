import Image from "next/image";
import Link from "next/link";
import { IProject } from "@/types";

interface RecentProjectsProps {
  projects: IProject[];
}

export function RecentProjects({ projects }: RecentProjectsProps) {
  return (
    <div className="bg-white rounded-2xl border border-white/80 shadow-[0_1px_2px_0_rgba(26,31,44,0.25)] h-full overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-semibold text-gray-900">
            Recent Projects
          </h3>
          <Link
            href="/portfolio"
            className="text-base font-medium text-indigo-500 border-b border-gray-200 no-underline hover:border-indigo-500 transition-all"
          >
            See all →
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={project.detail_link ?? "/portfolio"}
              className="no-underline"
            >
              <div className="bg-gray-100 rounded-lg px-6 pt-6">
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
