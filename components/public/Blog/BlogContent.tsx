import Image from "next/image";
import Link from "next/link";
import { ProfileCard } from "@/components/public/ProfileCard";
import { getBlogs } from "@/lib/supabase/cached-queries";

export async function BlogContent() {
  const posts = await getBlogs();

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
                <div className="mb-6">
                  <h1 className="text-[40px] font-bold text-head mb-6 leading-[1.3]">
                    My Recent Article and Publications
                  </h1>
                  <p className="text-lg font-semibold text-p leading-normal">
                    I write about web development, best practices, and modern
                    technologies. Here you&apos;ll find tutorials, insights, and
                    thoughts on building better web applications.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="rounded-2xl overflow-hidden border border-border transition-colors hover:border-indigo-500"
                    >
                      {post.image && (
                        <div className="relative">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="block overflow-hidden group"
                          >
                            <Image
                              src={post.image}
                              alt={post.title}
                              width={600}
                              height={400}
                              className="w-full h-auto block transition-transform duration-300 group-hover:scale-[1.03]"
                            />
                          </Link>
                          {post.tag && (
                            <Link
                              href={`/blog/${post.slug}`}
                              className="absolute bottom-3 left-3 bg-white/70 text-[#212529] text-xs font-semibold px-2.5 py-1 rounded-md no-underline transition-colors hover:bg-[#4770FF] hover:text-white"
                            >
                              {post.tag}
                            </Link>
                          )}
                        </div>
                      )}
                      <div className="px-4 py-3.5">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="block text-xl font-semibold text-head no-underline leading-normal mb-2.5 transition-colors hover:text-[#4770FF]"
                        >
                          {post.title}
                        </Link>
                        <ul className="flex items-center gap-4 list-none p-0 m-0">
                          {post.read_time && (
                            <li className="text-sm text-p relative after:content-['•'] after:absolute after:-right-2.5 after:text-gray-500">
                              {post.read_time}
                            </li>
                          )}
                          <li className="text-sm text-p">
                            {new Date(post.published_at).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
