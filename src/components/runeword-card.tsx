import type { Runeword } from "@/typings/runeword";

import { Badge } from "@/components/ui/badge";
import { RuneIcon } from "@/components/rune-icon";

type Props = {
  lang: string;
  runeword: Runeword;
};

export const RunewordCard = ({ lang, runeword }: Props) => (
  <div
    key={runeword.key}
    className="flex-1 min-w-48 flex flex-col p-4 md:p-5 gap-6 bg-gray-800 rounded-sm"
  >
    <div className="w-full text-center">
      <span className="font-bold text-gray-400">{runeword.name[lang]}</span>
      <p className="text-xs text-gray-400">({runeword.level[lang]})</p>
    </div>
    <div className="flex-1 flex justify-center md:justify-start flex-wrap md:flex-nowrap md:flex-col items-center gap-1">
      {runeword.runes.map((rune, index) => (
        <RuneIcon key={index} name={rune} tooltip="left" />
      ))}
    </div>
    <div className="h-5 flex flex-row gap-1 justify-center">
      {runeword.apply_on[lang].map((apply) => (
        <Badge key={apply}>{apply}</Badge>
      ))}
    </div>
  </div>
);
