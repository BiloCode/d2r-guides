import type { Locale } from "@/typings/locale";

export type Expansion = "lod" | "row";

export type RunewordOption = string | Record<string, string[]>;
export type Runeword = {
  key: string;
  runes: string[];
  name: Record<Locale, string>;
  level: Record<Locale, string>;
  requires: Record<Locale, string[]>;
  options?: Record<Locale, Array<RunewordOption>>;
  options_tabs?: Array<{
    key: string;
    name: Record<Locale, string>;
    items: Record<Locale, Array<RunewordOption>>;
  }>;
  ladder?: boolean;
  version?: string;
  expansion: Expansion;
  references: Record<Locale, string>;
};
