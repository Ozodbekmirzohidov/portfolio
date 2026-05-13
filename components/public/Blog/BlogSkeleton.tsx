export function BlogSkeleton() {
  return (
    <section className="py-10 px-4 pb-8">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[32%_66%] gap-[26px]">
          <div className="bg-gray-100 rounded-2xl animate-pulse h-[520px]" />

          <div className="bg-white rounded-2xl border border-white/80 shadow-[0_1px_2px_0_rgba(26,31,44,0.25)] overflow-hidden">
            <div className="px-10 pt-12 pb-10 flex flex-col gap-8">
              {/* Title */}
              <div className="flex flex-col gap-4">
                <div className="h-10 w-3/4 bg-gray-100 rounded-xl animate-pulse" />
                <div className="h-6 w-full bg-gray-100 rounded-xl animate-pulse" />
                <div className="h-6 w-2/3 bg-gray-100 rounded-xl animate-pulse" />
              </div>

              {/* Blog grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl overflow-hidden border border-gray-100 animate-pulse"
                  >
                    <div className="w-full h-44 bg-gray-100" />
                    <div className="px-4 py-3.5 flex flex-col gap-3">
                      <div className="h-5 w-full bg-gray-100 rounded-lg" />
                      <div className="h-5 w-3/4 bg-gray-100 rounded-lg" />
                      <div className="flex gap-4">
                        <div className="h-4 w-20 bg-gray-100 rounded-lg" />
                        <div className="h-4 w-24 bg-gray-100 rounded-lg" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
