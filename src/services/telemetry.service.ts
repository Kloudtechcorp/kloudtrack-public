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
  TelemetryHistoryDTO,
} from "../types/telemetry";
import { ParameterDataPoint } from "../types/parameter";
import stationIds from "../lib/constants/stations.json";
import { kloudtrackApi } from "@/lib/kloudtrack/client";

export class TelemetryService {
  // Cache for 2.5 minutes (150 seconds) for dashboard data
  private dashboardCache = new InMemoryCache<StationDashboardData[]>(150);

  // Cache for 60 seconds for individual station data
  private stationCache = new InMemoryCache<StationDashboardData>(60);

  // Cache for 5 minutes (300 seconds) for station list
  private stationsListCache = new InMemoryCache<StationPublicInfo[]>(300);

  // Cache for 60 seconds for parameter history data
  private parameterCache = new InMemoryCache<ParameterDataPoint[]>(60);

  /**
   * ORCHESTRATOR: Get dashboard data for ALL stations
   * Uses hardcoded station IDs from stations.json to control which stations are visible
   * Fetches data for each station in parallel for better performance
   */
  async getAllStationsDashboardData(): Promise<StationDashboardData[]> {
    const cacheKey = "all-stations-dashboard";
    const cached = this.dashboardCache.get(cacheKey);

    if (cached) {
      console.log("Returning cached dashboard data");
      return cached;
    }

    try {
      console.log("Fetching fresh dashboard data for configured stations");
      console.log(`Station IDs to fetch: ${stationIds.stationIdToFetch.join(", ")}`);

      // Fetch data for each configured station in parallel
      const dashboardDataPromises = stationIds.stationIdToFetch.map((stationId) =>
        this.getStationDashboardData(stationId)
      );

      const result = await Promise.all(dashboardDataPromises);

      // Cache the result for 60 seconds
      this.dashboardCache.set(cacheKey, result, 60);

      console.log(`Successfully fetched data for ${result.length} stations`);
      return result;
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      this.dashboardCache.clear();
      throw new AppError("Failed to fetch dashboard data for all stations", 500);
    }
  }

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
      const [latestData, historyData] = await Promise.all([
        this.getLatestTelemetry(stationId),
        this.getStationHistory(stationId),
      ]);

      // Combine the data into StationDashboardData format
      const result: StationDashboardData = {
        station: latestData.station,
        latestTelemetry: latestData.telemetry,
        recentHistory: historyData,
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
      const rawData = await kloudtrackApi.get<unknown>(`/telemetry/station/${stationId}/history?take=1`);
      return this.transformLatestTelemetry(rawData);
    } catch (error) {
      console.error(`[getLatestTelemetry] Failed to fetch latest telemetry for station ${stationId}:`, error);
      throw new AppError(`Failed to fetch latest telemetry for station ${stationId}`, 500);
    }
  }

  /**
   * Get recent history for a specific station (just the metrics array)
   */
  async getStationHistory(stationId: string): Promise<TelemetryMetrics[]> {
    try {
      // Calculate dates for past 24 hours
      const endDate = new Date().toISOString();
      const startDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

      // Static parameters
      const interval = 60; // 1 hour in minutes
      const take = 24; // 24 records (one per hour)
      const params = new URLSearchParams({
        interval: interval.toString(),
        startDate: startDate,
        endDate: endDate,
        take: take.toString(),
        filterOutliers: "true",
      });
      const rawData = await kloudtrackApi.get<unknown>(`/telemetry/station/${stationId}/history?${params}`);
      return this.transformHistoryData(rawData);
    } catch (error) {
      console.error(`Failed to fetch history for station ${stationId}:`, error);
      throw new AppError(`Failed to fetch history for station ${stationId}`, 500);
    }
  }

  /**
   * Get recent history with station info (full DTO)
   */
  async getStationHistoryWithInfo(stationId: string): Promise<TelemetryHistoryDTO> {
    try {
      const rawData = await kloudtrackApi.get<unknown>(`/telemetry/recent/${stationId}`);

      const data = rawData as Record<string, unknown>;
      return {
        station: this.transformStation(data.station || {}),
        telemetry: this.transformHistoryData(data.telemetry || rawData),
      };
    } catch (error) {
      console.error(`Failed to fetch history for station ${stationId}:`, error);
      throw new AppError(`Failed to fetch history for station ${stationId}`, 500);
    }
  }

  // ==================== PRIVATE TRANSFORMATION METHODS ====================

  /**
   * Transform raw dashboard response
   */
  private transformDashboardData(rawData: unknown): StationDashboardData[] {
    if (!Array.isArray(rawData)) {
      return [];
    }

    return rawData.map((item: unknown) => {
      const data = item as Record<string, unknown>;
      return {
        station: this.transformStation(data.station),
        latestTelemetry: data.latestTelemetry ? this.transformTelemetry(data.latestTelemetry) : null,
        recentHistory: Array.isArray(data.recentHistory)
          ? data.recentHistory.map((t: unknown) => this.transformTelemetry(t))
          : [],
      };
    });
  }

  /**
   * Transform raw stations list response
   */
  private transformStationsList(rawData: unknown): StationPublicInfo[] {
    if (!Array.isArray(rawData)) {
      return [];
    }

    return rawData.map((station: unknown) => this.transformStation(station));
  }

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
   * Transform raw history response
   */
  private transformHistoryData(rawData: unknown): TelemetryMetrics[] {
    // Handle case where data is wrapped in an object with "data" field
    let dataArray = rawData;
    if (typeof rawData === "object" && rawData !== null && !Array.isArray(rawData)) {
      const dataObj = rawData as Record<string, unknown>;
      dataArray = dataObj.data || dataObj.telemetry || rawData;
    }

    if (!Array.isArray(dataArray)) {
      return [];
    }

    return dataArray.map((reading: unknown) => this.transformTelemetry(reading));
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
   * Get parameter-specific history for a station
   * Used by Today Graph component for individual parameter charts
   */
  async getStationParameterHistory(stationId: string, parameter: string): Promise<ParameterDataPoint[]> {
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

      const rawData = await kloudtrackApi.get<{ status: boolean; data: ParameterDataPoint[] }>(
        `/telemetry/station/${stationId}/history/${parameter}?${params}`
      );

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

  /**
   * Clear all caches (useful for debugging or forced refresh)
   */
  clearAllCaches(): void {
    this.dashboardCache.clear();
    this.stationCache.clear();
    this.stationsListCache.clear();
    this.parameterCache.clear();
    console.log("All caches cleared");
  }
}

// Export singleton instance
export const telemetryService = new TelemetryService();
