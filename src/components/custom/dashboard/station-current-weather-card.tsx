import React, { useEffect, useState } from "react";
import { fetchStationLatestTelemetry } from "@/lib/services/stationService";
import type { TelemetryPublicDTO } from "@/lib/types/telemetry";
import { Sun, Cloud, Wind, Droplet, Thermometer, Gauge } from "lucide-react";

interface CurrentWeatherCardProps {
  stationPublicId: string;
}

const iconColor = "#fff";

const StationCurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({ stationPublicId }) => {
  const [data, setData] = useState<TelemetryPublicDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!stationPublicId) {
      setData(null);
      return;
    }

    async function loadTelemetry() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchStationLatestTelemetry(stationPublicId);
        const typedData = data as TelemetryPublicDTO;
        setData(typedData);  
        setLoading(false);
      } catch (err) {
        setError("Failed to load telemetry data.");
      }
    }

    loadTelemetry();

  }, [stationPublicId]);

  if (!stationPublicId) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-gray-400">
        <Cloud size={48} color={iconColor} />
        <span className="mt-2">Select a station</span>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-blue-400 animate-pulse">
        <Cloud size={48} color={iconColor} />
        <span className="mt-2">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-red-400">
        <Cloud size={48} color={iconColor} />
        <span className="mt-2">{error}</span>
      </div>
    );
  }

  if (!data) return null;

  const { station, telemetry } = data;

  // MSN Weather-inspired card layout
  return (
    <div className="w-full h-full rounded-2xl shadow-lg bg-white/10 backdrop-blur-md backdrop-brightness-110 border border-white/20 text-white p-6 flex flex-col items-center min-h-[340px] min-w-[300px]">
      <div className="flex flex-col items-center mb-4">
        <div className="flex items-center gap-2">
          <Sun size={40} color={iconColor} />
          <span className="text-3xl font-bold">{telemetry.temperature ?? '--'}°C</span>
        </div>
        <div className="text-lg font-semibold mt-2">{station.stationName}</div>
        <div className="text-xs opacity-80">{station.city}, {station.state}, {station.country}</div>
        <div className="text-xs opacity-70 mt-1">{new Date(telemetry.recordedAt).toLocaleString()}</div>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full mt-2">
        <div className="flex items-center gap-2">
          <Droplet size={20} color={iconColor} />
          <span className="text-sm">{telemetry.humidity ?? '--'}%</span>
        </div>
        <div className="flex items-center gap-2">
          <Wind size={20} color={iconColor} />
          <span className="text-sm">{telemetry.windSpeed ?? '--'} km/h</span>
        </div>
        <div className="flex items-center gap-2">
          <Thermometer size={20} color={iconColor} />
          <span className="text-sm">{telemetry.heatIndex ?? '--'}°C</span>
        </div>
        <div className="flex items-center gap-2">
          <Gauge size={20} color={iconColor} />
          <span className="text-sm">{telemetry.pressure ?? '--'} hPa</span>
        </div>
      </div>
    </div>
  );
};

export default StationCurrentWeatherCard;