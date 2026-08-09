import { ArrowRight, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const STEPS = [
  { n: "01", title: "Profile", text: "Tell us a little about the person" },
  { n: "02", title: "Match", text: "See likely and possible schemes" },
  { n: "03", title: "Act", text: "Take the next step with confidence" },
];

export function Landing({ onStart }: { onStart: (assisted?: boolean) => void }) {
  return (
    <main className="mx-auto max-w-6xl px-5 pb-24">
      <section className="grid gap-12 pt-14 pb-16 md:grid-cols-[1.15fr_0.85fr] md:gap-16 md:pt-24">
        <div>
          <p className="label-mono text-muted-ink">Government scheme finder · India</p>
          <h1 className="mt-6 text-4xl leading-[1.05] font-semibold sm:text-5xl md:text-6xl">
            Find help.
            <br />
            Know your next step.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-ink">
            Answer a few simple questions and discover government schemes you may qualify for — in under
            30 seconds.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button size="lg" className="min-h-12" onClick={() => onStart(false)} data-testid="landing-start-button">
              Start checking
              <ArrowRight className="size-4" />
            </Button>
            <p className="flex items-center gap-2 text-sm text-success-green">
              <ShieldCheck className="size-4 shrink-0" />
              No account. No personal details saved.
            </p>
          </div>

          <p className="mt-10 max-w-xl border-t border-line pt-6 text-sm text-muted-ink">
            Built for citizens looking for support, and for the field helpers — CSC operators, NGO
            workers and Anganwadi staff — who fill these checks in on someone else&apos;s behalf.
          </p>
        </div>

        <aside id="how-it-works" className="rounded-lg border border-line bg-surface p-6 md:p-8">
          <p className="label-mono text-muted-ink">How it works</p>
          <ol className="mt-6 space-y-6">
            {STEPS.map((s) => (
              <li key={s.n} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 border-b border-line pb-5 last:border-0 last:pb-0">
                <span className="label-mono text-primary">{s.n}</span>
                <div className="min-w-0">
                  <h2 className="text-base font-semibold">{s.title}</h2>
                  <p className="mt-1 text-sm text-muted-ink">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </aside>
      </section>

      <section
        id="for-helpers"
        className="grid gap-6 rounded-lg border border-line bg-surface p-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:p-8"
        data-testid="for-helpers-section"
      >
        <div className="min-w-0">
          <p className="label-mono flex items-center gap-2 text-possible-blue">
            <Users className="size-4 shrink-0" /> For field helpers
          </p>
          <h2 className="mt-4 text-2xl font-semibold">Filling this in for someone else?</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-ink">
            Switch on assisted mode and the questions are worded for a citizen, client or family member.
            Nothing is stored — copy or print the shortlist at the end.
          </p>
        </div>
        <Button
          variant="outline"
          size="lg"
          className="min-h-12"
          onClick={() => onStart(true)}
          data-testid="landing-assisted-start-button"
        >
          Start assisted check
        </Button>
      </section>

      <p className="mt-10 text-sm text-muted-ink">
        Yojana Sathi shows possible matches only. The official portal for each scheme makes the final
        decision — always check the official portal before applying.
      </p>
    </main>
  );
}
