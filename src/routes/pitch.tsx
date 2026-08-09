import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Printer, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

const title = "Pitch — Yojana Sathi";
const description = "Hackathon pitch deck for Yojana Sathi: a fast, explainable, privacy-first government scheme finder for India.";

export const Route = createFileRoute("/pitch")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/pitch" }],
  }),
  component: PitchPage,
});

const SLIDES = [
  {
    kicker: "Yojana Sathi",
    title: "Find the scheme. Know the next step.",
    body: "A fast, explainable, privacy-first screener that helps Indian citizens and field helpers discover government schemes they may qualify for.",
  },
  {
    kicker: "Problem",
    title: "Millions miss out because discovery is hard.",
    body: "Eligibility rules are scattered across portals, language is intimidating, and last-mile helpers have no quick screening tool. The result: underutilised welfare and frustrated citizens.",
  },
  {
    kicker: "Solution",
    title: "Answer 8 questions. Get a shortlist.",
    body: "Deterministic rule-based matching turns age, state, occupation, income, land, bank account and ration card answers into strong and possible scheme matches, each with a reason and an official link.",
  },
  {
    kicker: "Civic utility",
    title: "Built for citizens and field helpers.",
    body: "Assisted mode rewords questions for CSC operators, NGO workers and Anganwadi staff. Nothing is stored, so helpers can screen safely in the field.",
  },
  {
    kicker: "Impact",
    title: "Lower the first barrier.",
    body: "Faster first screening, fewer missed schemes, and a clear path to the official portal. No account, no personal data saved, no approval authority claimed.",
  },
  {
    kicker: "Tech highlights",
    title: "Lightweight and transparent.",
    body: "React + TanStack Start, deterministic matching logic, warm Swiss civic-utility design, responsive layout, print-friendly pitch deck, and 17 schemes sourced from official portals.",
  },
  {
    kicker: "Roadmap",
    title: "From demo to deployment.",
    body: "Full Hindi and Marathi UI, offline PWA support, CSC integration, and a feedback loop to keep scheme data current.",
  },
  {
    kicker: "Try it",
    title: "Scan the QR code or visit the link.",
    body: "Open the live app, run a check, and see how quickly a citizen can move from confusion to a concrete next step.",
  },
];

function PitchPage() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        setSlide((s) => Math.min(SLIDES.length - 1, s + 1));
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        setSlide((s) => Math.max(0, s - 1));
      } else if (e.key === "Home") {
        setSlide(0);
      } else if (e.key === "End") {
        setSlide(SLIDES.length - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const current = SLIDES[slide]!;

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper">
      <div className="no-print fixed top-0 right-0 left-0 z-40 border-b border-line bg-paper/95 px-5 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <p className="label-mono text-muted-ink">Yojana Sathi — pitch deck</p>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => window.print()} data-testid="pitch-print-button">
              <Printer className="size-4" /> Print
            </Button>
            <Button asChild size="sm" data-testid="pitch-home-button">
              <Link to="/">Live app</Link>
            </Button>
          </div>
        </div>
      </div>

      <main className="pitch-slide mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-5 py-24">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr] md:items-center">
          <div>
            <p className="label-mono text-primary">{current.kicker}</p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl">
              {current.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-ink">{current.body}</p>
          </div>

          {slide === SLIDES.length - 1 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-line bg-surface p-8">
              <QrCode className="size-32 text-ink" aria-hidden="true" />
              <p className="mt-4 text-center text-sm text-muted-ink">Scan to open the live app</p>
              <p className="mt-1 text-center text-xs text-muted-ink">Replace this with a real QR code before presenting.</p>
            </div>
          ) : (
            <div className="rounded-lg border border-line bg-surface p-8">
              <p className="label-mono text-muted-ink">At a glance</p>
              <ul className="mt-6 space-y-4 text-sm text-muted-ink">
                <li className="flex items-start gap-3">
                  <span className="label-mono text-primary">01</span>
                  <span>17 national schemes with official source links.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="label-mono text-primary">02</span>
                  <span>Strong / possible match classification with reasons.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="label-mono text-primary">03</span>
                  <span>Assisted mode for field helpers.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="label-mono text-primary">04</span>
                  <span>No account, no stored personal data.</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="no-print mt-16 flex items-center justify-between border-t border-line pt-6">
          <Button
            variant="outline"
            disabled={slide === 0}
            onClick={() => setSlide((s) => Math.max(0, s - 1))}
            data-testid="pitch-prev-button"
          >
            <ArrowLeft className="size-4" /> Previous
          </Button>
          <p className="label-mono text-muted-ink" data-testid="pitch-slide-indicator">
            {slide + 1} / {SLIDES.length}
          </p>
          <Button
            variant="outline"
            disabled={slide === SLIDES.length - 1}
            onClick={() => setSlide((s) => Math.min(SLIDES.length - 1, s + 1))}
            data-testid="pitch-next-button"
          >
            Next <ArrowRight className="size-4" />
          </Button>
        </div>
      </main>

      <div className="hidden print:block">
        {SLIDES.map((s, i) => (
          <section
            key={i}
            className="pitch-slide flex min-h-screen flex-col justify-center px-12 py-16"
          >
            <p className="label-mono text-primary">{s.kicker}</p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05]">{s.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-ink">{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
