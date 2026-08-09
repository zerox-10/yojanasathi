import { useState } from "react";
import { ChevronDown, ChevronUp, ClipboardCheck } from "lucide-react";

const CHECKLIST = [
  { id: "aadhaar", label: "Aadhaar card is available or can be fetched" },
  { id: "bank", label: "Bank account / passbook details are confirmed" },
  { id: "ration", label: "Ration card status is confirmed" },
  { id: "mobile", label: "Mobile number linked to Aadhaar / bank is active" },
  { id: "income", label: "Household income band is roughly known" },
  { id: "land", label: "Land record / khatauni is available (if relevant)" },
];

export function AssistedChecklist() {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      className="mt-6 rounded-lg border border-line bg-surface p-4"
      data-testid="assisted-checklist-panel"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 text-left focus-visible:outline-none"
        aria-expanded={open}
        data-testid="assisted-checklist-toggle"
      >
        <span className="flex items-center gap-2 text-sm font-semibold">
          <ClipboardCheck className="size-4 text-primary" aria-hidden="true" />
          Helper checklist
        </span>
        {open ? (
          <ChevronUp className="size-4 text-muted-ink" />
        ) : (
          <ChevronDown className="size-4 text-muted-ink" />
        )}
      </button>

      {open && (
        <div className="mt-4 border-t border-line pt-4">
          <p className="text-sm text-muted-ink">
            Confirming these before you finish makes the shortlist more useful for the citizen.
          </p>
          <ul className="mt-3 space-y-2">
            {CHECKLIST.map((item) => (
              <li key={item.id} className="flex items-start gap-3">
                <input
                  id={`checklist-${item.id}`}
                  type="checkbox"
                  checked={!!checked[item.id]}
                  onChange={() => toggle(item.id)}
                  className="mt-0.5 size-4 accent-primary"
                  data-testid={`assisted-checklist-item-${item.id}`}
                />
                <label htmlFor={`checklist-${item.id}`} className="text-sm">
                  {item.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
