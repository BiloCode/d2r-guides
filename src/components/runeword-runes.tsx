"use client";

import { useMemo } from "react";

import { cn } from "@/lib/utils";

import { Runes } from "@/constants/runes";

import { RuneImage } from "@/components/rune-image";

import { useRunewordContext } from "@/store/runeword-context";

export const RunewordRunes = () => {
  const { query } = useRunewordContext();

  const runes = useMemo(() => {
    const keys = Object.keys(Runes);
    const result = query.search.split("+").filter((rune) => Boolean(rune));

    if (result.every((rune) => keys.includes(rune))) {
      return [...result];
    }

    return [];
  }, [query]);

  return (
    <div className="flex flex-wrap justify-center gap-1">
      {Object.values(Runes).map((rune) => (
        <button
          key={rune.order}
          type="button"
          className={cn("rounded-md p-1", {
            "bg-neutral-800": runes.includes(rune.name),
          })}
        >
          <RuneImage name={rune.name} />
        </button>
      ))}
    </div>
  );
};
