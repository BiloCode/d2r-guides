import { RunesKeys } from "@/constants/runes";

export const isQueryShort = (query: string) => {
  return query.length < 2;
};

export const isQueryRunes = (query: string) => {
  const expression = query
    .split("+")
    .map((v) => v.trim())
    .filter((v) => Boolean(v));

  return expression.every((exp) => RunesKeys.includes(exp));
};
