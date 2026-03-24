import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type Props = PropsWithChildren & {
  className?: string;
};

export const Wrapper = ({ children, className }: Props) => (
  <div
    className={cn(
      "max-w-7xl w-full mx-auto py-4 px-4 md:py-8 md:px-8",
      className,
    )}
  >
    {children}
  </div>
);
