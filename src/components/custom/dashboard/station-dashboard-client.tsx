"use client";
import { useState } from "react";
import type { TelemetryPublicDTO } from "@/lib/types/telemetry";
import SubHeader from "@/components/custom/shared/sub-header";
import StationCurrentWeatherCard from "./station-current-weather-card";
import StationMapboxLocation from "./station-mapbox-location";
import StationWeatherDetail from "./station-weather-detail";
import { StationPublicInfo } from "@/lib/types/telemetry";




import type { TelemetryHistoryDTO } from "@/lib/types/telemetry";

interface Props {
  stations: StationPublicInfo[];
  telemetryRecord: Record<string, TelemetryPublicDTO | null>;
  historyRecord: Record<string, TelemetryHistoryDTO | null>;
}




export default function StationDashboardClient({ stations, telemetryRecord, historyRecord }: Props) {
  const [selectedStationId, setSelectedStationId] = useState(
    stations.length > 0 ? stations[0].stationPublicId : ""
  );
  const selectedStation = stations.find(s => s.stationPublicId === selectedStationId) || null;
  const telemetryData = selectedStation ? telemetryRecord[selectedStation.stationPublicId] : null;
  const historyData = selectedStation ? historyRecord[selectedStation.stationPublicId] : null;

  return (
    <>
      <SubHeader
        stations={stations}
        selectedStation={selectedStationId}
        onStationChange={setSelectedStationId}
      />
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-4 mt-8">
        <div className="text-white text-xl">
          <p>
            {selectedStation
              ? [selectedStation.city, selectedStation.state, selectedStation.country]
                  .filter(v => typeof v === "string" && v.trim() !== "")
                  .join(", ")
              : "Select a station"}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="h-75 w-full rounded-xl overflow-hidden shadow-lg bg-white/10 backdrop-blur-md backdrop-brightness-110 border border-white/20 ">
            <StationCurrentWeatherCard 
              telemetryData={telemetryData}
              loading={false}
              error={telemetryData === null ? "Failed to load telemetry data." : null}
            />
          </div>
          <div className="h-75 w-full rounded-xl overflow-hidden">
            <div className="h-full w-full">
              <StationMapboxLocation 
                location={selectedStation ? selectedStation.location as [number, number] : null} 
              />
            </div>
          </div>
        </div>
        <StationWeatherDetail 
          stationPublicId={selectedStation ? selectedStation.stationPublicId : ""} 
          stationType={selectedStation ? selectedStation.stationType : undefined}
          historyData={historyData}
        />
      </div>
    </>
  );
}