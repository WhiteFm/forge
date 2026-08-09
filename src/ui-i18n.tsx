import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import en from "./i18n/en.json";
import ru from "./i18n/ru.json";
import type { Locale } from "./types";

export type UiKey = keyof typeof en;
type Messages = Record<UiKey, string>;
type Vars = Record<string, string | number>;

const dictionaries: Record<Locale, Messages> = { en, ru };
const LOCALE_KEY = "wsguild.forge.locale";

function format(value: string, vars?: Vars) {
  return vars ? value.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? `{${key}}`)) : value;
}

const UiContext = createContext<{ locale: Locale; setLocale: (locale: Locale) => void; t: (key: UiKey, vars?: Vars) => string } | null>(null);

export function UiProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => localStorage.getItem(LOCALE_KEY) === "ru" ? "ru" : "en");
  useEffect(() => {
    localStorage.setItem(LOCALE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);
  const value = useMemo(() => ({ locale, setLocale, t: (key: UiKey, vars?: Vars) => format(dictionaries[locale][key] ?? en[key], vars) }), [locale]);
  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUi() {
  const context = useContext(UiContext);
  if (!context) throw new Error("useUi must be used inside UiProvider");
  return context;
}
