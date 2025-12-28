"use client";
import { useState, useEffect } from "react";
import type { StationDashboardData, StationPublicInfo } from "@/types/telemetry";
import { stationService } from "@/services/station.service";
import SubHeader from "@/components/shared/sub-header";
import StationCurrentWeatherCard from "./station-current-weather-card";
import StationMapboxLocation from "./station-mapbox-location";
import StationWeatherDetail from "./station-weather-detail";

interface Props {
  stations: StationPublicInfo[];
}

export default function StationDashboardClient({ stations }: Props) {
  const [selectedStationId, setSelectedStationId] = useState(stations.length > 0 ? stations[0].stationPublicId : "");
  const [stationData, setStationData] = useState<StationDashboardData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch data for selected station
  const fetchStationData = async (stationId: string) => {
    if (!stationId) return;

    setIsRefreshing(true);
    try {
      const data = await stationService.fetchStationDashboardData(stationId);
      setStationData(data);
    } catch (error) {
      console.error(`Failed to fetch data for station ${stationId}:`, error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Fetch data when selected station changes
  useEffect(() => {
    fetchStationData(selectedStationId);
  }, [selectedStationId]);

  // Polling effect - runs every 5 minutes for the selected station only
  useEffect(() => {
    if (!selectedStationId) return;

    const pollData = async () => {
      await fetchStationData(selectedStationId);
    };

    // Poll every 5 minutes (300000 milliseconds)
    const intervalId = setInterval(pollData, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [selectedStationId]);

  // Derive all display data from current state
  const selectedStation = stationData?.station || null;
  const telemetryData = stationData?.latestTelemetry
    ? { station: stationData.station, telemetry: stationData.latestTelemetry }
    : null;
  const historyData = stationData?.recentHistory
    ? { station: stationData.station, telemetry: stationData.recentHistory }
    : null;

  return (
    <>
      <SubHeader stations={stations} selectedStation={selectedStationId} onStationChange={setSelectedStationId} />
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
                  .filter((v) => typeof v === "string" && v.trim() !== "")
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
                location={selectedStation ? (selectedStation.location as [number, number]) : null}
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
