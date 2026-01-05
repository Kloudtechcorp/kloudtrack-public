/**
 * Telemetry Service - Orchestrates API calls, transforms data, and manages caching
 * This service layer sits between API routes and the Kloudtrack API client
 */
import { InMemoryCache } from "../lib/utils/cache";
import { toTwoDecimalPlaces } from "../lib/utils/data-helper";
import { AppError } from "../lib/utils/error";
import {
  StationPublicInfo,
  TelemetryMetrics,
  StationDashboardData,
  TelemetryPublicDTO,
} from "../types/telemetry";
// import { ParameterDataPoint } from "../types/parameter";
import stationIds from "../lib/constants/stations.json";
import { getLatestTelemetryFromKloudtrackApi, getTelemetryMetricHistoryFromKloudtrackApi } from "@/lib/kloudtrack/client";
import { TelemetryMetricRaw } from "@/types/telemetry-raw";

export class TelemetryService {
  // Cache for 60 seconds for individual station data
  private stationCache = new InMemoryCache<StationDashboardData>(60);

  // Cache for 5 minutes (300 seconds) for station list
  private stationsListCache = new InMemoryCache<StationPublicInfo[]>(300);

  // Cache for 60 seconds for parameter history data
  private parameterCache = new InMemoryCache<TelemetryMetricRaw[]>(60);

  /**
   * ORCHESTRATOR: Get complete dashboard data for a single station
   * Combines latest telemetry + recent history in parallel
   */
  async getStationDashboardData(stationId: string): Promise<StationDashboardData> {
    const cacheKey = `station-dashboard-${stationId}`;
    const cached = this.stationCache.get(cacheKey);

    if (cached) {
      console.log(`Returning cached data for station ${stationId}`);
      return cached;
    }

    try {
      console.log(`Fetching fresh data for station ${stationId}`);

      // Call both endpoints in parallel for better performance
      const [latestData] = await Promise.all([
        this.getLatestTelemetry(stationId),
        // this.getStationHistory(stationId),
      ]);

      // Combine the data into StationDashboardData format
      const result: StationDashboardData = {
        station: latestData.station,
        latestTelemetry: latestData.telemetry,
        // recentHistory: historyData,
      };

      // Cache for 60 seconds
      this.stationCache.set(cacheKey, result, 60);

      return result;
    } catch (error) {
      console.error(`Failed to fetch dashboard data for station ${stationId}:`, error);
      throw new AppError(`Failed to fetch dashboard data for station ${stationId}`, 500);
    }
  }

  /**
   * Get list of all stations
   * Uses hardcoded station IDs from stations.json
   * Fetches station info for each configured station
   */
  async getAllStations(): Promise<StationPublicInfo[]> {
    const cacheKey = "all-stations";
    const cached = this.stationsListCache.get(cacheKey);

    if (cached) {
      console.log("Returning cached stations list");
      return cached;
    }

    try {
      console.log("Fetching stations list for configured station IDs");

      // Fetch station info for each configured station ID
      const stationPromises = stationIds.stationIdToFetch.map(async (stationId) => {
        const data = await this.getLatestTelemetry(stationId);
        return data.station;
      });

      const stations = await Promise.all(stationPromises);

      this.stationsListCache.set(cacheKey, stations, 300);
      return stations;
    } catch (error) {
      console.error("Failed to fetch stations list:", error);
      throw new AppError("Failed to fetch stations list", 500);
    }
  }

  /**
   * Get latest telemetry for a specific station
   */
  async getLatestTelemetry(stationId: string): Promise<TelemetryPublicDTO> {
    try {
      const rawData = await getLatestTelemetryFromKloudtrackApi(stationId);
      return this.transformLatestTelemetry(rawData);
    } catch (error) {
      console.error(`[getLatestTelemetry] Failed to fetch latest telemetry for station ${stationId}:`, error);
      throw new AppError(`Failed to fetch latest telemetry for station ${stationId}`, 500);
    }
  }

