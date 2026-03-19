"use client";

import { Runes } from "@/constants/runes";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  name: string;
  tooltip: "left" | "right" | "top" | "bottom";
};

export const RuneIcon = ({ name, tooltip }: Props) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <div className="size-8 md:size-12 shrink-0">
        <img
          src={`/images/${name}_rune.png`}
          alt={`${name} rune`}
          width={48}
          height={48}
          className="size-8 md:size-12"
          loading="lazy"
          style={{
            imageRendering: "pixelated",
          }}
        />
      </div>
    </TooltipTrigger>
    <TooltipContent side={tooltip}>
      <span className="font-bold uppercase">{Runes[name].name}</span>
    </TooltipContent>
  </Tooltip>
);
