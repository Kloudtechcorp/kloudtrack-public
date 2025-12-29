import { stationService } from "@/services/station.service";
import { StationPublicInfo } from "@/types/telemetry";
import StationDashboardClient from "@/components/features/dashboard/station-dashboard-client";

// Server Component
export default async function Home() {
  let stations: StationPublicInfo[] = [];
  try {
    stations = await stationService.fetchStationList();
  } catch {
    // Optionally log error or show fallback UI
  }

  return <StationDashboardClient stations={stations} />;
}
