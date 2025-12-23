
"use client";
import { StationPublicInfo } from "@/lib/types/telemetry";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

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
      <div className="max-w-7xl mx-auto w-full flex items-center">
        <Select value={selectedStation} onValueChange={onStationChange}>
          <SelectTrigger className="w-[300px] rounded-xl mr-4 bg-white/10 backdrop-blur-md backdrop-brightness-110 border border-white/40 text-white">
            <SelectValue placeholder="Select Station" />
          </SelectTrigger>
          <SelectContent>
            {stations.map((station) => (
              <SelectItem key={station.stationPublicId} value={station.stationPublicId}>
                {station.stationName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SubHeader;
