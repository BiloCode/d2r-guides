"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import type { Locale } from "@/typings/locale";

import { History } from "@/helpers/history";

import { Runewords } from "@/constants/runewords";

import { RunewordDialogClient } from "@/components/runeword-dialog-client";

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

  const onClose = () => {
    setIsOpen(false);

    const params = new URLSearchParams(window.location.search);

    if (params.has("name")) {
      params.delete("name");
    }

    History.replace({ params });
  };

  return (
    <RunewordDialogClient
      open={isOpen}
      onClose={onClose}
      metadata={{
        locale,
        runeword: Runewords[paramsId],
      }}
    />
  );
};
