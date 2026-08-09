import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Copy,
  ExternalLink,
  MessageCircle,
  Pencil,
  Printer,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { MatchResult } from "@/lib/matching";

export type MatchResponse = {
  strong_matches: MatchResult[];
  possible_matches: MatchResult[];
  total: number;
};

function buildSummary(data: MatchResponse) {
  const lines = ["Yojana Sathi — possible schemes (not a guarantee of approval)", ""];
  const add = (title: string, items: MatchResult[]) => {
    if (!items.length) return;
    lines.push(title);
    items.forEach((m, i) => {
      lines.push(`${i + 1}. ${m.name.en} (${m.confidence}% possible match)`);
      lines.push(`   Why: ${m.reason}`);
      lines.push(`   Official portal: ${m.official_url}`);
    });
    lines.push("");
  };
  add("STRONG MATCHES", data.strong_matches);
  add("POSSIBLE MATCHES", data.possible_matches);
  lines.push("Final decisions are made by the official portal for each scheme.");
  return lines.join("\n");
}

function SchemeCard({ match, index }: { match: MatchResult; index: number }) {
  const [open, setOpen] = useState(false);
  const strong = match.match_type === "strong";

  return (
    <article
      className="rounded-lg border border-line bg-surface p-5"
      data-testid={`scheme-result-card-${index}`}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <span
          className={`label-mono ${strong ? "text-primary" : "text-possible-blue"}`}
          data-testid={`scheme-match-badge-${index}`}
        >
          {strong ? "Strong match" : "Possible match"}
        </span>
        <span className="label-mono shrink-0 text-muted-ink">{match.confidence}% confidence</span>
      </div>

      <h3 className="mt-3 text-xl font-semibold">{match.name.en}</h3>
      <p className="mt-2 text-sm text-muted-ink">{match.description}</p>

      <div className="mt-4 border-t border-line pt-4">
        <p className="label-mono text-muted-ink">Why it appeared</p>
        <p className="mt-2 text-sm">{match.reason}</p>
      </div>

      <div className="no-print mt-4 flex flex-wrap gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          data-testid={`scheme-details-toggle-${index}`}
        >
          {open ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          {open ? "Hide details" : "View details"}
        </Button>
        <a
          href={match.official_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-9 items-center gap-2 rounded-md border border-line px-3 text-sm font-medium hover:border-muted-ink"
          data-testid={`scheme-official-link-${index}`}
        >
          Official portal <ExternalLink className="size-4" />
        </a>
      </div>

      {open && (
        <div className="mt-4 border-t border-line pt-4" data-testid={`scheme-details-panel-${index}`}>
          <p className="label-mono text-muted-ink">Benefit</p>
          <p className="mt-2 text-sm">{match.benefits}</p>

          <p className="label-mono mt-4 text-muted-ink">Documents to keep ready</p>
          <ul className="mt-2 list-inside list-disc text-sm text-muted-ink">
            {match.documents.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>

          <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="label-mono text-muted-ink">Availability</dt>
              <dd className="mt-1">{match.availability}</dd>
            </div>
            <div>
              <dt className="label-mono text-muted-ink">Last verified</dt>
              <dd className="mt-1">{match.last_verified}</dd>
            </div>
          </dl>
        </div>
      )}

      <p className="hidden text-xs print:block">Official portal: {match.official_url}</p>
    </article>
  );
}

export function Results({
  data,
  onEdit,
  onStartOver,
}: {
  data: MatchResponse;
  onEdit: () => void;
  onStartOver: () => void;
}) {
  const summary = buildSummary(data);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      toast.success("Summary copied to clipboard");
    } catch {
      toast.error("Could not copy — please copy manually or use Print");
    }
  };

  const empty = data.total === 0;
  let counter = 0;

  return (
    <main className="mx-auto max-w-4xl px-5 py-10">
      <p className="label-mono text-muted-ink">Your Yojana Sathi shortlist</p>
      <h1 className="mt-5 text-3xl leading-[1.1] font-semibold sm:text-4xl">
        {empty ? (
          <>
            No close matches
            <br />
            this time.
          </>
        ) : (
          <>
            A few paths
            <br />
            worth exploring.
          </>
        )}
      </h1>

      <p aria-live="polite" className="mt-4 text-muted-ink" data-testid="results-count">
        {empty
          ? "Try reviewing your answers or checking the official welfare portal for additional options."
          : `${data.total} scheme${data.total === 1 ? "" : "s"} may be worth exploring based on the answers given.`}
      </p>
      <p className="mt-2 flex items-start gap-2 text-sm text-success-green">
        <ShieldCheck className="mt-0.5 size-4 shrink-0" />
        Nothing here is a guarantee. The official portal for each scheme makes the final decision.
      </p>

      <div className="no-print mt-6 flex flex-wrap gap-3">
        {!empty && (
          <>
            <Button variant="outline" onClick={copy} data-testid="results-copy-button">
              <Copy className="size-4" /> Copy summary
            </Button>
            <Button variant="outline" onClick={() => window.print()} data-testid="results-print-button">
              <Printer className="size-4" /> Print
            </Button>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(summary)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-9 items-center gap-2 rounded-md border border-line px-3 text-sm font-medium hover:border-muted-ink"
              data-testid="results-whatsapp-button"
            >
              <MessageCircle className="size-4" /> WhatsApp
            </a>
          </>
        )}
        <Button variant="outline" onClick={onEdit} data-testid="results-edit-button">
          <Pencil className="size-4" /> Edit answers
        </Button>
        <Button variant="ghost" onClick={onStartOver} data-testid="results-start-over-button">
          <RotateCcw className="size-4" /> Start a new check
        </Button>
      </div>

      {data.strong_matches.length > 0 && (
        <section className="mt-12" data-testid="strong-matches-section">
          <h2 className="text-xl font-semibold">Strong matches</h2>
          <p className="mt-1 text-sm text-muted-ink">These schemes line up closely with the answers.</p>
          <div className="mt-5 space-y-4">
            {data.strong_matches.map((m) => (
              <SchemeCard key={m.scheme_id} match={m} index={++counter} />
            ))}
          </div>
        </section>
      )}

      {data.possible_matches.length > 0 && (
        <section className="mt-12" data-testid="possible-matches-section">
          <h2 className="text-xl font-semibold">Possible matches</h2>
          <p className="mt-1 text-sm text-muted-ink">There may be one more detail to confirm.</p>
          <div className="mt-5 space-y-4">
            {data.possible_matches.map((m) => (
              <SchemeCard key={m.scheme_id} match={m} index={++counter} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
