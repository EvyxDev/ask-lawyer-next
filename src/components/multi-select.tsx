
import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLocale, useTranslations } from "next-intl";

export type Option = {
  id: number;
  name: string;
};

interface MultiSelectProps {
  options: Option[];
  selected: Option[];
  onChange: (options: Option[]) => void;
  placeholder?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select items...",
  ...props
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const t = useTranslations();

  const handleUnselect = (option: Option) => {
    onChange(selected.filter((item) => item.id !== option.id));
  };
  const locale = useLocale();
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <Popover   open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          dir={direction}
          aria-expanded={open}
          className="w-full justify-between py-6 font-semibold"
        >
          <div className="flex gap-1 flex-wrap overflow-x-auto max-h-[2.5rem] items-center">
            {selected.length > 0 ? (
              selected.map((option) => (
                <Badge key={option.id} className="mr-1 mb-1">
                  {option.name}
                  <button
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(option);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleUnselect(option)}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={t("search")} />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selected.some(
                  (item) => item.id === option.id
                );
                return (
                  <CommandItem
                    key={option.id}
                    onSelect={() => {
                      onChange(
                        isSelected
                          ? selected.filter((item) => item.id !== option.id)
                          : [...selected, option]
                      );
                    }}
                  >
                    <Check
                      className={cn(
                        "ms-2 h-4 w-4",
                        isSelected ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.name}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
