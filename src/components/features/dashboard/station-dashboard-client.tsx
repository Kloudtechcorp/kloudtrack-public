"use client";
import { useState, useEffect } from "react";
import type { StationDashboardData, StationPublicInfo } from "@/types/telemetry";
import SubHeader from "@/components/shared/sub-header";
import StationWeatherInsightsMerged from "./station-weather-insights-merged";
import StationMapboxLocation from "./station-mapbox-location";
import StationTodayGraph from "./station-today-graph";

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
      const response = await fetch(`/api/telemetry/station/${stationId}`);
      const result = await response.json();

      if (result.success && result.data) {
        setStationData(result.data);
      } else {
        console.error(`Failed to fetch data for station ${stationId}:`, result.message);
      }
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

  return (
    <>
      <SubHeader stations={stations} selectedStation={selectedStationId} onStationChange={setSelectedStationId} />
      <div className="max-w-7xl mx-auto w-full px-4 py-6">
        {/* Header Section */}
        <div className="mb-6 pb-4 border-b-2 border-primary">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-mono text-foreground uppercase tracking-wider mb-1">STATION</div>
              <div className="text-muted-foreground text-xl font-bold font-mono">
                {selectedStation
                  ? [selectedStation.city, selectedStation.state, selectedStation.country]
                      .filter((v) => typeof v === "string" && v.trim() !== "")
                      .join(" / ")
                  : "[NO SELECTION]"}
              </div>
            </div>
            {isRefreshing && (
              <div className="flex items-center gap-2 text-muted text-xs font-mono">
                <div className="w-3 h-3 border-2 border-card-border border-t-muted animate-spin"></div>
                <span>SYNCING...</span>
              </div>
            )}
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Weather + Insights (2/3 width) */}
          <div className="lg:col-span-2 h-150">
            <StationWeatherInsightsMerged
              telemetryData={telemetryData}
              stationId={selectedStationId}
              loading={isRefreshing}
            />
          </div>

          {/* Map (1/3 width) */}
          <div className="h-150">
            <StationMapboxLocation
              location={selectedStation ? (selectedStation.location as [number, number]) : null}
            />
          </div>
        </div>

        {/* Graphs Section */}
        <div>
          <StationTodayGraph
            stationPublicId={selectedStation ? selectedStation.stationPublicId : ""}
            stationType={selectedStation ? selectedStation.stationType : undefined}
          />
        </div>
      </div>
    </>
  );
}
