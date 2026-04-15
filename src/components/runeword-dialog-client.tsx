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

import { Tag } from "@/components/tag";
import { RunewordIcon } from "@/components/runeword-icon";
import { RunewordDialogOption } from "@/components/runeword-dialog-option";

type Props = DialogProps & {
  metadata: {
    locale: Locale;
    runeword: Runeword;
  };
};

export const RunewordDialogClient = ({
  open,
  onClose,
  metadata: { locale, runeword },
}: Props) => (
  <Dialog
    open={open}
    onOpenChange={(state) => {
      if (!state) {
        onClose();
      }
    }}
  >
    <DialogContent className="w-full md:min-w-xl gap-3">
      <DialogHeader className="w-full auto-rows-min text-center">
        <DialogTitle className="w-full text-xl md:text-2xl font-bold">
          {runeword.name[locale]}
        </DialogTitle>

        <div className="w-full auto-rows-min grid gap-2">
          <div className="flex justify-center gap-1">
            {runeword.runes.map((rune, index) => (
              <RunewordIcon key={rune + index} rune={rune} type="modal" />
            ))}
          </div>
          <DialogDescription className="w-full flex justify-center gap-1">
            {runeword.expansion === "row" && <Tag theme="violet">RoW</Tag>}
            {runeword.ladder && <Tag theme="lime">Ladder</Tag>}
          </DialogDescription>
        </div>
      </DialogHeader>

      <div className="w-full h-px bg-neutral-200"></div>

      {typeof runeword.options !== "undefined" && (
        <div className="grid cursor-default text-center">
          {runeword.options?.[locale].map((option, index) => (
            <RunewordDialogOption key={index} option={option} />
          ))}
        </div>
      )}

      {typeof runeword.options_tabs !== "undefined" && (
        <Tabs defaultValue={runeword.options_tabs[0].key} className="w-full">
          <TabsList className="self-center">
            {runeword.options_tabs.map((tab) => (
              <TabsTrigger key={tab.key} value={tab.key}>
                {tab.name[locale]}
              </TabsTrigger>
            ))}
          </TabsList>
          {runeword.options_tabs.map((tab) => (
            <TabsContent key={tab.key} value={tab.key}>
              <div className="grid cursor-default">
                {tab.items[locale].map((option, index) => (
                  <RunewordDialogOption
                    key={index}
                    option={option}
                    className="text-center"
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}

      <div className="w-full h-px bg-neutral-200"></div>

      <a
        href={runeword.references[locale]}
        target="_blank"
        className="text-xs md:text-sm text-blue-700 hover:underline text-center truncate"
      >
        {runeword.references[locale]}
      </a>
    </DialogContent>
  </Dialog>
);
