import { ArrowRight, FileSearch, MapPinHouse, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const PROBLEM_CARDS = [
  {
    icon: FileSearch,
    title: "Scattered information",
    text: "Eligibility rules sit across dozens of portals, PDFs and notices. Citizens often do not know which scheme to check first.",
  },
  {
    icon: MapPinHouse,
    title: "Last-mile gap",
    text: "Villages and urban wards rely on CSC operators, NGO staff and Anganwadi workers who have no quick, privacy-safe screening tool.",
  },
  {
    icon: Users,
    title: "Language and trust barriers",
    text: "Official language can be intimidating. Many people avoid a scheme because the first step feels complicated.",
  },
];

const APPROACH_STEPS = [
  { n: "01", title: "Answer 8 simple questions", text: "Age, state, work, income, land, bank account and ration card — no names or addresses required." },
  { n: "02", title: "See strong and possible matches", text: "Deterministic rules sort schemes into strong matches and possible matches, with clear reasons." },
  { n: "03", title: "Take the next step", text: "Every match links to the official portal, and the shortlist can be copied, printed or shared." },
];

export function ProblemSolution({ onStart }: { onStart: (assisted?: boolean) => void }) {
  return (
    <section id="problem" className="border-t border-line bg-surface/50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <p className="label-mono text-muted-ink">The real-world problem</p>
        <h2 className="mt-5 max-w-3xl text-3xl font-semibold leading-[1.1] sm:text-4xl">
          Millions of eligible households never reach the schemes meant for them.
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PROBLEM_CARDS.map((card) => (
            <div
              key={card.title}
              className="rounded-lg border border-line bg-paper p-6"
              data-testid={`problem-card-${card.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <card.icon className="size-6 text-primary" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-ink">{card.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-[1fr_1.1fr] md:items-center">
          <div>
            <p className="label-mono text-primary">Our approach</p>
            <h2 className="mt-5 text-3xl font-semibold leading-[1.1] sm:text-4xl">
              A fast, explainable, privacy-first screener.
            </h2>
            <p className="mt-5 max-w-xl text-muted-ink">
              Yojana Sathi does not decide eligibility. It lowers the first barrier by translating a
              few plain facts into a shortlist of schemes worth checking officially.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button size="lg" className="min-h-12" onClick={() => onStart(false)} data-testid="problem-start-button">
                Start checking
                <ArrowRight className="size-4" />
              </Button>
              <p className="flex items-center gap-2 text-sm text-success-green">
                <ShieldCheck className="size-4 shrink-0" />
                No account. No personal details saved.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-line bg-paper p-6 md:p-8">
            <ol className="space-y-6">
              {APPROACH_STEPS.map((s) => (
                <li
                  key={s.n}
                  className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 border-b border-line pb-5 last:border-0 last:pb-0"
                >
                  <span className="label-mono text-primary">{s.n}</span>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold">{s.title}</h3>
                    <p className="mt-1 text-sm text-muted-ink">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