    /**
   * Get parameter-specific history for a station
   * Used by Today Graph component for individual parameter charts
   */
  async getStationParameterHistory(stationId: string, parameter: string): Promise<TelemetryMetricRaw[]> {
    const cacheKey = `parameter-history-${stationId}-${parameter}`;
    const cached = this.parameterCache.get(cacheKey);

    if (cached) {
      console.log(`Returning cached ${parameter} data for station ${stationId}`);
      return cached;
    }

    try {
      console.log(`Fetching fresh ${parameter} data for station ${stationId}`);

      // Calculate 24 hours ago
      const startDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

      const params = new URLSearchParams({
        skip: "0",
        take: "96",
        interval: "15",
        startDate: startDate,
        filterOutliers: "true",
      });

      // const rawData = await kloudtrackApi.get<{ status: boolean; data: ParameterDataPoint[] }>(
      //   `/telemetry/station/${stationId}/history/${parameter}?${params}`
      // );

      const rawData = await getTelemetryMetricHistoryFromKloudtrackApi(stationId, parameter, Object.fromEntries(params));
      const result = rawData.data || [];

      // Cache for 60 seconds
      this.parameterCache.set(cacheKey, result, 60);

      console.log(`Successfully fetched ${result.length} data points for ${parameter}`);
      return result;
    } catch (error) {
      console.error(`Failed to fetch ${parameter} history for station ${stationId}:`, error);
      throw new AppError(`Failed to fetch ${parameter} history for station ${stationId}`, 500);
    }
  }

  // ==================== PRIVATE TRANSFORMATION METHODS ====================

  /**
   * Transform a single station object
   */
  private transformStation(station: unknown): StationPublicInfo {
    const data = station as Record<string, unknown>;
    return {
      stationPublicId: (data.id || data.stationPublicId || "") as string,
      stationName: (data.name || data.stationName || "Unknown Station") as string,
      stationType: (data.type || data.stationType || "unknown") as string,
      city: (data.city || "") as string,
      state: (data.state || "") as string,
      country: (data.country || "") as string,
      location: Array.isArray(data.location) ? (data.location as [number, number]) : [0, 0],
      isActive: data.isActive !== undefined ? (data.isActive as boolean) : true,
    };
  }

  /**
   * Transform raw latest telemetry response
   */
  private transformLatestTelemetry(rawData: unknown): TelemetryPublicDTO {
    const data = rawData as Record<string, unknown>;
    const station = this.transformStation(data.station || {});

    // Handle case where data is an array (from /history endpoint)
    // The API returns { station: {...}, data: [...] }
    let telemetryData = data.data || data.telemetry || rawData;
    if (Array.isArray(telemetryData) && telemetryData.length > 0) {
      telemetryData = telemetryData[0];
    }

    const telemetry = this.transformTelemetry(telemetryData);

    return {
      station,
      telemetry,
    };
  }

  /**
   * Transform a single telemetry reading
   * Handles data normalization, rounding, and null handling
   */
  private transformTelemetry(reading: unknown): TelemetryMetrics {
    const data = reading as Record<string, unknown>;
    const wind = data.wind as Record<string, unknown> | undefined;

    return {
      telemetryId: (data.id || data.telemetryId || 0) as number,
      recordedAt: (data.recordedAt || new Date().toISOString()) as string,
      temperature: toTwoDecimalPlaces(data.temperature as number),
      humidity: toTwoDecimalPlaces(data.humidity as number),
      pressure: toTwoDecimalPlaces(data.pressure as number),
      heatIndex: toTwoDecimalPlaces(data.heatIndex as number),
      // Handle wind object flattening
      windDirection: toTwoDecimalPlaces((data.windDirection ?? wind?.direction) as number),
      windSpeed: toTwoDecimalPlaces((data.windSpeed ?? wind?.speed) as number),
      precipitation: toTwoDecimalPlaces(data.precipitation as number),
      uvIndex: toTwoDecimalPlaces(data.uvIndex as number),
      distance: toTwoDecimalPlaces(data.distance as number),
      lightIntensity: toTwoDecimalPlaces((data.lightIntensity ?? data.light) as number),
    };
  }



  /**
   * Clear all caches (useful for debugging or forced refresh)
   */
  clearAllCaches(): void {
    this.stationCache.clear();
    this.stationsListCache.clear();
    this.parameterCache.clear();
    console.log("All caches cleared");
  }
}

// Export singleton instance
export const telemetryService = new TelemetryService();
