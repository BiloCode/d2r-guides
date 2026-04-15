"use client";

import { Fragment, useState } from "react";
import Link from "next/link";

import type { Locale } from "@/typings/locale";
import type { Runeword } from "@/typings/runeword";

import { History } from "@/helpers/history";

import { RunewordCard } from "@/components/runeword-card";
import { RunewordDialogClient } from "@/components/runeword-dialog-client";

type Props = {
  locale: Locale;
  runeword: Runeword;
};

export const RunewordCardClient = ({ locale, runeword }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen(true);

    const params = new URLSearchParams({
      ...Object.fromEntries(new URLSearchParams(window.location.search)),
      name: runeword.key,
    });

    History.replace({ params });
  };

  const onClose = () => {
    setIsOpen(false);

    const params = new URLSearchParams(window.location.search);

    if (params.has("name")) {
      params.delete("name");
    }

    History.replace({ params });
  };

  return (
    <Fragment>
      <Link
        className="flex-1 min-w-64 lg:min-w-80 "
        href={`/${locale}/runewords?name=${runeword.key}`}
        onClick={(ev) => {
          ev.preventDefault();
          onClick();
        }}
      >
        <RunewordCard locale={locale} runeword={runeword} />
      </Link>
      <RunewordDialogClient
        open={isOpen}
        onClose={onClose}
        metadata={{
          locale,
          runeword,
        }}
      />
    </Fragment>
  );
};
