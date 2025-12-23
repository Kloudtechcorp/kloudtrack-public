

import { fetchStationList, fetchStationLatestTelemetry, fetchStationRecentHistory } from "@/lib/services/stationService";
import { StationPublicInfo, TelemetryPublicDTO, TelemetryHistoryDTO } from "@/lib/types/telemetry";
import StationDashboardClient from "@/components/custom/dashboard/station-dashboard-client";



// Server Component
export default async function Home() {
  // Fetch stations server-side
  let stations: StationPublicInfo[] = [];
  try {
    stations = await fetchStationList();
  } catch (error) {
    // Optionally log error or show fallback UI
  }

  // Fetch telemetry and history for all stations and build records
  const telemetryRecord: Record<string, TelemetryPublicDTO | null> = {};
  const historyRecord: Record<string, TelemetryHistoryDTO | null> = {};
  for (const station of stations) {
    try {
      telemetryRecord[station.stationPublicId] = await fetchStationLatestTelemetry(station.stationPublicId);
    } catch {
      telemetryRecord[station.stationPublicId] = null;
    }
    try {
      historyRecord[station.stationPublicId] = await fetchStationRecentHistory(station.stationPublicId);
    } catch {
      historyRecord[station.stationPublicId] = null;
    }
  }

  return <StationDashboardClient stations={stations} telemetryRecord={telemetryRecord} historyRecord={historyRecord} />;
}