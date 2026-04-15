"use client";

import type { PropsWithChildren } from "react";
import { useCallback, useMemo, useRef, useState } from "react";
import { createContext } from "use-context-selector";

import type { Runeword } from "@/typings/runeword";

import { History } from "@/helpers/history";
import { findRunewords } from "@/helpers/search";

import { useUpdateEffect } from "@/hooks/use-update-effect";

type Props = PropsWithChildren & {
  game: string;
  search: string;
  sockets: string;
  expansion: string;
};

type Context = {
  query: {
    game: string;
    search: string;
    sockets: string;
    expansion: string;
  };
  runewords: Runeword[];
  onRunewordSearch: (search: string) => void;
  onRunewordGameSearch: (search: string) => void;
  onRunewordSocketsSearch: (search: string) => void;
  onRunewordExpansionSearch: (search: string) => void;
};

export const RunewordContext = createContext<Context>({
  query: { game: "", search: "", expansion: "", sockets: "" },
  runewords: [],
  onRunewordSearch: () => {},
  onRunewordGameSearch: () => {},
  onRunewordSocketsSearch: () => {},
  onRunewordExpansionSearch: () => {},
});

export const RunewordProvider = (props: Props) => {
  const clock = useRef<number>(-1);

  const [query, setQuery] = useState({
    game: props.game,
    search: props.search,
    sockets: props.sockets,
    expansion: props.expansion,
  });

  const [deferred, setDeferred] = useState({
    game: props.game,
    search: props.search,
    sockets: props.sockets,
    expansion: props.expansion,
  });

  const onRunewordSearch = useCallback((search: string) => {
    setQuery((prev) => ({ ...prev, search }));
  }, []);

  const onRunewordGameSearch = useCallback((search: string) => {
    const matcher: Record<string, string> = {
      ladder: "ladder",
      non_ladder: "non_ladder",
      "any-game": "",
    };

    setQuery((prev) => ({ ...prev, game: matcher[search] }));
  }, []);

  const onRunewordSocketsSearch = useCallback((search: string) => {
    const matcher: Record<string, string> = {
      "2-runes": "2",
      "3-runes": "3",
      "4-runes": "4",
      "5-runes": "5",
      "6-runes": "6",
      "any-sockets": "",
    };

    setQuery((prev) => ({ ...prev, sockets: matcher[search] }));
  }, []);

  const onRunewordExpansionSearch = useCallback((search: string) => {
    const matcher: Record<string, string> = {
      lod: "lod",
      row: "row",
      "any-expansion": "",
    };

    setQuery((prev) => ({ ...prev, expansion: matcher[search] }));
  }, []);

  useUpdateEffect(() => {
    if (clock.current != -1) {
      window.clearTimeout(clock.current);
    }

    clock.current = window.setTimeout(() => {
      setDeferred(query);
    }, 300);

    return () => {
      if (clock.current != -1) {
        window.clearTimeout(clock.current);
      }
    };
  }, [query]);

  useUpdateEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (query.search) {
      params.set("search", query.search);
    } else {
      params.delete("search");
    }

    if (query.sockets) {
      params.set("sockets", query.sockets);
    } else {
      params.delete("sockets");
    }

    if (query.expansion) {
      params.set("expansion", query.expansion);
    } else {
      params.delete("expansion");
    }

    History.replace({ params });
  }, [query]);

  const runewords = useMemo(() => {
    const resultByText = findRunewords(deferred.search);

    const resultByExpansion =
      deferred.expansion === ""
        ? resultByText
        : resultByText.filter(
            (runeword) => runeword.expansion === deferred.expansion,
          );

    const resultByQuantity =
      deferred.sockets === ""
        ? resultByExpansion
        : resultByExpansion.filter(
            (runeword) => runeword.runes.length === Number(deferred.sockets),
          );

    const resultByGame =
      deferred.game === ""
        ? resultByQuantity
        : resultByQuantity.filter((runeword) => {
            if (deferred.game === "ladder") return Boolean(runeword.ladder);
            return runeword;
          });

    return resultByGame;
  }, [deferred]);

  return (
    <RunewordContext.Provider
      value={{
        query,
        runewords,
        onRunewordSearch,
        onRunewordGameSearch,
        onRunewordSocketsSearch,
        onRunewordExpansionSearch,
      }}
    >
      {props.children}
    </RunewordContext.Provider>
  );
};
