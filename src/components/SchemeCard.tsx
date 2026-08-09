import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";
import { getSchemeName } from "@/lib/i18n";
import type { MatchResult } from "@/lib/matching";

export function SchemeCard({ match, index }: { match: MatchResult; index: number }) {
  const [open, setOpen] = useState(false);
  const { lang } = useLanguage();
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

      <h3 className="mt-3 text-xl font-semibold">{getSchemeName(match.name, lang)}</h3>
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
