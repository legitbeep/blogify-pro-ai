import { TagType } from "@/api/services/blogService";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CommandList, CommandSeparator } from "cmdk";
import {
  Calculator,
  Calendar,
  Check,
  CheckIcon,
  ChevronsUpDown,
  Circle,
  CircleCheck,
  Smile,
  Square,
  User,
} from "lucide-react";
import { useState } from "react";

// const tags = [
//   { value: "react", label: "React" },
//   { value: "typescript", label: "TypeScript" },
//   { value: "javascript", label: "JavaScript" },
//   { value: "programming", label: "Programming" },
// ];

// create blog tags with dummy data like technology, programming, etc.
const tags = [
  { value: "technology", label: "Technology" },
  { value: "programming", label: "Programming" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "health", label: "Health" },
  { value: "fitness", label: "Fitness" },
  { value: "food", label: "Food" },
  { value: "travel", label: "Travel" },
  { value: "fashion", label: "Fashion" },
  { value: "beauty", label: "Beauty" },
  { value: "education", label: "Education" },
  { value: "business", label: "Business" },
  { value: "finance", label: "Finance" },
  { value: "marketing", label: "Marketing" },
  { value: "design", label: "Design" },
  { value: "career", label: "Career" },
  { value: "job", label: "Job" },
];

interface FilterBarProps {
  onFilter: (tags: TagType[]) => void;
}

export default function FilterBar({ onFilter }: FilterBarProps) {
  const [open, setOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);

  const handleSelect = (tag: TagType) => {
    const updatedTags = selectedTags.some((t) => t.value == tag.value)
      ? selectedTags.filter((t) => t.value !== tag.value)
      : [...selectedTags, tag];
    setSelectedTags(updatedTags);
    onFilter(updatedTags);
  };

  return (
    <Popover>
      <PopoverTrigger className="">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full md:w-[200px] justify-between"
        >
          {selectedTags.length > 0
            ? `${selectedTags.length} selected`
            : "Filter by tags"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 ">
        <Command className="rounded-lg border shadow-md">
          <div className="flex flex-col gap-2 p-2 max-h-[300px] overflow-y-auto">
            {tags.map((tag) => (
              <Button
                variant={
                  selectedTags.some((t) => t.value == tag.value)
                    ? "secondary"
                    : "ghost"
                }
                onClick={() => handleSelect(tag)}
                key={tag.value}
              >
                <span>{tag?.label}</span>
                {selectedTags.some((t) => t.value == tag.value) ? (
                  <CircleCheck className="w-4 h-4 ml-auto" />
                ) : (
                  <Circle className="w-4 h-4 ml-auto" />
                )}
              </Button>
            ))}
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
