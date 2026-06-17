import Image from "next/image";
import Link from "next/link";
import { ProfileCard } from "@/components/public/ProfileCard";
import { getCertificates } from "@/lib/supabase/cached-queries";

export async function CertificatesContent() {
  const certificates = await getCertificates();

  return (
    <section className="py-10 pb-8">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[32%_66%] gap-[26px]">
          {/* Chap — Profile Card */}
          <div className="w-full self-start sticky top-[104px]">
            <ProfileCard />
          </div>

          {/* O'ng — Certificates */}
          <div className="w-full h-full">
            <div className="bg-card rounded-2xl border border-border shadow-[0_1px_2px_0_rgba(26,31,44,0.25)] overflow-hidden h-full">
              <div className="px-10 pt-12 pb-10">
                <div className="mb-12">
                  <h1 className="text-[40px] font-bold text-head mb-6">
                    My <span className="text-[#4770FF]">Certificates</span>
                  </h1>
                  <p className="max-w-[630px] text-lg font-semibold text-p leading-normal">
                    Courses and certifications I have completed to improve my
                    skills.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="border border-border rounded-2xl overflow-hidden hover:border-[#4770FF] transition-colors"
                    >
                      {cert.image && (
                        <div className="overflow-hidden">
                          <Image
                            src={cert.image}
                            alt={cert.title}
                            width={400}
                            height={220}
                            className="w-full h-48 p-2 rounded-2xl bg-mini-card"
                          />
                        </div>
                      )}
                      <div className="px-5 py-4">
                        <h3 className="text-lg font-semibold text-head mb-1">
                          {cert.title}
                        </h3>
                        <p className="text-sm text-p mb-3">
                          {cert.issuer} · {cert.date}
                        </p>
                        {cert.credential_link && (
                          <Link
                            href={cert.credential_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-[#4770FF] no-underline hover:opacity-80 transition"
                          >
                            View Credential →
                          </Link>
                        )}
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
