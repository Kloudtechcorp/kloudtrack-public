// ComboBox.tsx
"use client";

import * as React from "react";
import { MapPin, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

interface Location {
  value: string;
  label: string;
  location: string;
}

const locations: Location[] = [
  {
    value: "Pto Rivas Ibaba",
    label: "Pto Rivas Ibaba",
    location: "Balanga City, Bataan",
  },
  {
    value: "SvelteKit",
    label: "SvelteKit",
    location: "Balanga City, Bataan",
  },
  {
    value: "Nuxt.js",
    label: "Nuxt.js",
    location: "Balanga City, Bataan",
  },
  {
    value: "Remix",
    label: "Remix",
    location: "Balanga City, Bataan",
  },
  {
    value: "Astro",
    label: "Astro",
    location: "Balanga City, Bataan",
  },
];

interface ComboBoxProps {
  selectedLocations: string[]; // List of selected locations
  setSelectedLocations: React.Dispatch<React.SetStateAction<string[]>>; // Function to update selected locations in the parent
}

export function ComboBox({
  selectedLocations,
  setSelectedLocations,
}: ComboBoxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>("");

  const onMapPinClick = (locationValue: string) => {
    setSelectedLocations((prevState) =>
      prevState.includes(locationValue)
        ? prevState.filter((item) => item !== locationValue)
        : [...prevState, locationValue]
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="temp"
          role="combobox"
          aria-expanded={open}
          className="flex justify-start p-3"
        >
          <MapPin className="mr-2 size-5 shrink-0 " />
          <span className="font-bold text-2xl">
            {value
              ? locations.find((location) => location.value === value)?.label
              : "Select location..."}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0">
        <Command>
          <CommandInput placeholder="Search location..." />
          <CommandList>
            <CommandEmpty>No location found.</CommandEmpty>
            <CommandGroup>
              {locations.map((location) => (
                <CommandItem
                  key={location.value}
                  value={location.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <MapPin
                      className={cn(
                        "mr-2 h-4 w-4 cursor-pointer",
                        selectedLocations.includes(location.value)
                          ? "opacity-100"
                          : "opacity-10"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        onMapPinClick(location.value);
                      }}
                    />
                    <div className="flex flex-col px-2">
                      <span className="font-bold">{location.label}</span>
                      <span>{location.location}</span>
                    </div>
                  </div>
                  <Navigation
                    className={cn(
                      "h-4 w-4",
                      value === location.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
