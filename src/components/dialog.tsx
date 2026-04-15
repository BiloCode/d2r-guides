"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Props = PropsWithChildren & {
  open: boolean;
  onClose?: () => void;
  maxWidth?: number;
  minWidth?: number;
};

const Dialog = ({ open, children, maxWidth, minWidth, onClose }: Props) => {
  const [isVisible, setIsVisible] = useState(open);
  const [isRenderer, setIsRenderer] = useState(open);

  useEffect(() => {
    if (open) {
      setIsRenderer(true);
      window.setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      window.setTimeout(() => setIsRenderer(false), 300);
    }
  }, [open]);

  if (!isRenderer) {
    return null;
  }

  return (
    <div
      className={cn("fixed inset-0 z-10 transition-opacity duration-300", {
        "opacity-0": !isVisible,
        "opacity-100": isVisible,
      })}
    >
      <div onClick={onClose} className="absolute inset-0 bg-black/50" />
      <div className="fixed inset-0 flex items-end justify-center md:items-center md:p-4 pointer-events-none">
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            minWidth,
            maxWidth,
          }}
          className={cn(
            `w-auto transform max-w-md rounded-t-2xl md:rounded-2xl bg-white shadow-xl transition-all duration-300 ease-out pointer-events-auto`,
            {
              "translate-y-0 md:translate-y-0 scale-100 opacity-100": isVisible,
              "translate-y-full md:translate-y-0 scale-95 md:scale-95 opacity-0":
                !isVisible,
            },
          )}
        >
          <div className="max-h-[70vh]">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
