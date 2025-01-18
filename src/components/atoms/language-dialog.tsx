"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Language {
  code: string;
  label: string;
}

const languages: Language[] = [
  { code: "hi", label: "Hindi" },
  { code: "mr", label: "Marathi" },
  { code: "gu", label: "Gujarati" },
  { code: "ta", label: "Tamil" },
  { code: "kn", label: "Kannada" },
  { code: "te", label: "Telugu" },
  { code: "bn", label: "Bengali" },
  { code: "ml", label: "Malayalam" },
  { code: "pa", label: "Punjabi" },
  { code: "or", label: "Odia" },
  { code: "en", label: "English" },
  { code: "auto", label: "Auto Detect" },
];

function LanguageDialog() {
  const [selectedLanguage, setSelectedLanguage] = React.useState<Language>(
    languages[0]
  );
  const [open, setOpen] = React.useState(false);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className=" justify-between">
          Language: {selectedLanguage.label}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="pb-4">
          <DialogTitle>Select preferred language for response</DialogTitle>
        </DialogHeader>
        <div className="max-h-[300px] pr-4 overflow-auto">
          <div className="grid gap-1">
            {/* show selected language on top */}
            {
              <Button
                key={selectedLanguage.code}
                variant="default"
                className="w-full justify-start"
                onClick={() => handleLanguageSelect(selectedLanguage)}
              >
                {selectedLanguage.label}
              </Button>
            }
            {languages
              .filter((language) => language.code != selectedLanguage.code)
              .map((language) => (
                <Button
                  key={language.code}
                  variant={
                    selectedLanguage.code === language.code
                      ? "default"
                      : "ghost"
                  }
                  className="w-full justify-start"
                  onClick={() => handleLanguageSelect(language)}
                >
                  {language.label}
                </Button>
              ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LanguageDialog;
