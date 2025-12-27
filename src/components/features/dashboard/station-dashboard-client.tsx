"use client";
import { useState, useEffect } from "react";
import type { StationDashboardData } from "@/lib/types/telemetry";
import { fetchAllStationsDashboardData } from "@/lib/services/station.service";
import SubHeader from "@/components/shared/sub-header";
import StationCurrentWeatherCard from "./station-current-weather-card";
import StationMapboxLocation from "./station-mapbox-location";
import StationWeatherDetail from "./station-weather-detail";

interface Props {
  dashboardData: StationDashboardData[];
}

export default function StationDashboardClient({ dashboardData: initialData }: Props) {
  // Use initialData as the starting point, then update with polling
  const [dashboardData, setDashboardData] = useState(initialData);
  const [selectedStationId, setSelectedStationId] = useState(
    initialData.length > 0 ? initialData[0].station.stationPublicId : ""
  );
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Polling effect - runs every 5 minutes
  useEffect(() => {
    const pollData = async () => {
      setIsRefreshing(true);
      try {
        const updatedData = await fetchAllStationsDashboardData();
        setDashboardData(updatedData);
      } catch (error) {
        console.error("Failed to fetch updated dashboard data:", error);
      } finally {
        setIsRefreshing(false);
      }
    };

    // Poll every 5 minutes (300000 milliseconds)
    const intervalId = setInterval(pollData, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Derive all display data from current state
  const selected = dashboardData.find(d => d.station.stationPublicId === selectedStationId) || null;
  const stations = dashboardData.map(d => d.station);
  const selectedStation = selected ? selected.station : null;
  const telemetryData = selected ? (selected.latestTelemetry ? { station: selected.station, telemetry: selected.latestTelemetry } : null) : null;
  const historyData = selected ? (selected.recentHistory ? { station: selected.station, telemetry: selected.recentHistory } : null) : null;

  return (
    <>
      <SubHeader
        stations={stations}
        selectedStation={selectedStationId}
        onStationChange={setSelectedStationId}
      />
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-4 mt-8">
        {isRefreshing && (
          <div className="text-white/60 text-sm flex items-center gap-2">
            <div className="animate-spin h-4 w-4 border-2 border-white/60 border-t-transparent rounded-full"></div>
            <span>Updating data...</span>
          </div>
        )}
        
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