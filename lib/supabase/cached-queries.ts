import { unstable_cache } from "next/cache";
import { createServerClient } from "@supabase/ssr";
import { ISkill, IProject, IBlog, IExperience } from "@/types";

// Cookie-siz supabase — faqat public data uchun (RLS yo'q tablalar)
const supabase = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { cookies: { getAll: () => [], setAll: () => {} } },
);

export const getSkills = unstable_cache(
  async (): Promise<ISkill[]> => {
    const { data } = await supabase
      .from("skills")
      .select("*")
      .order("order_index");
    return data ?? [];
  },
  ["skills"],
  { revalidate: 100, tags: ["skills"] },
);

export const getProjects = unstable_cache(
  async (): Promise<IProject[]> => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("order_index");
    return data ?? [];
  },
  ["projects"],
  { revalidate: 100, tags: ["projects"] },
);

export const getBlogs = unstable_cache(
  async (): Promise<IBlog[]> => {
    const { data } = await supabase
      .from("blogs")
      .select("*")
      .order("published_at", { ascending: false });
    return data ?? [];
  },
  ["blogs"],
  { revalidate: 100, tags: ["blogs"] },
);

export const getExperiences = unstable_cache(
  async (): Promise<IExperience[]> => {
    const { data } = await supabase
      .from("experiences")
      .select("*")
      .order("order_index");
    return data ?? [];
  },
  ["experiences"],
  { revalidate: 100, tags: ["experiences"] },
);
