"use client";
import { useState, useEffect } from "react";
import { fetchStationList } from "@/lib/services/stationService"; 
import { StationPublicInfo } from "@/lib/types/telemetry";
import SubHeader from "@/components/custom/shared/sub-header";
import StationCurrentWeatherCard from "@/components/custom/dashboard/station-current-weather-card";
import StationMapboxLocation from "@/components/custom/dashboard/station-mapbox-location";



export default function Home() {
  const [stations, setStations] = useState<StationPublicInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStation, setSelectedStation] = useState<StationPublicInfo | null>(null);

  useEffect(() => {
    async function loadStations() {
      try {
        const data = await fetchStationList();
        console.log("Fetched stations:", data);
        setStations(data);
        if (data && data.length > 0) {
          setSelectedStation(data[0]);
        }

      } catch (error) {
        console.error("Error fetching stations:", error);
      } finally {
        setLoading(false);
      }
    }

    loadStations();
  }, []);

    console.log("Selected", selectedStation)

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
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex w-full my-12">
          <div className="w-1/2 min-h-0">
            <StationCurrentWeatherCard stationPublicId={selectedStation ? selectedStation.stationPublicId : ""} />
          </div>
          <div className="w-1/2">
            <StationMapboxLocation location={selectedStation ? selectedStation.location as [number, number] : null} />
          </div>
        </div>
      </div>
    </>
  );
}