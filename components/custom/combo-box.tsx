import { Button } from "@/components/ui/button";
import { cn, truncateText } from "@/lib/utils";
import { LoaderCircleIcon, MapPin, SearchIcon, Star } from "lucide-react";
import * as React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAWSStations } from "@/hooks/context/station-context";
import { useTextColor } from "@/hooks/use-text-color";
import { motion } from "motion/react";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

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
  const textColor = useTextColor();
  const id = React.useId();
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

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

  React.useEffect(() => {
    if (inputValue) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
    setIsLoading(false);
  }, [inputValue]);

  let blur = "rgba(0, 0, 0, 0.25)";
  if (textColor === "black") blur = "rgba(255, 255, 255, 0.25)";

  if (loading || !stations)
    return (
      <Skeleton className="min-w-96 inline-flex justify-center items-center py-6 px-7  rounded-full" />
    );

  if (error) return <div>Error: {error}</div>;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="temp"
          role="combobox"
          style={{ borderColor: textColor }}
          aria-expanded={open}
          className={`inline-flex justify-center items-center gap-3 w-8 h-8 md:py-5 md:px-7 md:border rounded-full md:max-w-[360px] md:min-w-[360px] md:w-full truncate overflow-hidden`}
        >
          <MapPin
            className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0"
            style={{ color: textColor }}
          />
          <span
            className="hidden font-bold text-sm flex-1 text-center md:block"
            style={{ color: textColor }}
          >
            {selectedStation
              ? `${truncateText(
                  stations.find((location) => location.id === selectedStation)
                    ?.name || "",
                  25
                )} station`
              : "Select Station..."}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        style={{
          borderColor: textColor,
          backgroundColor: blur,
        }}
        className="md:w-[360px] w-full max-w-[360px] backdrop-blur-xl  p-0 bg-transparent max-h-[350px] h-full overflow-y-auto  transform -translate-x-10 "
        side="bottom"
      >
        <div className="*:not-first:mt-2 sticky top-0 left-0 right-0 z-10">
          <div className="relative">
            <Input
              id={id}
              className="peer ps-9 py-6 shadow-md rounded-bl-none rounded-br-none pe-9 border-none bg-white"
              placeholder="Search ..."
              type="search"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center  ps-3 peer-disabled:opacity-50">
              {isLoading ? (
                <LoaderCircleIcon
                  className="animate-spin"
                  size={16}
                  role="status"
                  aria-label="Loading..."
                />
              ) : (
                <SearchIcon size={16} aria-hidden="true" />
              )}
            </div>
          </div>
        </div>

        {stations.map((location) => (
          <div key={location.id} className="relative ">
            <div
              onClick={() => handleSelect(location.id)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2 md:order-none p-3">
                <div className="flex flex-col">
                  <h3
                    style={{ color: textColor }}
                    className="font-semibold text-sm"
                  >
                    {location.name}
                  </h3>
                  <p
                    style={{ color: textColor }}
                    className="text-xs text-muted-foreground"
                  >
                    {location.barangay}, {location.municipality}
                  </p>
                </div>
              </div>
              <motion.div
                whileTap={{ scale: 0.8 }}
                animate={{
                  scale: favoriteLocations.includes(location.id) ? 1.2 : 1,
                  color: favoriteLocations.includes(location.id)
                    ? "#FFD700"
                    : "#6B7280",
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 20,
                }}
                className="flex items-center justify-center px-2"
              >
                <Star
                  fill={
                    favoriteLocations.includes(location.id) ? "yellow" : "none"
                  }
                  className={cn(
                    "h-4 w-4 cursor-pointer",
                    favoriteLocations.includes(location.id)
                      ? "text-yellow-500"
                      : "text-gray-500"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    onFavoriteClick(location);
                  }}
                />
              </motion.div>
            </div>
            <Separator
              style={{
                backgroundColor: textColor,
              }}
            />
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
