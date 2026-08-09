import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { AssistedChecklist } from "@/components/AssistedChecklist";
import { METADATA } from "@/lib/schemes";
import type { Profile } from "@/lib/matching";

type Metadata = typeof METADATA;

type Answers = {
  age: string;
  state: string;
  occupation: string;
  income: string;
  category: string;
  land_status: string;
  bank_account: string;
  ration_card: string;
};

const EMPTY: Answers = {
  age: "",
  state: "",
  occupation: "",
  income: "",
  category: "",
  land_status: "",
  bank_account: "",
  ration_card: "",
};

type StepDef = {
  key: keyof Answers;
  label: string;
  labelAssisted: string;
  options?: (m: Metadata) => string[];
};

const STEPS: StepDef[] = [
  { key: "age", label: "How old are you?", labelAssisted: "How old is the person?" },
  {
    key: "state",
    label: "Which state do you live in?",
    labelAssisted: "Which state do they live in?",
    options: (m) => m.states,
  },
  {
    key: "occupation",
    label: "What best describes your work?",
    labelAssisted: "What best describes their work?",
    options: (m) => m.occupations,
  },
  {
    key: "income",
    label: "What is the household's yearly income?",
    labelAssisted: "What is the household's yearly income?",
    options: (m) => m.incomes,
  },
  {
    key: "category",
    label: "Which social category applies?",
    labelAssisted: "Which social category applies?",
    options: (m) => m.categories,
  },
  {
    key: "land_status",
    label: "What is your land status?",
    labelAssisted: "What is their land status?",
    options: (m) => m.land_statuses,
  },
  {
    key: "bank_account",
    label: "Do you have a bank account?",
    labelAssisted: "Do they have a bank account?",
    options: (m) => m.yes_no,
  },
  {
    key: "ration_card",
    label: "Does the household have a ration card?",
    labelAssisted: "Does the household have a ration card?",
    options: (m) => m.yes_no,
  },
];

