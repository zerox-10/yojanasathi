import { Globe } from "lucide-react";
import { useLanguage, type Lang } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";

const OPTIONS: { value: Lang; label: string }[] = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिन्दी" },
  { value: "mr", label: "मराठी" },
];

export function LanguageToggle({ mobile = false }: { mobile?: boolean }) {
  const { lang, setLang } = useLanguage();

  if (mobile) {
    return (
      <div className="flex flex-col gap-2" data-testid="mobile-language-toggle">
        <p className="label-mono text-muted-ink">{t("language", lang)}</p>
        <div className="flex gap-2">
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setLang(opt.value)}
              className={`rounded-md border px-3 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                lang === opt.value
                  ? "border-primary bg-primary/5 font-semibold text-ink"
                  : "border-line bg-surface hover:border-muted-ink"
              }`}
              data-testid={`mobile-language-option-${opt.value}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2" data-testid="desktop-language-toggle">
      <Globe className="size-4 text-muted-ink" aria-hidden="true" />
      <label htmlFor="language-select" className="sr-only">
        {t("language", lang)}
      </label>
      <select
        id="language-select"
        value={lang}
        onChange={(e) => setLang(e.target.value as Lang)}
        className="h-9 rounded-md border border-line bg-surface px-2 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        data-testid="language-select"
      >
        {OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
