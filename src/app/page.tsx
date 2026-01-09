import { StationPublicInfo } from "@/types/telemetry";
import StationDashboardClient from "@/components/features/dashboard/station-dashboard-client";
import { telemetryService } from "@/services/telemetry.service";

// Server Component
export default async function Home() {
  let stations: StationPublicInfo[] = [];
  try {
    stations = await telemetryService.getAllStations();
  } catch {
    // Optionally log error or show fallback UI
  }

  return <StationDashboardClient stations={stations} />;
}
