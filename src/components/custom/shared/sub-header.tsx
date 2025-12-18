import React from "react";
import { StationPublicInfo } from "@/lib/types/telemetry";

interface SubHeaderProps {
  stations: StationPublicInfo[];
  selectedStation: string;
  onStationChange: (stationId: string) => void;
}

const SubHeader: React.FC<SubHeaderProps> = ({ stations, selectedStation, onStationChange }) => {
  return (
    <div
      className="
        w-full
        sticky top-0 z-50 h-16
        flex items-center text-center
        bg-slate-900/45
        backdrop-blur-md backdrop-brightness-110
        border-b border-white/10
        px-4
      "
    >
      <span className="font-semibold mr-4">Station:</span>
      <select
        className="border p-2 mr-4 bg-slate-800 text-white rounded"
        value={selectedStation}
        onChange={e => onStationChange(e.target.value)}
      >
        <option value="">Select Station</option>
        {stations.map((station) => (
          <option key={station.stationPublicId} value={station.stationPublicId}>
            {station.stationName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SubHeader;
