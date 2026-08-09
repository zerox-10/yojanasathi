import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { Landing } from "@/components/Landing";
import { Questionnaire } from "@/components/Questionnaire";
import { Results, type MatchResponse } from "@/components/Results";
import type { Profile } from "@/lib/matching";

const title = "Yojana Sathi — Find government schemes you may qualify for";
const description =
  "Answer a few simple questions and discover Indian government schemes you may qualify for in under 30 seconds. No account, no personal details saved.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

type Stage = "landing" | "questionnaire" | "results";

function Index() {
  const [stage, setStage] = useState<Stage>("landing");
  const [assisted, setAssisted] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [results, setResults] = useState<MatchResponse | null>(null);

  const start = (isAssisted = false) => {
    setAssisted(isAssisted);
    setProfile(null);
    setResults(null);
    setStage("questionnaire");
    window.scrollTo({ top: 0 });
  };

  const submit = async (p: Profile) => {
    setProfile(p);
    try {
      const res = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(p),
      });
      if (!res.ok) throw new Error("match failed");
      setResults(await res.json());
      setStage("results");
      window.scrollTo({ top: 0 });
    } catch {
      toast.error("Could not check schemes right now. Please try again.");
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <SiteHeader onStart={start} />

      {stage === "landing" && <Landing onStart={start} />}

      {stage === "questionnaire" && (
        <Questionnaire
          initial={profile}
          initialAssisted={assisted}
          onSubmit={submit}
          onExit={() => setStage("landing")}
        />
      )}

      {stage === "results" && results && (
        <Results
          data={results}
          onEdit={() => setStage("questionnaire")}
          onStartOver={() => {
            setProfile(null);
            setResults(null);
            setStage("landing");
          }}
        />
      )}

      <footer className="no-print border-t border-line px-5 py-8 text-center text-xs text-muted-ink">
        Yojana Sathi is an information aid. Always check the official portal for final eligibility.
      </footer>
    </div>
  );
}
