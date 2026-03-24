"use server";

import type { Locale } from "@/typings/locale";

import { getResults } from "@/helpers/search";

export const getPageParams = async (params: Promise<{ lang: string }>) => {
  const { lang } = await params;

  return {
    locale: lang as Locale,
  };
};

export const getSearchParams = async (
  params: Promise<Record<string, string | string[] | undefined>>,
) => {
  return {
    runewords: getResults((await params).search),
  };
};
