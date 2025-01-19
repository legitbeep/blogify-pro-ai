"use client";

import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox"; // Assuming ShadCN UI has a checkbox component
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CONSTANTS } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface LanguageType {
  value: string;
  label: string;
}

interface LanguageDialogProps {
  onConfirm: (langs: LanguageType[]) => void;
  selectedLangs: LanguageType[];
  isLoading: boolean;
}

function LanguageDialog({
  onConfirm,
  selectedLangs,
  isLoading,
}: LanguageDialogProps) {
  const [selectedLanguages, setSelectedLanguages] =
    React.useState<LanguageType[]>(selectedLangs);
  const [open, setOpen] = React.useState(false);

  const handleLanguageToggle = (language: LanguageType) => {
    if (isLoading) return;
    setSelectedLanguages((prevSelected) =>
      prevSelected.includes(language)
        ? prevSelected.filter((lang) => lang.value !== language.value)
        : [...prevSelected, language]
    );
  };

  const handleTranslate = () => {
    if (isLoading) return;
    onConfirm(selectedLanguages);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="justify-between">
          Translating to: {selectedLanguages.length} lang(s)
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="pb-4">
          <DialogTitle>Select preferred languages for response</DialogTitle>
        </DialogHeader>
        <div className="max-h-[300px] pr-4 overflow-auto">
          <div className="grid gap-1">
            {CONSTANTS.LANGUAGES.map((language) => (
              <Button
                key={language.value}
                variant={
                  selectedLanguages.some(
                    (lang) => lang.value === language.value
                  )
                    ? "outline"
                    : "ghost"
                }
                className="flex items-center justify-between"
                onClick={() => handleLanguageToggle(language)}
              >
                <span>{language.label}</span>
                <Checkbox
                  checked={selectedLanguages.some(
                    (lang) => lang.value === language.value
                  )}
                />
              </Button>
            ))}
          </div>
        </div>
        <Button
          variant="default"
          className="w-full mt-4"
          onClick={handleTranslate}
          disabled={isLoading}
        >
          {isLoading ? "Translating..." : "Translate"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default LanguageDialog;
