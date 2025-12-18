"use client";
import { fetchStationRecentHistory } from "@/lib/services/stationService";
import { useEffect, useState } from "react";
import StationWeatherDetailCard from "./station-weather-detail-card";
import { TelemetryHistoryDTO } from "@/lib/types/telemetry";

interface StationWeatherDetailProps {
  stationPublicId: string;
  stationType?: string; // Add this prop
}

const StationWeatherDetail: React.FC<StationWeatherDetailProps> = ({ stationPublicId, stationType }) => {
  const [history, setHistory] = useState<TelemetryHistoryDTO | null>(null);
  const [grouped, setGrouped] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    async function loadHistory() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchStationRecentHistory(stationPublicId);
        setHistory(data);
        // Group readings by category
        if (data && data.telemetry) {
          const categories = [
            "temperature",
            "humidity",
            "pressure",
            "heatIndex",
            "windDirection",
            "windSpeed",
            "precipitation",
            "uvIndex",
            "distance",
            "lightIntensity"
          ];
          const groupedData: Record<string, { recordedAt: string; value: number|null }[]> = {};
          categories.forEach(cat => {
            groupedData[cat] = data.telemetry.map((t: any) => ({
              recordedAt: t.recordedAt,
              value: t[cat] ?? null
            })).filter(d => d.value !== null);
          });
          setGrouped(groupedData);
        }
        setLoading(false);
      } catch (error) {
        setError("Error fetching station history");
        setLoading(false);
      }
    }
    if (stationPublicId) {
      loadHistory();
    }
  }, [stationPublicId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!history || !history.telemetry) return <div>No data</div>;

  return (
    <div className="flex flex-col gap-4 mb-8">
      <p className="text-white text-xl">Weather Details</p>
      <StationWeatherDetailCard grouped={grouped} stationType={stationType} />
    </div>
  );
}

export default StationWeatherDetail;