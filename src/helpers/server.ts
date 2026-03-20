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
  const { details } = await params;

  if (typeof details === "undefined") {
    return {
      details: "",
    };
  }

  return {
    details,
  };
};
