import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { IProject } from "@/types";

async function getProjects() {
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("order_index");
  return data as IProject[];
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-(--foreground)">Projects</h1>
        <button className="px-4 py-2 rounded-lg bg-(--primary) text-white text-sm font-medium hover:opacity-90 transition cursor-pointer">
          + Add Project
        </button>
      </div>

      <div className="rounded-2xl border border-(--border) overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-(--card) border-b border-(--border)">
            <tr>
              <th className="text-left px-4 py-3 text-(--muted) font-medium">
                Title
              </th>
              <th className="text-left px-4 py-3 text-(--muted) font-medium">
                Subtitle
              </th>
              <th className="text-left px-4 py-3 text-(--muted) font-medium">
                Site
              </th>
              <th className="text-left px-4 py-3 text-(--muted) font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {projects?.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-8 text-(--muted)">
                  No projects yet
                </td>
              </tr>
            )}
            {projects?.map((project) => (
              <tr
                key={project.id}
                className="border-b border-(--border) hover:bg-(--card) transition"
              >
                <td className="px-4 py-3 text-(--foreground)">
                  {project.title}
                </td>
                <td className="px-4 py-3 text-(--muted)">{project.subtitle}</td>
                <td className="px-4 py-3 text-(--muted)">
                  {project.site_link ? (
                    <Link
                      href={project.site_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-(--primary) hover:underline"
                    >
                      Visit
                    </Link>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 rounded-lg text-xs bg-(--border) text-(--foreground) hover:opacity-80 transition cursor-pointer">
                      Edit
                    </button>
                    <button className="px-3 py-1 rounded-lg text-xs bg-red-500/10 text-red-400 hover:opacity-80 transition cursor-pointer">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
