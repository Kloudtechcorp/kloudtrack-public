/**
 * Service layer for station data
 * Uses TelemetryService for server-side calls with caching and data transformation
 */
import { StationPublicInfo, TelemetryHistoryDTO, TelemetryPublicDTO, StationDashboardData } from "../types/telemetry";
import { ParameterDataPoint } from "../types/parameter";
import { telemetryService } from "./telemetry.service";

/**
 * StationService - Facade/wrapper around TelemetryService
 * Provides a simplified, domain-specific API for station-related operations
 */
export class StationService {
  /**
   * Get list of all stations
   */
  async fetchStationList(): Promise<StationPublicInfo[]> {
    return telemetryService.getAllStations();
  }

  /**
   * Get latest telemetry for a specific station
   */
  async fetchStationLatestTelemetry(stationPublicId: string): Promise<TelemetryPublicDTO> {
    return telemetryService.getLatestTelemetry(stationPublicId);
  }

  /**
   * Get recent telemetry history for a specific station
   */
  async fetchStationRecentHistory(stationPublicId: string): Promise<TelemetryHistoryDTO> {
    return telemetryService.getStationHistoryWithInfo(stationPublicId);
  }

  /**
   * Get dashboard data for all stations
   */
  async fetchAllStationsDashboardData(): Promise<StationDashboardData[]> {
    return telemetryService.getAllStationsDashboardData();
  }

  /**
   * Get dashboard data for a specific station
   */
  async fetchStationDashboardData(stationPublicId: string): Promise<StationDashboardData> {
    return telemetryService.getStationDashboardData(stationPublicId);
  }

  /**
   * Get parameter-specific history for a station
   * Used by Today Graph component
   */
  async fetchStationParameterHistory(stationPublicId: string, parameter: string): Promise<ParameterDataPoint[]> {
    return telemetryService.getStationParameterHistory(stationPublicId, parameter);
  }
}

// Export singleton instance
export const stationService = new StationService();
