import { createClient } from "@/lib/supabase/server";
import { ProfileCard } from "@/components/public/ProfileCard";
import { WorkExperience } from "@/components/public/WorkExperience";
import { ExpertArea } from "@/components/public/ExpertArea";
import { RecentProjects } from "@/components/public/RecentProjects";

async function getData() {
   const supabase = await createClient();
  const [{ data: experiences }, { data: skills }, { data: projects }] =
    await Promise.all([
      supabase.from("experiences").select("*").order("order_index"),
      supabase.from("skills").select("*").order("order_index").limit(6),
      supabase.from("projects").select("*").order("order_index").limit(2),
    ]);

  return { experiences, skills, projects };
}

export async function Hero() {
  const { experiences, skills, projects } = await getData();

  return (
    <section className="py-10">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Chap — Profile Card */}
          <div className="flex flex-col gap-6">
            <ProfileCard />
          </div>

          {/* O'rta — Work Experience + Expert Area */}
          <div className="flex flex-col gap-6">
            <WorkExperience experiences={experiences ?? []} />
            <ExpertArea skills={skills ?? []} />
          </div>

          {/* O'ng — Recent Projects */}
          <div className="flex flex-col gap-6 md:col-span-2 lg:col-span-1">
            <RecentProjects projects={projects ?? []} />
          </div>
        </div>
      </div>
    </section>
  );
}
