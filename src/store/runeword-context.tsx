"use client";

import type { PropsWithChildren } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import type { Runeword } from "@/typings/runeword";

import { debounce } from "@/helpers/debounce";
import { getResults } from "@/helpers/search";

type Props = PropsWithChildren & {
  runewords: Runeword[];
};

type Context = {
  query: {
    search: string;
    quantity: string;
    expansion: string;
  };
  runewords: Runeword[];
  onRunewordSearch: (search: string) => void;
  onRunewordGameSearch: (search: string) => void;
  onRunewordQuantitySearch: (search: string) => void;
  onRunewordExpansionSearch: (search: string) => void;
};

export const RunewordContext = createContext<Partial<Context>>({});

export const RunewordProvider = (props: Props) => {
  const [query, setQuery] = useState({
    game: "",
    search: "",
    quantity: "",
    expansion: "",
  });

  const runewords = useMemo(() => {
    const searchByText = getResults(query.search);

    const searchByExpansion =
      query.expansion === ""
        ? searchByText
        : searchByText.filter(
            (runeword) => runeword.expansion === query.expansion,
          );

    const searchByQuantity =
      query.quantity === ""
        ? searchByExpansion
        : searchByExpansion.filter(
            (runeword) => runeword.runes.length === Number(query.quantity),
          );

    const searchByGame =
      query.game === ""
        ? searchByQuantity
        : searchByQuantity.filter((runeword) => {
            if (query.game === "ladder") return Boolean(runeword.ladder);
            return runeword;
          });

    return searchByGame;
  }, [query]);

  const onRunewordSearch = useMemo(
    () =>
      debounce((search: string) => {
        setQuery((prev) => ({ ...prev, search }));
      }, 300),
    [],
  );

  const onRunewordGameSearch = useCallback((search: string) => {
    const matcher: Record<string, string> = {
      ladder: "ladder",
      non_ladder: "non_ladder",
      "any-game": "",
    };

    setQuery((prev) => ({ ...prev, game: matcher[search] }));
  }, []);

  const onRunewordQuantitySearch = useCallback((search: string) => {
    const matcher: Record<string, string> = {
      "2-runes": "2",
      "3-runes": "3",
      "4-runes": "4",
      "5-runes": "5",
      "6-runes": "6",
      "any-runes": "",
    };

    setQuery((prev) => ({ ...prev, quantity: matcher[search] }));
  }, []);

  const onRunewordExpansionSearch = useCallback((search: string) => {
    const matcher: Record<string, string> = {
      lod: "lod",
      row: "row",
      "any-expansion": "",
    };

    setQuery((prev) => ({ ...prev, expansion: matcher[search] }));
  }, []);

  return (
    <RunewordContext.Provider
      value={{
        query,
        runewords,
        onRunewordSearch,
        onRunewordGameSearch,
        onRunewordQuantitySearch,
        onRunewordExpansionSearch,
      }}
    >
      {props.children}
    </RunewordContext.Provider>
  );
};

export const useRunewordContext = () => useContext(RunewordContext) as Context;
