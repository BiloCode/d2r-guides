import Fuse from "fuse.js";

import { Locales } from "@/constants/locale";
import { Runewords } from "@/constants/runewords";

import { isQueryShort, isQueryRunes } from "./matcher";

export const findRunewords = (search: unknown) => {
  const list = Object.values(Runewords);
  const query = String(search ?? "")
    .toLowerCase()
    .trim();

  if (isQueryShort(query)) {
    return list;
  }

  if (isQueryRunes(query)) {
    const parts = query.split("+").filter((part) => Boolean(part));

    return list.filter((runeword) =>
      parts.some((s) => runeword.runes.includes(s)),
    );
  }

  const fuse = new Fuse(list, {
    keys: Locales.map((locale) => `name.${locale}`),
    threshold: 0.1,
  });

  return fuse.search(query).map((r) => r.item);
};
