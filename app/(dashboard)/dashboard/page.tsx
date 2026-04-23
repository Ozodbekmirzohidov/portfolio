import { supabase } from "@/lib/supabase";

export default async function DashboardPage() {
  const [
    { count: projectsCount },
    { count: skillsCount },
    { count: blogsCount },
    { count: messagesCount },
  ] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("skills").select("*", { count: "exact", head: true }),
    supabase.from("blogs").select("*", { count: "exact", head: true }),
    supabase.from("messages").select("*", { count: "exact", head: true }),
  ]);

  const stats = [
    { label: "Projects", count: projectsCount ?? 0 },
    { label: "Skills", count: skillsCount ?? 0 },
    { label: "Blogs", count: blogsCount ?? 0 },
    { label: "Messages", count: messagesCount ?? 0 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-(--foreground)">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-6 rounded-2xl bg-(--card) border border-(--border)"
          >
            <p className="text-(--muted) text-sm mb-1">{stat.label}</p>
            <h2 className="text-3xl font-bold text-(--foreground)">
              {stat.count}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
