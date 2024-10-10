import React from "react";
import { Card } from "../ui/card";
import { EllipsisVertical } from "lucide-react";
import { SelectedLocationsProps } from "@/lib/types";
import { locationArray } from "@/lib/objects/arrays";

const SelectedLocations = ({
  locations,
  setCurrentWeather,
  currentWeather,
}: SelectedLocationsProps) => {
  if (locations.length === 0) return null;

  const handleLocationClick = (locationName: string) => {
    const selectedLocation = locationArray.find(
      (location) => location.location === locationName
    );
    if (selectedLocation) {
      setCurrentWeather(selectedLocation);
    }
  };

  return (
    <div className="flex flex-wrap py-2 w-[35%] ">
      {locations.map((location) => (
        <Card
          key={location}
          className={`${
            currentWeather?.location === location
              ? "font-bold bg-yellow-400"
              : "bg-white"
          } rounded-lg pl-3 pr-1 py-1 min-w-28 max-w-44 mr-2 mb-2 cursor-pointer`}
          onClick={() => handleLocationClick(location)}
        >
          <div className="flex items-center justify-between ">
            <span className="font-medium">{location}</span>
            <EllipsisVertical className="size-5" />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SelectedLocations;
