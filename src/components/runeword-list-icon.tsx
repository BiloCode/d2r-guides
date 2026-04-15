"use client";

import { useMemo } from "react";
import { useContextSelector } from "use-context-selector";

import { cn } from "@/lib/utils";
import { isQueryRunes } from "@/helpers/matcher";

import { Runes } from "@/constants/runes";

import { RunewordIcon } from "@/components/runeword-icon";

import { RunewordContext } from "@/store/runeword-context";

export const RunewordListIcon = () => {
  const query = useContextSelector(RunewordContext, (s) => s.query);
  const onRunewordSearch = useContextSelector(
    RunewordContext,
    (s) => s.onRunewordSearch,
  );

  const onClick = (rune: string) => {
    if (isQueryRunes(query.search)) {
      let search = query.search.split("+").filter((v) => Boolean(v));

      if (search.includes(rune)) {
        search = search.filter((v) => v != rune);
      } else {
        search = [...search, rune];
      }

      onRunewordSearch(search.join("+"));
      return;
    }

    onRunewordSearch(rune);
  };

  const runes = useMemo(() => {
    if (isQueryRunes(query.search)) return query.search.split("+");
    return [];
  }, [query.search]);

  return (
    <div className="flex flex-wrap justify-center gap-1">
      {Object.values(Runes).map((rune) => (
        <button
          key={rune.name}
          type="button"
          onClick={() => onClick(rune.name)}
          className={cn("rounded-md cursor-pointer p-1 hover:bg-neutral-800", {
            "bg-neutral-800": runes.includes(rune.name),
          })}
        >
          <RunewordIcon rune={rune.name} />
        </button>
      ))}
    </div>
  );
};
