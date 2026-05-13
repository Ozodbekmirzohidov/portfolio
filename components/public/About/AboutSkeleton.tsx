export function AboutSkeleton() {
  return (
    <section className="py-10 px-4 pb-8">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[32%_66%] gap-[26px]">
          {/* Chap — Profile Card skeleton */}
          <div className="bg-gray-100 rounded-2xl animate-pulse h-[520px]" />

          {/* O'ng — Content skeleton */}
          <div className="bg-white rounded-2xl border border-white/80 shadow-[0_1px_2px_0_rgba(26,31,44,0.25)] overflow-hidden">
            <div className="px-10 pt-12 pb-10 flex flex-col gap-8">
              {/* Title */}
              <div className="flex flex-col gap-4">
                <div className="h-10 w-3/4 bg-gray-100 rounded-xl animate-pulse" />
                <div className="h-6 w-full bg-gray-100 rounded-xl animate-pulse" />
                <div className="h-6 w-2/3 bg-gray-100 rounded-xl animate-pulse" />
              </div>

              {/* Counter */}
              <div className="flex items-center justify-between pb-5 border-b border-gray-100">
                <div className="flex gap-10">
                  <div className="flex flex-col gap-2">
                    <div className="h-10 w-16 bg-gray-100 rounded-xl animate-pulse" />
                    <div className="h-4 w-28 bg-gray-100 rounded-xl animate-pulse" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="h-10 w-16 bg-gray-100 rounded-xl animate-pulse" />
                    <div className="h-4 w-28 bg-gray-100 rounded-xl animate-pulse" />
                  </div>
                </div>
                <div className="w-[110px] h-[110px] bg-gray-100 rounded-full animate-pulse" />
              </div>

              {/* Skills */}
              <div className="flex flex-col gap-6">
                <div className="h-8 w-48 bg-gray-100 rounded-xl animate-pulse" />
                <div className="flex flex-wrap gap-[17.8px]">
                  {[...Array(18)].map((_, i) => (
                    <div
                      key={i}
                      className="w-20 h-20 bg-gray-100 rounded-2xl animate-pulse"
                    />
                  ))}
                </div>
              </div>

              {/* Slider */}
              <div className="h-12 w-full bg-gray-100 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
