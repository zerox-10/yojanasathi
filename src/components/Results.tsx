import { Copy, Pencil, Printer, RotateCcw, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { SchemeCard } from "@/components/SchemeCard";
import { ShareDialog } from "@/components/ShareDialog";
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
            <ShareDialog summary={summary} />
            <Button variant="outline" onClick={() => window.print()} data-testid="results-print-button">
              <Printer className="size-4" /> Print
            </Button>
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
