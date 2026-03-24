import { cn } from "@/lib/utils";

import type { Locale } from "@/typings/locale";
import type { Runeword } from "@/typings/runeword";

import { Badge } from "@/components/ui/badge";
import { RuneImage } from "@/components/rune-image";

type Props = {
  locale: Locale;
  runeword: Runeword;
};

export const RunewordCard = ({ locale, runeword }: Props) => (
  <div
    className={cn(
      "relative z-0 w-full h-full flex flex-col p-4 md:p-5 gap-6 border-neutral-800 border-2 bg-neutral-800/50 rounded-sm hover:bg-neutral-800/80",
      {
        "border-violet-800/50": runeword.expansion === "row",
      },
    )}
  >
    <div className="w-full text-center">
      <span className="font-bold text-neutral-400">
        {runeword.name[locale]}
      </span>
      <p className="text-xs text-neutral-400">({runeword.level[locale]})</p>
    </div>
    <div className="flex-1 flex justify-center flex-wrap items-center gap-1">
      {runeword.runes.map((rune, index) => (
        <RuneImage key={index} name={rune} />
      ))}
    </div>

    <div className="min-h-5 flex flex-wrap gap-1 justify-center">
      {runeword.requires[locale].map((apply) => (
        <Badge key={apply}>{apply}</Badge>
      ))}
    </div>

    <div className="absolute top-3 left-3 grid gap-1">
      {runeword.expansion === "row" && (
        <span className="w-full px-3 md:px-4 py-0.5 rounded-xs bg-violet-800 text-gray-50 font-bold text-center text-xs">
          RoW
        </span>
      )}

      {runeword.ladder && (
        <span className="w-full px-3 md:px-4 py-0.5 rounded-xs bg-lime-600 text-gray-50 font-bold text-center text-xs">
          Ladder
        </span>
      )}
    </div>

    {Boolean(runeword.version) && (
      <span className="absolute top-3 right-2 text-gray-500/80 text-xs">
        v{runeword.version}+
      </span>
    )}
  </div>
);
