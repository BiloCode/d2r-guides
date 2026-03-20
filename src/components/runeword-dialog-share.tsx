"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import type { Locale } from "@/typings/locale";

import { Runewords } from "@/constants/runewords";

import { RunewordDialog } from "@/components/runeword-dialog";

type Props = {
  locale: Locale;
};

export const RunewordDialogShare = ({ locale }: Props) => {
  const router = useRouter();
  const params = useSearchParams();

  const [isOpen, setIsOpen] = useState(params.get("details") !== null);

  if (params.get("details") === null) {
    return <></>;
  }

  const runeword_key = params.get("details") as string;
  const runeword = Runewords[runeword_key];

  const onOpenChange = (state: boolean) => {
    if (!state) {
      setIsOpen(false);
      setTimeout(() => {
        router.push(`/${locale}`, { scroll: false });
      }, 300);
    }
  };

  return (
    <RunewordDialog
      locale={locale}
      runeword={runeword}
      open={isOpen}
      onOpenChange={onOpenChange}
    />
  );
};
