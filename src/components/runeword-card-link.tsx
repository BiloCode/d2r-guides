"use client";

import { Fragment, MouseEvent, useState } from "react";
import Link from "next/link";

import type { Locale } from "@/typings/locale";
import type { Runeword } from "@/typings/runeword";

import { RunewordCard } from "@/components/runeword-card";
import { RunewordDialog } from "@/components/runeword-dialog";

type Props = {
  locale: Locale;
  runeword: Runeword;
};

export const RunewordCardLink = ({ locale, runeword }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = (ev: MouseEvent<HTMLAnchorElement>) => {
    ev.preventDefault();
    setIsOpen(true);
    window.history.replaceState(null, "", ev.currentTarget.href);
  };

  const onClose = () => {
    setIsOpen(false);
    window.history.replaceState(null, "", window.location.pathname);
  };

  return (
    <Fragment>
      <Link
        className="flex-1 min-w-64 lg:min-w-80 "
        href={`/${locale}/runewords?name=${runeword.key}`}
        onClick={onClick}
      >
        <RunewordCard locale={locale} runeword={runeword} />
      </Link>
      <RunewordDialog
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
