"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn, CONSTANTS } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LanguageType } from "@/components/atoms/language-dialog";

interface LanguageSelectorProps {
  defaultValue?: string;
  onLangChange?: (lang: LanguageType) => void;
}

export function LanguageSelector({
  defaultValue,
  onLangChange,
}: LanguageSelectorProps) {
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    defaultValue ?? "en"
  );

  const handleSelectLanguage = (language: LanguageType) => {
    setSelectedLanguage(language?.value);
    setOpen(false);
    onLangChange && onLangChange(language);
    // You can perform additional actions here, such as changing the app's language
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedLanguage
            ? CONSTANTS.LANGUAGES.find(
                (lang) => lang.value === selectedLanguage
              )?.label
            : "Select language..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search language..." />
          <CommandEmpty>No language found.</CommandEmpty>
          <CommandGroup>
            {CONSTANTS.LANGUAGES.map((language) => (
              <CommandItem
                key={language.value}
                onSelect={() => handleSelectLanguage(language)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedLanguage === language.value
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {language.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
