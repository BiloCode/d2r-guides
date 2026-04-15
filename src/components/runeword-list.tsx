"use client";

import { useContextSelector } from "use-context-selector";

import type { Locale } from "@/typings/locale";

import { RunewordContext } from "@/store/runeword-context";

import { Runewords_Titles } from "@/constants/information";

import { RunewordCardClient } from "@/components/runeword-card-client";

type Props = {
  locale: Locale;
};

export const RunewordList = ({ locale }: Props) => {
  const runewords = useContextSelector(RunewordContext, (v) => v.runewords);
  const runewordsList = runewords.sort((a, b) => {
    const lva = Number(a.level[locale].split(" ")[1] ?? 0);
    const lvb = Number(b.level[locale].split(" ")[1] ?? 0);
    return lva - lvb;
  });

  if (runewordsList.length === 0) {
    return (
      <div className="w-full h-64 bg-neutral-800/50 rounded-md flex justify-center items-center">
        <p className="text-xs md:text-sm text-neutral-400">
          {Runewords_Titles["search_empty"][locale]}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-wrap justify-center gap-2">
      {runewordsList.map((runeword) => (
        <RunewordCardClient
          key={runeword.key}
          locale={locale}
          runeword={runeword}
        />
      ))}
    </div>
  );
};
