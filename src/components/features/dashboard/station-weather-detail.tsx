import StationWeatherDetailCard from "./station-weather-detail-card";
import { TelemetryHistoryDTO } from "@/types/telemetry";

interface StationWeatherDetailProps {
  stationPublicId: string;
  stationType?: string;
  historyData?: TelemetryHistoryDTO | null;
}

const StationWeatherDetail: React.FC<StationWeatherDetailProps> = ({ stationType, historyData }) => {
  // Group readings by category (same logic as before, but now from prop)
  const grouped: Record<string, { recordedAt: string; value: number | null }[]> = {};
  if (historyData && historyData.telemetry) {
    const categories = [
      "temperature",
      "heatIndex",
      "humidity",
      "pressure",
      "windDirection",
      "windSpeed",
      "precipitation",
      "uvIndex",
      "distance",
      "lightIntensity",
    ] as const;
    categories.forEach((cat) => {
      grouped[cat] = historyData.telemetry
        .map((t) => ({
          recordedAt: t.recordedAt,
          value: (t[cat] as number | null | undefined) ?? null,
        }))
        .filter((d) => d.value !== null);
    });
  }

  if (!historyData || !historyData.telemetry) return <div>No data</div>;

  return (
    <div className="flex flex-col gap-4 mb-8">
      <p className="text-white text-xl">Weather Details</p>
      <StationWeatherDetailCard grouped={grouped} stationType={stationType} />
    </div>
  );
};

export default StationWeatherDetail;
