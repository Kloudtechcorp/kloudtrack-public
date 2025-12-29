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
    <div className="w-full sticky top-0 z-40 h-12 flex items-center bg-secondary border-b-2 border-primary px-4">
      <div className="max-w-[1600px] mx-auto w-full flex items-center gap-3">
        <div className="text-muted text-xs font-mono uppercase tracking-wider">SELECT:</div>
        <Select value={selectedStation} onValueChange={onStationChange}>
          <SelectTrigger className="w-auto min-w-[240px] h-8 border-2 border-input-border bg-input-bg hover:bg-secondary-hover text-foreground font-mono text-xs uppercase tracking-wider">
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
