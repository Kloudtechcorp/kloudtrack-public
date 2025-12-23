

import { fetchAllStationsDashboardData } from "@/lib/services/stationService";
import { StationDashboardData } from "@/lib/types/telemetry";
import StationDashboardClient from "@/components/custom/dashboard/station-dashboard-client";



// Server Component
export default async function Home() {
  let dashboardData: StationDashboardData[] = [];
  try {
    dashboardData = await fetchAllStationsDashboardData();
  } catch (error) {
    // Optionally log error or show fallback UI
  }

  return <StationDashboardClient dashboardData={dashboardData} />;
}