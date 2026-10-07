import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify | Chidiadi Anyanwu",
  description:
    "Links to certifications, projects and contributions.",
};

type Item = {
  title: string;
  detail?: string;
  href?: string;
  label?: string;
};

type Group = {
  heading: string;
  items: Item[];
};

const groups: Group[] = [
  {
    heading: "Profiles",
    items: [
      {
        title: "LinkedIn",
        href: "https://www.linkedin.com/in/chidiadi-anyanwu",
        label: "View profile",
      },
      {
        title: "GitHub",
        href: "https://github.com/chidiadi01",
        label: "View profile",
      },
      {
        title: "Portfolio & Blog",
        href: "https://chidiadi-portfolio.vercel.app/",
        label: "Visit site",
      },
    ],
  },
  {
    heading: "Certifications",
    items: [
      {
        title: "Kubernetes and CLoud Native Essentials (LFS250)",
        detail: "April, 2026",
        href: "https://lnkd.in/p/enTRKyXm",
        label: "View"
      },
      {
        title: "OCI 2025 Certified DevOps Professional",
        detail: "Nov 2025",
        href: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=F7D6B550FDC46283DDC071575D82BE7649AE32864277BD8AC0BFDED669E7F340",
        label: "Verify",
      },
      {
        title: "OCI 2025 Certified Architect Associate",
        detail: "Jul 2025",
        href: "https://brm-certview.oracle.com/ords/certview/ecertificate?ssn=OC4732790&trackId=OCI25CAA&key=3c30fbf1fb3080f4ffc8c91a65c2ed755741a644",
        label: "Verify",
      },
      {
        title: "OCI 2023 Certified AI Foundations Associate",
        detail: "Nov 2023",
        href: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=460627CE694B99BC8FB96196AFA0861308C88AEABA19ED098DE6592283C5B517",
        label: "Verify",
      },
      {
        title: "OCI 2023 Certified Architect Associate",
        detail: "Sep 2023",
        href: "https://mylearn.oracle.com/ou/exam/oracle-cloud-infrastructure-2023-architect-associate-1z0-1072-23/35644/122140",
        label: "Verify",
      },
      {
        title: "OCI 2023 Certified Foundations Associate",
        detail: "Sep 2023",
        href: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=D05D101D56976D2B2888BDD497AD2638A744FFC8695F5F30CA1E14E6694D038C",
        label: "Verify",
      },
      {
        title: "Microsoft Azure Fundamentals (AZ-900)",
        detail: "Mar 2023",
        href: "https://www.credly.com/badges/691fb8d3-d5c1-4970-8b50-c77e036e0ced/linked_in_profile",
        label: "Verify",
      },
      {
        title: "Jenkins Course, KodeKloud",
        detail: "Sep 2024",
        href: "https://learn.kodekloud.com/certificate/f5b6818b-7ccd-4e49-98e4-bc2a1b393052",
        label: "Verify",
      },
      {
        title: "Huawei Certified ICT Associate (HCIA-Datacom)",
        detail: "Apr 2020",
        href: "https://www.linkedin.com/in/chidiadi-anyanwu/overlay/Certifications/2047425099/treasury/?profileId=ACoAACymyTUBUgpIjj_wXFCpESGDVdaqg-y3GKw",
        label: "Verify"
      },
    ],
  },
  {
    heading: "Projects",
    items: [
      {
        title: "SMS-Controlled Generator System",
        detail: "Final year project, embedded systems",
        href: "https://www.linkedin.com/posts/chidiadi-anyanwu_engineering-innovation-grateful-activity-7284445314223136768-yHzL?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAACymyTUBUgpIjj_wXFCpESGDVdaqg-y3GKw",
        label: "View write-up",
      },
      {
        title: "Personal Portfolio & Blog",
        detail: "Next.js, Tailwind CSS",
        href: "https://github.com/chidiadi01/simple-writer-portfolio/tree/main/01-simple-blog",
        label: "Source code",
      },
      {
        title: "National Trekkers Association Website",
        detail: "React",
        href: "https://github.com/chidiadi01/national-trekkers-association-website",
        label: "Source code",
      },
    ],
  },
  {
    heading: "Open Source Contributions",
    items: [
      {
        title: "JSON Schema: conference repo",
        detail: "Pull request #96",
        href: "https://github.com/json-schema-org/conference/pull/96",
        label: "View PR",
      },
      {
        title: "JSON Schema: website repo",
        detail: "Pull request #2404",
        href: "https://github.com/json-schema-org/website/pull/2404",
        label: "View PR",
      },
      {
        title: "Nkowa okwu / IgboAPI",
        detail: "Pull request #783",
        href: "https://github.com/nkowaokwu/igbo_api/pull/783",
        label: "View PR",
      },
      {
        title: "Nkowa okwu / IgboAPI",
        detail: "Pull request #794",
        href: "https://github.com/nkowaokwu/igbo_api/pull/794",
        label: "View PR",
      },
    ],
  },
];

export default function VerifyPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-10">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-wide text-[#1f3a5f] dark:text-blue-300">
            CHIDIADI ANYANWU
          </h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">
            Cloud &amp; Software Engineer
          </p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Links to certifications, projects and contributions.
          </p>
        </header>

        {groups.map((group) => (
          <section
            key={group.heading}
            className="mb-4 rounded-xl border border-slate-200 bg-white px-5 py-4 dark:border-slate-700 dark:bg-slate-800"
          >
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#1f3a5f] dark:text-blue-300">
              {group.heading}
            </h2>
            <ul className="divide-y divide-slate-200 dark:divide-slate-700">
              {group.items.map((item) => (
                <li
                  key={`${item.title}-${item.detail ?? ""}`}
                  className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                >
                  <span className="font-semibold">
                    {item.title}
                    {item.detail && (
                      <span className="block text-sm font-normal text-slate-600 dark:text-slate-400">
                        {item.detail}
                      </span>
                    )}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whitespace-nowrap font-semibold text-blue-700 hover:underline dark:text-blue-400"
                    >
                      {item.label ?? "Open"}
                    </a>
                  ) : (
                    <span className="whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                      No online link
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}