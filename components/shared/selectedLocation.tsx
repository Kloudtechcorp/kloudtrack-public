import React from "react";
import { Card } from "../ui/card";
import { EllipsisVertical } from "lucide-react";

interface SelectedLocationsProps {
  locations: string[];
}

const SelectedLocations = ({ locations }: SelectedLocationsProps) => {
  if (locations.length === 0) return null;

  return (
    <div className="flex flex-wrap py-2 w-[35%] ">
      {locations.map((location) => (
        <Card
          key={location}
          className="bg-white rounded-lg pl-3 pr-1 py-1 min-w-28 max-w-44 mr-2 mb-2"
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
