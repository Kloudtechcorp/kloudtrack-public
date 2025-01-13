import { EllipsisVertical } from "lucide-react";
import { Card } from "../ui/card";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import React from "react";
import { useAWSStations } from "@/context/station";

const SelectedLocation = () => {
  const {
    stations,
    loading,
    error,
    selectedStation,
    setSelectedStation,
    favoriteLocations,
    removeFavoriteLocation,
  } = useAWSStations();

  if (loading || !stations) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === selectedStation ? "" : currentValue;
    setSelectedStation(newValue);
  };

  return (
    <div className="flex flex-wrap py-2 w-full">
      {favoriteLocations.map((favLocationId) => {
        const favStation = stations.find(
          (station) => station.id === favLocationId
        );

        return favStation ? (
          <Card
            key={favLocationId}
            className={`rounded-lg pl-3 pr-1 py-1 mr-2 mb-2 cursor-pointer flex ${
              favLocationId === selectedStation && "bg-yellow-300"
            }`}
            onClick={() => handleSelect(favLocationId)}
          >
            <div className="flex justify-between items-center w-full">
              <span>{favStation.name}</span>
              <Popover>
                <PopoverTrigger>
                  <EllipsisVertical className="size-5 cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent className="p-0 w-full">
                  <Button
                    variant="ghost"
                    onClick={() => removeFavoriteLocation(favLocationId)}
                  >
                    Remove favorite
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
        ) : null;
      })}
    </div>
  );
};

export default SelectedLocation;
