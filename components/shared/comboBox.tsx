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
import { useLocationContext } from "@/context/locationContext";
import { useAWSStations } from "@/context/station";

export function ComboBox() {
  const { stations, loading, error } = useAWSStations();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  if (loading || !stations) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
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
          <span className="font-bold text-xl">
            {value
              ? `${
                  stations.find((location) => location.id === value)?.name
                } station`
              : "Select Station..."}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0">
        <Command>
          <CommandInput placeholder="Search location..." />
          <CommandList>
            <CommandEmpty>No location found.</CommandEmpty>
            <CommandGroup>
              {stations.map((location) => (
                <CommandItem
                  key={location.id}
                  value={location.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    {/* <MapPin
                      className={cn(
                        "mr-2 h-4 w-4 cursor-pointer",
                        favoriteLocations.some(
                          (favLocation) => favLocation.location === location.id
                        )
                          ? "text-black"
                          : "text-gray-500"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        onFavoriteClick(location);
                      }}
                    /> */}
                    <div className="flex flex-col px-2">
                      <span className="font-bold">{location.name}</span>
                      <span>
                        {location.barangay}, {location.municipality}
                      </span>
                    </div>
                  </div>

                  <Navigation
                    className={cn(
                      "h-4 w-4",
                      location?.id === location.id ? "opacity-100" : "opacity-0"
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
