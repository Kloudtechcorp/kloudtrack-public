"use client";
import { useState, useEffect } from "react";
import { fetchStationList } from "@/lib/services/stationService"; 
import { StationPublicInfo } from "@/lib/types/telemetry";
import SubHeader from "@/components/custom/shared/sub-header";
import StationCurrentWeatherCard from "@/components/custom/dashboard/station-current-weather-card";
import StationMapboxLocation from "@/components/custom/dashboard/station-mapbox-location";
import StationWeatherDetail from "@/components/custom/dashboard/station-weather-detail";

export default function Home() {
  const [stations, setStations] = useState<StationPublicInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStation, setSelectedStation] = useState<StationPublicInfo | null>(null);

  useEffect(() => {
    async function loadStations() {
      try {
        const data = await fetchStationList();
        setStations(data);
        if (data && data.length > 0) {
          setSelectedStation(data[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stations:", error);
      } finally {
        setLoading(false);
      }
    }
    loadStations();
  }, []);

  const handleStationChange = (stationId: string) => {
    setSelectedStation(stations.find(s => s.stationPublicId === stationId) || null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <SubHeader
        stations={stations}
        selectedStation={selectedStation ? selectedStation.stationPublicId : ""}
        onStationChange={handleStationChange}
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
              stationPublicId={selectedStation ? selectedStation.stationPublicId : ""} 
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
        />
      </div>
    </>
  );
}