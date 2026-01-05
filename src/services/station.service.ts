/**
 * Service layer for station data
 * Uses TelemetryService for server-side calls with caching and data transformation
 */
import { StationPublicInfo, TelemetryPublicDTO } from "../types/telemetry";
// import { ParameterDataPoint } from "../types/parameter";
import { telemetryService } from "./telemetry.service";
import { TelemetryMetricRaw } from "@/types/telemetry-raw";

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
   * Get parameter-specific history for a station
   * Used by Today Graph component
   */
  async fetchStationParameterHistory(stationPublicId: string, parameter: string): Promise<TelemetryMetricRaw[]> {
    return telemetryService.getStationParameterHistory(stationPublicId, parameter);
  }

}

// Export singleton instance
export const stationService = new StationService();
