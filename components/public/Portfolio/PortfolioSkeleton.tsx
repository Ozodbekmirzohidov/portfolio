export function PortfolioSkeleton() {
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
                <div className="h-6 w-1/2 bg-gray-100 rounded-xl animate-pulse" />
              </div>

              {/* Projects */}
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="border border-gray-100 rounded-2xl overflow-hidden animate-pulse"
                >
                  <div className="w-full h-52 bg-gray-100" />
                  <div className="flex items-center justify-between px-5 py-4 gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="h-6 w-40 bg-gray-100 rounded-lg" />
                      <div className="h-4 w-28 bg-gray-100 rounded-lg" />
                    </div>
                    <div className="flex gap-3">
                      <div className="h-5 w-24 bg-gray-100 rounded-lg" />
                      <div className="h-5 w-20 bg-gray-100 rounded-lg" />
                    </div>
                  </div>
                </div>
              ))}

              {/* Slider */}
              <div className="h-12 w-full bg-gray-100 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
