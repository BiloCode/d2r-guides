import type { Locale } from "@/typings/locale";
import type { Runeword } from "@/typings/runeword";

import { Badge } from "@/components/ui/badge";
import { RuneIcon } from "@/components/rune-icon";

type Props = {
  locale: Locale;
  runeword: Runeword;
};

export const RunewordCard = ({ locale, runeword }: Props) => (
  <div className="w-full flex flex-col p-4 md:p-5 gap-6 bg-neutral-800/50 rounded-sm hover:bg-neutral-800/80">
    <div className="w-full text-center">
      <span className="font-bold text-neutral-400">
        {runeword.name[locale]}
      </span>
      <p className="text-xs text-neutral-400">({runeword.level[locale]})</p>
    </div>
    <div className="flex-1 flex justify-center flex-wrap items-center gap-1">
      {runeword.runes.map((rune, index) => (
        <RuneIcon key={index} name={rune} />
      ))}
    </div>
    <div className="min-h-5 flex flex-wrap gap-1 justify-center">
      {runeword.apply_on[locale].map((apply) => (
        <Badge key={apply}>{apply}</Badge>
      ))}
    </div>
  </div>
);
