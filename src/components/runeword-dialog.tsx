"use client";

import type { Locale } from "@/typings/locale";

import type { Runeword } from "@/typings/runeword";
import type { DialogProps } from "@/typings/dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = DialogProps & {
  locale: Locale;
  runeword: Runeword;
};

export const RunewordDialog = ({ locale, runeword, ...props }: Props) => {
  return (
    <Dialog {...props}>
      <DialogContent className="w-full md:min-w-xl gap-4">
        <DialogHeader className="gap-0 text-center">
          <DialogTitle className="text-xl md:text-2xl font-bold">
            {runeword.name[locale]}
          </DialogTitle>
          <DialogDescription className="text-xs md:text-sm">
            {runeword.runes.join(" + ")}
          </DialogDescription>
        </DialogHeader>

        <div className="w-full h-px bg-neutral-200"></div>

        {typeof runeword.details !== "undefined" && (
          <div className="grid cursor-default text-center">
            {runeword.details?.[locale].map((option, index) => (
              <p
                key={index}
                className="py-1 text-sm font-light text-neutral-600 hover:text-neutral-900"
              >
                {option}
              </p>
            ))}
          </div>
        )}

        {typeof runeword.details_on !== "undefined" && (
          <Tabs defaultValue={runeword.details_on[0].key} className="w-full">
            <TabsList className="self-center">
              {runeword.details_on.map((tab) => (
                <TabsTrigger key={tab.key} value={tab.key}>
                  {tab.name[locale]}
                </TabsTrigger>
              ))}
            </TabsList>
            {runeword.details_on.map((tab) => (
              <TabsContent key={tab.key} value={tab.key}>
                <div className="grid cursor-default">
                  {tab.items[locale].map((option, index) => (
                    <p
                      key={index}
                      className="py-1 text-sm font-light text-neutral-600 hover:text-neutral-900 text-center"
                    >
                      {option}
                    </p>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}

        <div className="w-full h-px bg-neutral-200"></div>

        <div className="flex justify-center">
          <a
            href={runeword.references[locale]}
            target="_blank"
            className="text-blue-700 hover:underline text-center"
          >
            {runeword.references[locale]}
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};
