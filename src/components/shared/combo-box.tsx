import * as React from "react";
import { MapPin, Navigation, Star } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAWSStations } from "@/hooks/context/station-context";
import { motion } from "motion/react";

export function CustomComboBox() {
  const {
    stations,
    loading,
    error,
    selectedStation,
    setSelectedStation,
    favoriteLocations,
    addFavoriteLocation,
    removeFavoriteLocation,
  } = useAWSStations();
  const [open, setOpen] = React.useState(false);

  const handleSelect = (currentValue: string) => {
    setSelectedStation(currentValue);
    setOpen(false);
  };

  const onFavoriteClick = (location: { id: string }) => {
    const isAlreadyFavorite = favoriteLocations.includes(location.id);
    if (isAlreadyFavorite) {
      removeFavoriteLocation(location.id);
    } else {
      addFavoriteLocation(location.id);
    }
  };

  if (loading || !stations) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="temp" role="combobox" aria-expanded={open} className="flex justify-start p-3">
          <MapPin className="mr-2 size-5 shrink-0 " />
          <span className="font-bold text-xl">
            {selectedStation
              ? `${stations.find((location) => location.id === selectedStation)?.name} station`
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
                  onSelect={handleSelect}
                  className="flex items-center justify-between px-2"
                >
                  <div className="flex items-center">
                    <motion.div
                      whileTap={{ scale: 0.8 }}
                      animate={{
                        scale: favoriteLocations.includes(location.id) ? 1.2 : 1,
                        color: favoriteLocations.includes(location.id) ? "#FFD700" : "#6B7280",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 20,
                      }}
                      className="flex items-center justify-center px-2"
                    >
                      <Star
                        fill={favoriteLocations.includes(location.id) ? "yellow" : "none"}
                        className={cn(
                          "h-4 w-4 cursor-pointer",
                          favoriteLocations.includes(location.id) ? "text-yellow-500" : "text-gray-500"
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          onFavoriteClick(location);
                        }}
                      />
                    </motion.div>
                    <div className="flex items-center">
                      <div className="flex flex-col px-2">
                        <span className="font-bold">{location.name}</span>
                        <span>
                          {location.barangay}, {location.municipality}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Navigation
                    className={cn("h-4 w-4", location.id === selectedStation ? "opacity-100" : "opacity-0")}
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
