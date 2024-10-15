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
import { useLocationContext } from "@/app/context/locationContext";

export function ComboBox() {
  const {
    locationData,
    selectedLocation,
    setSelectedLocation,
    favoriteLocations,
    addFavoriteLocation,
    removeFavoriteLocation,
  } = useLocationContext();
  const [open, setOpen] = React.useState(false);

  const onLocationSelect = (locationValue: string) => {
    const selected = locationData.find((loc) => loc.location === locationValue);
    if (selected) {
      setSelectedLocation({ location: selected.location, area: selected.area });
    }
  };

  const onFavoriteClick = (location: { location: string; area: string }) => {
    const isAlreadyFavorite = favoriteLocations.some(
      (favLocation) => favLocation.location === location.location
    );

    if (isAlreadyFavorite) {
      removeFavoriteLocation(location);
    } else {
      addFavoriteLocation(location);
    }
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
            {selectedLocation?.location || "Select location"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0">
        <Command>
          <CommandInput placeholder="Search location..." />
          <CommandList>
            <CommandEmpty>No location found.</CommandEmpty>
            <CommandGroup>
              {locationData.map((location) => (
                <CommandItem
                  key={location.location}
                  value={location.location}
                  onSelect={() => onLocationSelect(location.location)}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <MapPin
                      className={cn(
                        "mr-2 h-4 w-4 cursor-pointer",
                        favoriteLocations.some(
                          (favLocation) =>
                            favLocation.location === location.location
                        )
                          ? "text-black"
                          : "text-gray-500"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        onFavoriteClick(location);
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
                      selectedLocation?.location === location.location
                        ? "opacity-100"
                        : "opacity-0"
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
