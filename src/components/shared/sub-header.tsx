"use client";
import { StationPublicInfo } from "@/types/telemetry";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface SubHeaderProps {
  stations: StationPublicInfo[];
  selectedStation: string;
  onStationChange: (stationId: string) => void;
}

const SubHeader: React.FC<SubHeaderProps> = ({ stations, selectedStation, onStationChange }) => {
  return (
    <div className="w-full sticky top-0 z-40 h-12 flex items-center bg-zinc-900 border-b-2 border-zinc-800 px-4">
      <div className="max-w-[1600px] mx-auto w-full flex items-center gap-3">
        <div className="text-zinc-600 text-xs font-mono uppercase tracking-wider">SELECT:</div>
        <Select value={selectedStation} onValueChange={onStationChange}>
          <SelectTrigger className="w-auto min-w-[240px] h-8 border-2 border-zinc-800 bg-zinc-950 hover:bg-zinc-900 hover:border-zinc-700 text-white font-mono text-xs uppercase tracking-wider transition-colors">
            <SelectValue placeholder="[NO STATION]" />
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
