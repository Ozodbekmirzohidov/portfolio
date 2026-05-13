export function ServicesSkeleton() {
  return (
    <section className="py-10 px-4 pb-8">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[32%_66%] gap-[26px]">
          <div className="bg-gray-100 rounded-2xl animate-pulse h-[520px]" />

          <div className="bg-white rounded-2xl border border-white/80 shadow-[0_1px_2px_0_rgba(26,31,44,0.25)] overflow-hidden">
            <div className="px-10 pt-12 pb-10 flex flex-col gap-8">
              {/* Title */}
              <div className="flex flex-col gap-4">
                <div className="h-10 w-1/2 bg-gray-100 rounded-xl animate-pulse" />
                <div className="h-6 w-2/3 bg-gray-100 rounded-xl animate-pulse" />
              </div>

              {/* Services grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-3 p-6 border border-gray-100 rounded-2xl animate-pulse"
                  >
                    <div className="w-[70px] h-[70px] bg-gray-100 rounded-[14px]" />
                    <div className="h-4 w-24 bg-gray-100 rounded-lg" />
                  </div>
                ))}
              </div>

              {/* FAQ */}
              <div className="flex flex-col gap-4">
                <div className="h-8 w-64 bg-gray-100 rounded-xl animate-pulse" />
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-16 w-full bg-gray-100 rounded-xl animate-pulse"
                  />
                ))}
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
