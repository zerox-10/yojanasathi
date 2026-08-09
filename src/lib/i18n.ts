import type { Lang } from "@/components/LanguageProvider";

export function getSchemeName(name: { en: string; hi: string; mr: string }, lang: Lang) {
  if (lang === "hi" && name.hi) return name.hi;
  if (lang === "mr" && name.mr) return name.mr;
  return name.en;
}

const UI: Record<string, Record<Lang, string>> = {
  startChecking: {
    en: "Start checking",
    hi: "जाँच शुरू करें",
    mr: "तपासणी सुरू करा",
  },
  impact: {
    en: "Impact",
    hi: "प्रभाव",
    mr: "प्रभाव",
  },
  schemes: {
    en: "Schemes",
    hi: "योजनाएँ",
    mr: "योजना",
  },
  language: {
    en: "Language",
    hi: "भाषा",
    mr: "भाषा",
  },
};

export function t(key: keyof typeof UI, lang: Lang) {
  return UI[key]?.[lang] ?? UI[key]?.en ?? key;
}
