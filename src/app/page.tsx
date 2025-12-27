

import { fetchAllStationsDashboardData } from "@/lib/services/station.service";
import { StationDashboardData } from "@/lib/types/telemetry";
import StationDashboardClient from "@/components/features/dashboard/station-dashboard-client";



// Server Component
export default async function Home() {
  let dashboardData: StationDashboardData[] = [];
  try {
    dashboardData = await fetchAllStationsDashboardData();
  } catch {
    // Optionally log error or show fallback UI
  }

  return <StationDashboardClient dashboardData={dashboardData} />;
}