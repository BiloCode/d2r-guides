"use client";

import { ChangeEvent } from "react";

import type { Locale } from "@/typings/locale";

import { Runewords_Titles } from "@/constants/information";

import { useRunewordContext } from "@/store/runeword-context";

import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  locale: Locale;
};

export const RunewordFilter = ({ locale }: Props) => {
  const {
    runewords,
    onRunewordSearch,
    onRunewordQuantitySearch,
    onRunewordExpansionSearch,
  } = useRunewordContext();

  const onSearchChange = (ev: ChangeEvent<HTMLInputElement>) => {
    onRunewordSearch(ev.target.value ?? "");
  };

  const onQuantityChange = (value: string) => {
    onRunewordQuantitySearch(value);
  };

  const onExpansionChange = (value: string) => {
    onRunewordExpansionSearch(value);
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-wrap md:flex-nowrap gap-3 md:gap-2">
        <Field className="w-full gap-1">
          <FieldLabel
            htmlFor="search-by-name"
            className="text-xs md:text-base text-neutral-300"
          >
            {Runewords_Titles["search"][locale]}
          </FieldLabel>
          <Input
            type="search"
            id="search-by-name"
            autoComplete="off"
            className="text-xs md:text-base border-neutral-600 text-neutral-300"
            placeholder={Runewords_Titles["search_placeholder"][locale]}
            onChange={onSearchChange}
          />
        </Field>

        <Field className="flex-1 md:min-w-48 gap-1">
          <FieldLabel className="text-xs md:text-base text-neutral-300">
            {Runewords_Titles["quantity"][locale]}
          </FieldLabel>
          <Select defaultValue="any-runes" onValueChange={onQuantityChange}>
            <SelectTrigger className="text-xs md:text-base border-neutral-600 text-neutral-400">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="any-runes" className="h-6 md:h-7" />
                <SelectItem value="2-runes" className="text-xs md:text-base">
                  {Runewords_Titles["quantity_list"][0][locale]}
                </SelectItem>
                <SelectItem value="3-runes" className="text-xs md:text-base">
                  {Runewords_Titles["quantity_list"][1][locale]}
                </SelectItem>
                <SelectItem value="4-runes" className="text-xs md:text-base">
                  {Runewords_Titles["quantity_list"][2][locale]}
                </SelectItem>
                <SelectItem value="5-runes" className="text-xs md:text-base">
                  {Runewords_Titles["quantity_list"][3][locale]}
                </SelectItem>
                <SelectItem value="6-runes" className="text-xs md:text-base">
                  {Runewords_Titles["quantity_list"][4][locale]}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field className="flex-1 md:min-w-80 gap-1">
          <FieldLabel className="text-xs md:text-base text-neutral-300">
            {Runewords_Titles["expansion"][locale]}
          </FieldLabel>
          <Select
            defaultValue="any-expansion"
            onValueChange={onExpansionChange}
          >
            <SelectTrigger className="text-xs md:text-base border-neutral-600 text-neutral-400">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="any-expansion" className="h-6 md:h-7" />
                <SelectItem value="lod" className="text-xs md:text-base">
                  Lord of Destruction
                </SelectItem>
                <SelectItem value="row" className="text-xs md:text-base">
                  Reign of the Warlock
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      </div>

      {runewords.length != 0 && (
        <div className="w-full mt-4 flex justify-end">
          <p className="text-xs md:text-sm text-neutral-500">
            {Runewords_Titles["search_result"][locale]}: {runewords.length}
          </p>
        </div>
      )}
    </div>
  );
};
