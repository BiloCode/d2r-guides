import type { Locale } from "@/typings/locale";

export type Runeword = {
  key: string;
  runes: string[];
  name: Record<Locale, string>;
  level: Record<Locale, string>;
  details?: Record<Locale, string[]>;
  apply_on: Record<Locale, string[]>;
  details_on?: Array<{
    key: string;
    name: Record<Locale, string>;
    items: Record<Locale, string[]>;
  }>;
  references: Record<Locale, string>;
};