export function Questionnaire({
  initial,
  initialAssisted,
  onSubmit,
  onExit,
}: {
  initial?: Profile | null;
  initialAssisted: boolean;
  onSubmit: (profile: Profile) => void;
  onExit: () => void;
}) {
  const { data: metadata } = useQuery({
    queryKey: ["metadata"],
    queryFn: async (): Promise<Metadata> => {
      const res = await fetch("/api/metadata");
      if (!res.ok) throw new Error("Failed to load options");
      return res.json();
    },
    initialData: METADATA,
  });

  const [assisted, setAssisted] = useState(initialAssisted);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState<Answers>(
    initial
      ? {
          age: String(initial.age),
          state: initial.state,
          occupation: initial.occupation,
          income: initial.income,
          category: initial.category,
          land_status: initial.land_status,
          bank_account: initial.bank_account,
          ration_card: initial.ration_card,
        }
      : EMPTY,
  );

  const current = STEPS[step]!;
  const value = answers[current.key];
  const isLast = step === STEPS.length - 1;
  const progress = Math.round(((step + 1) / STEPS.length) * 100);

  const set = (v: string) => {
    setAnswers((a) => ({ ...a, [current.key]: v }));
    setError("");
  };

  const validate = () => {
    if (!value.trim()) {
      setError("Please choose an answer to continue.");
      return false;
    }
    if (current.key === "age") {
      const n = Number(value);
      if (!Number.isFinite(n) || n < 0 || n > 120) {
        setError("Enter an age between 0 and 120.");
        return false;
      }
    }
    return true;
  };

  const next = () => {
    if (!validate()) return;
    if (isLast) {
      onSubmit({
        age: Number(answers.age),
        state: answers.state,
        occupation: answers.occupation,
        income: answers.income,
        category: answers.category,
        land_status: answers.land_status,
        bank_account: answers.bank_account,
        ration_card: answers.ration_card,
        assisted,
      });
      return;
    }
    setStep((s) => s + 1);
  };

  const options = current.options?.(metadata);

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <div className="grid gap-10 md:grid-cols-[220px_minmax(0,1fr)] md:gap-14">
        <aside className="hidden md:block">
          <p className="label-mono text-muted-ink">Progress</p>
          <ol className="mt-5 space-y-3">
            {STEPS.map((s, i) => (
              <li
                key={s.key}
                className={`flex items-center gap-3 text-sm ${
                  i === step ? "text-ink" : "text-muted-ink"
                }`}
              >
                <span
                  className={`grid size-6 shrink-0 place-items-center rounded-sm border text-[11px] ${
                    i < step
                      ? "border-success-green text-success-green"
                      : i === step
                        ? "border-primary text-primary"
                        : "border-line"
                  }`}
                >
                  {i < step ? <Check className="size-3" /> : i + 1}
                </span>
                <span className="min-w-0 truncate">{s.key.replace("_", " ")}</span>
              </li>
            ))}
          </ol>
        </aside>

        <section>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <p className="label-mono min-w-0 text-muted-ink" data-testid="questionnaire-step-indicator">
              Step {step + 1} of {STEPS.length}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={onExit}
              className="shrink-0"
              data-testid="questionnaire-exit-button"
            >
              <X className="size-4" /> Exit check
            </Button>
          </div>
          <Progress value={progress} className="mt-3" data-testid="questionnaire-step-progress" />

          <div className="mt-6 flex items-start gap-4 rounded-lg border border-line bg-surface p-4">
            <Switch
              id="assisted"
              checked={assisted}
              onCheckedChange={setAssisted}
              data-testid="assisted-workflow-switch"
            />
            <div className="min-w-0">
              <Label htmlFor="assisted" className="text-sm font-semibold">
                I&apos;m filling this in for someone else
              </Label>
              <p className="mt-1 text-sm text-muted-ink">For a citizen, client or family member</p>
            </div>
          </div>

          {assisted && <AssistedChecklist />}

          <div className="mt-8">
            <h1 className="text-2xl font-semibold sm:text-3xl" data-testid="questionnaire-question">
              {assisted ? current.labelAssisted : current.label}
            </h1>

            {options ? (
              <div
                role="radiogroup"
                aria-label={assisted ? current.labelAssisted : current.label}
                className="mt-6 grid gap-2 sm:grid-cols-2"
              >
                {options.map((opt) => {
                  const selected = value === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => set(opt)}
                      className={`flex min-h-12 items-center justify-between gap-3 rounded-md border px-4 text-left text-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                        selected
                          ? "border-primary bg-primary/5 font-semibold text-ink"
                          : "border-line bg-surface hover:border-muted-ink"
                      }`}
                      data-testid={`questionnaire-option-${opt
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/^-|-$/g, "")}`}
                    >
                      <span className="min-w-0">{opt}</span>
                      {selected && <Check className="size-4 shrink-0 text-primary" />}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="mt-6 max-w-xs">
                <Label htmlFor="age-input" className="text-sm">
                  Age in years
                </Label>
                <Input
                  id="age-input"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={120}
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  className="mt-2 min-h-12 bg-surface"
                  data-testid="questionnaire-age-input"
                />
              </div>
            )}

            <p aria-live="polite" className="mt-4 min-h-5 text-sm text-primary" data-testid="questionnaire-error">
              {error}
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <Button
                variant="outline"
                className="min-h-12"
                disabled={step === 0}
                onClick={() => {
                  setError("");
                  setStep((s) => Math.max(0, s - 1));
                }}
                data-testid="questionnaire-back-button"
              >
                <ArrowLeft className="size-4" /> Back
              </Button>
              <Button
                className="min-h-12"
                onClick={next}
                data-testid={isLast ? "questionnaire-submit-button" : "questionnaire-next-button"}
              >
                {isLast ? "Show my matches" : "Continue"}
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
