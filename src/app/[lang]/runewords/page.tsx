import { Runewords_Subtitles } from "@/constants/information";

import { RunewordProvider } from "@/store/runeword-context";

import { Wrapper } from "@/components/wrapper";
import { RunewordFilter } from "@/components/runeword-filter";
import { RunewordList } from "@/components/runeword-list";
import { RunewordListIcon } from "@/components/runeword-list-icon";
import { RunewordDialogServer } from "@/components/runeword-dialog-server";

import { getPageParams, getSearchParams } from "@/helpers/server";

type Props = PageProps<"/[lang]/runewords"> & {};

export default async function RunewordsPage({ params, searchParams }: Props) {
  const { locale } = await getPageParams(params);
  const { game, search, sockets, expansion } =
    await getSearchParams(searchParams);

  return (
    <RunewordProvider
      game={game}
      search={search}
      sockets={sockets}
      expansion={expansion}
    >
      <Wrapper className="w-full">
        <div className="w-full grid gap-2 md:gap-6">
          <h1 className="w-full text-center uppercase font-bold text-base md:text-2xl tracking-widest text-neutral-400">
            {Runewords_Subtitles["runewords"][locale]}
          </h1>
          <RunewordListIcon />
          <div className="w-full">
            <div className="z-10 sticky top-0 left-0 py-3 md:py-4 bg-neutral-900">
              <RunewordFilter locale={locale} />
            </div>
            <RunewordList locale={locale} />
          </div>
        </div>
        <RunewordDialogServer locale={locale} />
      </Wrapper>
    </RunewordProvider>
  );
}
