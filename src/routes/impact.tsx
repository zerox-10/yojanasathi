import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, FileCheck, Printer, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";

const title = "Impact — Yojana Sathi";
const description = "How Yojana Sathi helps citizens and field helpers discover government schemes faster, without storing personal data.";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/impact" }],
  }),
  component: ImpactPage,
});

function ImpactPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-5 py-14 md:py-20">
        <p className="label-mono text-muted-ink">Impact</p>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.1] sm:text-5xl">
          Closing the gap between schemes and citizens.
        </h1>

        <section className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="rounded-lg border border-line bg-surface p-6">
            <Users className="size-6 text-primary" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-semibold">Who this is for</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-ink">
              <li>Citizens unsure which schemes they can check.</li>
              <li>CSC operators, NGO workers and Anganwadi staff helping others.</li>
              <li>Local governments and help-desks that need a quick first screen.</li>
            </ul>
          </div>

          <div className="rounded-lg border border-line bg-surface p-6">
            <FileCheck className="size-6 text-success-green" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-semibold">What changes</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-ink">
              <li>Faster first screening — under 30 seconds.</li>
              <li>Explainable matches with official links.</li>
              <li>No account, no storage of names, addresses or Aadhaar.</li>
            </ul>
          </div>
        </section>

        <section className="mt-12 rounded-lg border border-line bg-surface p-6 md:p-8">
          <p className="label-mono text-primary">Trust and sources</p>
          <h2 className="mt-4 text-2xl font-semibold">Built from official information</h2>
          <p className="mt-3 text-muted-ink">
            Every scheme links to its official portal and carries a last-verified date. Yojana Sathi is
            an information aid, not an approval authority. Final eligibility always rests with the
            official scheme portal.
          </p>
          <div className="mt-6 flex items-start gap-2 text-sm text-success-green">
            <ShieldCheck className="mt-0.5 size-4 shrink-0" />
            No personal data is stored on any server.
          </div>
        </section>

        <section className="mt-12">
          <p className="label-mono text-muted-ink">Roadmap</p>
          <h2 className="mt-4 text-2xl font-semibold">Where this can go</h2>
          <ol className="mt-6 space-y-4">
            {[
              "Full Hindi and Marathi UI translations, with scheme names already supported.",
              "Offline-first PWA for field workers with intermittent connectivity.",
              "CSC and state-helpline integration so helpers can book appointments from the shortlist.",
              "A feedback loop for citizens and workers to flag outdated schemes or missing local variants.",
            ].map((item, i) => (
              <li key={i} className="flex gap-4 text-sm text-muted-ink">
                <span className="label-mono text-primary">{String(i + 1).padStart(2, "0")}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </section>

        <div className="no-print mt-12 flex flex-wrap gap-4">
          <Button asChild size="lg" className="min-h-12" data-testid="impact-start-button">
            <Link to="/">
              Start checking <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="min-h-12"
            onClick={() => window.print()}
            data-testid="impact-print-button"
          >
            <Printer className="size-4" /> Print this page
          </Button>
        </div>
      </main>

      <footer className="no-print border-t border-line px-5 py-8 text-center text-xs text-muted-ink">
        Yojana Sathi is an information aid. Always check the official portal for final eligibility.
      </footer>
    </div>
  );
}
