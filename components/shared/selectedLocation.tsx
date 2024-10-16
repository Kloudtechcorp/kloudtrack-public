import { useLocationContext } from "@/context/locationContext";
import { EllipsisVertical } from "lucide-react";
import { Card } from "../ui/card";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const SelectedLocation = () => {
  const {
    favoriteLocations,
    selectedLocation,
    setSelectedLocation,
    removeFavoriteLocation,
  } = useLocationContext();

  const handleLocationClick = (favLocation: {
    location: string;
    area: string;
  }) => {
    setSelectedLocation(favLocation);
  };

  const handleRemoveFavorite = (favLocation: {
    location: string;
    area: string;
  }) => {
    removeFavoriteLocation(favLocation);
  };

  return (
    <div className="flex flex-wrap py-2 w-[50%]">
      {favoriteLocations.map((favLocation) => (
        <Card
          key={favLocation.location}
          className={`rounded-lg pl-3 pr-1 py-1 min-w-28 max-w-44 mr-2 mb-2 cursor-pointer flex ${
            selectedLocation?.location === favLocation.location
              ? "bg-yellow-500 font-bold"
              : ""
          }`}
          onClick={() => handleLocationClick(favLocation)}
        >
          <div className="flex justify-between items-center w-full">
            <span>{favLocation.location}</span>

            <Popover>
              <PopoverTrigger>
                <EllipsisVertical className="size-5 cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent className="p-0 w-full">
                <Button
                  variant="ghost"
                  onClick={() => handleRemoveFavorite(favLocation)}
                >
                  Remove favorite
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SelectedLocation;
