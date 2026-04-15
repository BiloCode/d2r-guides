"use server";

import type { Locale } from "@/typings/locale";

export const getPageParams = async (params: Promise<{ lang: string }>) => {
  const { lang } = await params;

  return {
    locale: lang as Locale,
  };
};

export const getSearchParams = async (
  params: Promise<Record<string, string | string[] | undefined>>,
) => {
  const { game, search, sockets, expansion } = await params;

  return {
    game: (game ?? "").toString(),
    search: (search ?? "").toString(),
    sockets: (sockets ?? "").toString(),
    expansion: (expansion ?? "").toString(),
  };
};
