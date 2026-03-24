"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import type { Locale } from "@/typings/locale";

import { Runewords } from "@/constants/runewords";

import { RunewordDialog } from "@/components/runeword-dialog";

type Props = {
  locale: Locale;
};

export const RunewordDialogServer = ({ locale }: Props) => {
  const params = useSearchParams();
  const paramsId = params.get("name") ?? undefined;

  const [isOpen, setIsOpen] = useState(() => {
    if (typeof paramsId === "undefined") {
      return false;
    }

    if (typeof Runewords[paramsId] === "undefined") {
      return false;
    }

    return true;
  });

  if (typeof paramsId === "undefined") {
    return <></>;
  }

  if (typeof Runewords[paramsId] === "undefined") {
    return <></>;
  }

  return (
    <RunewordDialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
        window.history.replaceState(null, "", window.location.pathname);
      }}
      metadata={{
        locale,
        runeword: Runewords[paramsId],
      }}
    />
  );
};
