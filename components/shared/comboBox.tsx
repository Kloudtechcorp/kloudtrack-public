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
import { locationArray } from "@/lib/objects/arrays";
import { ComboBoxProps } from "@/lib/types";

export function ComboBox({
  selectedLocations,
  setSelectedLocations,
  setCurrentWeather,
}: ComboBoxProps) {
  const defaultLocation = locationArray[0].location;
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>(defaultLocation);
  const [isLocationSelected, setIsLocationSelected] = React.useState(false);

  const onMapPinClick = (locationValue: string) => {
    setIsLocationSelected(true);
    setSelectedLocations((prevState) => {
      if (prevState.includes(locationValue)) {
        return prevState.filter((item) => item !== locationValue);
      }
      if (prevState.length < 3) {
        return [...prevState, locationValue];
      }
      return prevState;
    });
  };

  React.useEffect(() => {
    if (isLocationSelected && value !== defaultLocation) {
    }
  }, [value, isLocationSelected, defaultLocation]);

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
              ? locationArray.find((location) => location.location === value)
                  ?.location
              : "Select location"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0">
        <Command>
          <CommandInput placeholder="Search location..." />
          <CommandList>
            <CommandEmpty>No location found.</CommandEmpty>
            <CommandGroup>
              {locationArray.map((location) => (
                <CommandItem
                  key={location.location}
                  value={location.location}
                  onSelect={(currentValue) => {
                    if (currentValue !== value) {
                      setValue(currentValue);
                      const selectedLocationData = locationArray.find(
                        (loc) => loc.location === currentValue
                      );
                      if (selectedLocationData) {
                        setCurrentWeather(selectedLocationData);
                      }
                    }
                  }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <MapPin
                      className={cn(
                        "mr-2 h-4 w-4 cursor-pointer",
                        selectedLocations.includes(location.location)
                          ? "opacity-100"
                          : "opacity-10"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        onMapPinClick(location.location);
                      }}
                    />
                    <div className="flex flex-col px-2">
                      <span className="font-bold">{location.location}</span>
                      <span>{location.area}</span>
                    </div>
                  </div>
                  <Navigation
                    className={cn(
                      "h-4 w-4",
                      value === location.location ? "opacity-100" : "opacity-0"
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
