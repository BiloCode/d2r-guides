"use client";

import { Fragment, MouseEvent, useState } from "react";

import type { Locale } from "@/typings/locale";
import type { Runeword } from "@/typings/runeword";

import { RunewordCard } from "@/components/runeword-card";
import { RunewordDialog } from "@/components/runeword-dialog";
import Link from "next/link";

type Props = {
  locale: Locale;
  runeword: Runeword;
};

export const RunewordCardLink = ({ locale, runeword }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = (ev: MouseEvent<HTMLAnchorElement>) => {
    ev.preventDefault();
    setIsOpen(true);
    window.history.pushState(null, "", ev.currentTarget.href);
  };

  const onOpenChange = (state: boolean) => {
    setIsOpen(state);
    window.history.pushState(null, "", `/${locale}`);
  };

  return (
    <Fragment>
      <Link
        className="flex-1 min-w-64 lg:min-w-80 "
        href={`/${locale}?details=${runeword.key}`}
        onClick={onClick}
      >
        <RunewordCard locale={locale} runeword={runeword} />
      </Link>
      <RunewordDialog
        open={isOpen}
        onOpenChange={onOpenChange}
        locale={locale}
        runeword={runeword}
      />
    </Fragment>
  );
};
