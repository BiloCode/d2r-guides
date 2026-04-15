import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type Props = PropsWithChildren & {
  theme: "violet" | "lime";
};

export const Tag = ({ theme, children }: Props) => (
  <span
    className={cn(
      "px-3 md:px-4 py-0.5 rounded-xs text-gray-50 font-bold text-center text-[10px] md:text-xs",
      {
        "bg-lime-600": theme === "lime",
        "bg-violet-800": theme === "violet",
      },
    )}
  >
    {children}
  </span>
);
