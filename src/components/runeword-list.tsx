"use client";

import type { Locale } from "@/typings/locale";

import { Runewords_Titles } from "@/constants/information";

import { RunewordCardLink } from "@/components/runeword-card-link";

import { useRunewordContext } from "@/store/runeword-context";

type Props = {
  locale: Locale;
};

export const RunewordList = ({ locale }: Props) => {
  const { runewords } = useRunewordContext();

  if (runewords.length === 0) {
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
      {runewords.map((runeword) => (
        <RunewordCardLink
          key={runeword.key}
          locale={locale}
          runeword={runeword}
        />
      ))}
    </div>
  );
};
