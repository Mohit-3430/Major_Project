"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

type SPECIALIZATIONS = Record<"value" | "label", string>;

const SPECIALIZATIONS = [
  {
    value: "Banking_and_Finance_Law",
    label: "Banking and Finance Law",
  },
  {
    value: "Civil_Litigation_and_Dispute_Law",
    label: "Civil Litigation and Dispute Law",
  },
  {
    value: "Corporate_Law",
    label: "Corporate Law",
  },
  {
    value: "Constitutional_Law",
    label: "Constitutional Law",
  },
  {
    value: "Consumer_Protection_Law",
    label: "Consumer Protection Law",
  },
  {
    value: "Criminal_Law",
    label: "Criminal Law",
  },
  {
    value: "Family_Law",
    label: "Family Law",
  },
  {
    value: "Human_Rights_Law",
    label: "Human Rights Law",
  },
  {
    value: "Intellectual_Property_Law",
    label: "Intellectual Property Law",
  },
  {
    value: "Property_Law",
    label: "Property Law",
  },
  {
    value: "Tax_Law",
    label: "Tax Law",
  },
] satisfies SPECIALIZATIONS[];

export function MultiSelect() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<SPECIALIZATIONS[]>([
    SPECIALIZATIONS[0],
  ]);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback(
    (specialization: SPECIALIZATIONS) => {
      setSelected((prev) =>
        prev.filter((s) => s.value !== specialization.value)
      );
    },
    []
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  const handleSelect = React.useCallback(
    (specialization: SPECIALIZATIONS) => {
      if (selected.length < 3) {
        setSelected((prev) => [...prev, specialization]);
        setInputValue("");
      }
    },
    [selected]
  );

  const selectables = SPECIALIZATIONS.filter(
    (specialization) => !selected.includes(specialization)
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex gap-1 flex-wrap">
          {selected.map((specialization) => {
            return (
              <Badge key={specialization.value} variant="secondary">
                {specialization.label}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(specialization);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(specialization)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Select upto 3"
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
      <div className="relative mt-1">
        {open && selectables.length > 0 ? (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              {selectables.map((specialization) => {
                return (
                  <CommandItem
                    key={specialization.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => handleSelect(specialization)}
                    className={"cursor-pointer"}
                  >
                    {specialization.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
}
