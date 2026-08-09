import { SCHEMES, type Scheme, type SchemeRules } from "./schemes";

export type Profile = {
  age: number;
  state: string;
  occupation: string;
  income: string;
  category: string;
  land_status: string;
  bank_account: string;
  ration_card: string;
  assisted: boolean;
};

export type MatchResult = {
  scheme_id: string;
  name: Scheme["name"];
  description: string;
  benefits: string;
  documents: string[];
  reason: string;
  official_url: string;
  availability: string;
  last_verified: string;
  match_type: "strong" | "possible";
  confidence: number;
};

type Check = { matched: boolean; contradiction: boolean };

const NOT_SURE = "Not sure";

function listCheck(allowed: string[] | undefined, value: string): Check | null {
  if (!allowed) return null;
  if (value === NOT_SURE || !value) return { matched: false, contradiction: false };
  return { matched: allowed.includes(value), contradiction: !allowed.includes(value) };
}

function evaluate(rules: SchemeRules, p: Profile) {
  const checks: Check[] = [];

  const push = (c: Check | null) => {
    if (c) checks.push(c);
  };

  push(listCheck(rules.occupation, p.occupation));
  push(listCheck(rules.income, p.income));
  push(listCheck(rules.category, p.category));
  push(listCheck(rules.land_status, p.land_status));
  push(listCheck(rules.bank_account, p.bank_account));
  push(listCheck(rules.ration_card, p.ration_card));
  push(listCheck(rules.states, p.state));

  if (rules.age_min !== undefined || rules.age_max !== undefined) {
    const okMin = rules.age_min === undefined || p.age >= rules.age_min;
    const okMax = rules.age_max === undefined || p.age <= rules.age_max;
    const ok = okMin && okMax;
    checks.push({ matched: ok, contradiction: !ok });
  }

  const total = checks.length;
  const matched = checks.filter((c) => c.matched).length;
  const contradictions = checks.filter((c) => c.contradiction).length;
  return { total, matched, contradictions };
}

export function matchSchemes(p: Profile) {
  const strong: MatchResult[] = [];
  const possible: MatchResult[] = [];

  for (const scheme of SCHEMES) {
    if (!scheme.active) continue;
    const { total, matched, contradictions } = evaluate(scheme.rules, p);
    if (total === 0) continue;

    const ratio = matched / total;
    let type: "strong" | "possible" | null = null;

    if (contradictions === 0 && matched === total) type = "strong";
    else if (contradictions === 0 && ratio >= 0.5) type = "possible";
    else if (contradictions === 1 && total >= 3 && ratio >= 0.6) type = "possible";

    if (!type) continue;

    const confidence =
      type === "strong"
        ? Math.min(92, 78 + total * 3)
        : Math.max(45, Math.min(72, Math.round(ratio * 70) - contradictions * 5));

    const result: MatchResult = {
      scheme_id: scheme.scheme_id,
      name: scheme.name,
      description: scheme.description,
      benefits: scheme.benefits,
      documents: scheme.documents,
      reason:
        type === "strong"
          ? scheme.explanation_template
          : `${scheme.explanation_template} There may be one more detail to confirm on the official portal.`,
      official_url: scheme.official_url,
      availability: scheme.availability,
      last_verified: scheme.last_verified,
      match_type: type,
      confidence,
    };

    (type === "strong" ? strong : possible).push(result);
  }

  strong.sort((a, b) => b.confidence - a.confidence);
  possible.sort((a, b) => b.confidence - a.confidence);

  return {
    profile: p,
    strong_matches: strong,
    possible_matches: possible,
    total: strong.length + possible.length,
  };
}
