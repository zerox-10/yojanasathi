import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SiteHeader } from "@/components/SiteHeader";
import { SCHEMES, METADATA } from "@/lib/schemes";
import { useLanguage } from "@/components/LanguageProvider";
import { getSchemeName } from "@/lib/i18n";

const title = "Browse schemes — Yojana Sathi";
const description =
  "Explore the 17 government schemes currently covered by Yojana Sathi, with official links and eligibility hints.";

export const Route = createFileRoute("/schemes")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/schemes" }],
  }),
  component: SchemesPage,
});

function SchemesPage() {
  const { lang } = useLanguage();
  const [query, setQuery] = useState("");
  const [occupation, setOccupation] = useState("All");
  const [income, setIncome] = useState("All");
  const [state, setState] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SCHEMES.filter((scheme) => {
      if (!scheme.active) return false;
      const name = getSchemeName(scheme.name, lang).toLowerCase();
      const matchesQuery =
        !q ||
        name.includes(q) ||
        scheme.description.toLowerCase().includes(q) ||
        scheme.benefits.toLowerCase().includes(q);
      const matchesOccupation =
        occupation === "All" ||
        !scheme.rules.occupation ||
        scheme.rules.occupation.includes(occupation);
      const matchesIncome =
        income === "All" || !scheme.rules.income || scheme.rules.income.includes(income);
      const matchesState =
        state === "All" || !scheme.rules.states || scheme.rules.states.includes(state);
      return matchesQuery && matchesOccupation && matchesIncome && matchesState;
    });
  }, [query, occupation, income, state, lang]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-5 py-10">
        <p className="label-mono text-muted-ink">Browse</p>
        <h1 className="mt-5 text-3xl font-semibold leading-[1.1] sm:text-4xl">
          Government schemes covered
        </h1>
        <p className="mt-3 max-w-2xl text-muted-ink">
          Explore the schemes currently in Yojana Sathi. Filters are a rough guide — always confirm
          eligibility on the official portal.
        </p>

        <div className="mt-8 grid gap-4 rounded-lg border border-line bg-surface p-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <Search
              className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-ink"
              aria-hidden="true"
            />
            <Input
              placeholder="Search schemes"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-paper pl-9"
              data-testid="schemes-search-input"
            />
          </div>
          <FilterSelect
            label="Occupation"
            value={occupation}
            options={["All", ...METADATA.occupations]}
            onChange={setOccupation}
            testid="schemes-occupation-filter"
          />
          <FilterSelect
            label="Income"
            value={income}
            options={["All", ...METADATA.incomes]}
            onChange={setIncome}
            testid="schemes-income-filter"
          />
          <FilterSelect
            label="State"
            value={state}
            options={["All", ...METADATA.states]}
            onChange={setState}
            testid="schemes-state-filter"
          />
        </div>

        <p className="mt-6 text-sm text-muted-ink" data-testid="schemes-count">
          Showing {filtered.length} of {SCHEMES.filter((s) => s.active).length} schemes
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((scheme) => (
            <article
              key={scheme.scheme_id}
              className="flex flex-col rounded-lg border border-line bg-surface p-5"
              data-testid={`scheme-browser-card-${scheme.scheme_id}`}
            >
              <h2 className="text-lg font-semibold">{getSchemeName(scheme.name, lang)}</h2>
              <p className="mt-2 flex-grow text-sm text-muted-ink">{scheme.description}</p>
              <div className="mt-4 border-t border-line pt-4">
                <p className="label-mono text-muted-ink">Key benefit</p>
                <p className="mt-1 text-sm">{scheme.benefits}</p>
              </div>
              <a
                href={scheme.official_url}
                target="_blank"
                rel="noopener noreferrer"
                className="no-print mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                data-testid={`scheme-browser-link-${scheme.scheme_id}`}
              >
                Official portal <ExternalLink className="size-4" />
              </a>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-muted-ink" data-testid="schemes-empty-state">
            No schemes match those filters. Try clearing one filter or check the official welfare
            portal.
          </p>
        )}
      </main>

      <footer className="no-print border-t border-line px-5 py-8 text-center text-xs text-muted-ink">
        Yojana Sathi is an information aid. Always check the official portal for final eligibility.
      </footer>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
  testid,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  testid: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-muted-ink">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 rounded-md border border-line bg-paper px-2 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        data-testid={testid}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
