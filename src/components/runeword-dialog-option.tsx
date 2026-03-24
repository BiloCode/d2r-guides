import type { RunewordOption } from "@/typings/runeword";

import { cn } from "@/lib/utils";

type Props = {
  option: RunewordOption;
  className?: string;
};

export const RunewordDialogOption = ({ option, className }: Props) => {
  if (typeof option === "string") {
    return (
      <p
        className={cn(
          "w-full py-1 text-xs md:text-sm font-light text-neutral-600 hover:text-neutral-900",
          className,
        )}
      >
        {option}
      </p>
    );
  }

  if (typeof option === "object") {
    return (
      <div className="w-full grid gap-4 py-2">
        {Object.keys(option).map((k, i) => (
          <div key={i} className="grid gap-2">
            <span className="font-medium">{k}</span>
            <div className="grid gap-1">
              {option[k].map((v, ii) => (
                <p
                  key={ii}
                  className={cn(
                    "text-xs md:text-sm font-light text-neutral-600 hover:text-neutral-900",
                    className,
                  )}
                >
                  {v}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return <></>;
};
