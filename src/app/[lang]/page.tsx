import { Runes } from "@/constants/runes";
import { Runewords } from "@/constants/runewords";

import { RuneIcon } from "@/components/rune-icon";
import { RunewordCardLink } from "@/components/runeword-card-link";
import { RunewordDialogShare } from "@/components/runeword-dialog-share";

import { getPageParams } from "@/helpers/server";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { locale } = await getPageParams(params);

  return (
    <div className="max-w-7xl mx-auto min-h-dvh py-6 px-6 md:py-8 md:px-8">
      <div className="w-full grid gap-6 md:gap-8">
        <span className="font-bold text-neutral-400">Lista de runas</span>

        <div className="flex flex-wrap justify-center gap-2">
          {Object.values(Runes).map((rune) => (
            <RuneIcon key={rune.order} name={rune.name} />
          ))}
        </div>

        <span className="font-bold text-neutral-400">
          Lista de palabras runicas
        </span>

        <div className="w-full flex flex-wrap justify-center gap-2">
          {Object.values(Runewords).map((runeword) => (
            <RunewordCardLink
              key={runeword.key}
              locale={locale}
              runeword={runeword}
            />
          ))}
        </div>
      </div>

      <RunewordDialogShare locale={locale} />
    </div>
  );
}
