/**
 * Insights Service
 * Handles fetching and caching of telemetry insights from Kloudtrack API
 * Implements singleton pattern for efficient resource management
 */

import { InMemoryCache } from "../lib/utils/cache";
import {
  getStationInsightsFromKloudtrackApi,
  getGroupedInsightsFromKloudtrackApi,
} from "../lib/kloudtrack/client";
import type {
  StationInsightData,
  GroupedInsightData,
  StationInsightsResponse,
  GroupedInsightsResponse,
} from "../types/insights";

/**
 * Insights Service Class
 * Provides methods to fetch station and grouped insights with caching
 */
class InsightsService {
  // Cache instances with 60-second TTL (matches API cache behavior)
  private stationInsightsCache: InMemoryCache<StationInsightData>;
  private groupedInsightsCache: InMemoryCache<GroupedInsightData>;

  constructor() {
    // Initialize caches with 60-second TTL (matches Kloudtrack API cache)
    this.stationInsightsCache = new InMemoryCache<StationInsightData>(60);
    this.groupedInsightsCache = new InMemoryCache<GroupedInsightData>(60);
  }

  /**
   * Get insights for a single station
   * @param stationId - The station public ID (e.g., "Rjz2dbXW")
   * @returns Station insights data
   */
  async getStationInsights(stationId: string): Promise<StationInsightData> {
    const cacheKey = `station:${stationId}`;

    // Check cache first
    if (this.stationInsightsCache.has(cacheKey)) {
      console.log(`[InsightsService] Cache HIT for station insights: ${stationId}`);
      return this.stationInsightsCache.get(cacheKey)!;
    }

    console.log(`[InsightsService] Cache MISS for station insights: ${stationId}`);

    try {
      // Fetch from Kloudtrack API
      const response: StationInsightsResponse = await getStationInsightsFromKloudtrackApi(stationId);

      // Validate response
      if (response.status === 'error' || !response.data) {
        throw new Error(response.error?.message || 'Failed to fetch station insights');
      }

      const insightData = response.data;

      // Cache the result
      this.stationInsightsCache.set(cacheKey, insightData);

      return insightData;
    } catch (error) {
      console.error(`[InsightsService] Error fetching station insights for ${stationId}:`, error);
      throw error;
    }
  }

  /**
   * Get grouped insights by city or organization
   * @param groupBy - Group type ('city' or 'organization')
   * @param groupKey - City name or organization ID
   * @returns Grouped insights data
   */
  async getGroupedInsights(
    groupBy: 'city' | 'organization',
    groupKey: string
  ): Promise<GroupedInsightData> {
    const cacheKey = `grouped:${groupBy}:${groupKey}`;

    // Check cache first
    if (this.groupedInsightsCache.has(cacheKey)) {
      console.log(`[InsightsService] Cache HIT for grouped insights: ${groupBy}=${groupKey}`);
      return this.groupedInsightsCache.get(cacheKey)!;
    }

    console.log(`[InsightsService] Cache MISS for grouped insights: ${groupBy}=${groupKey}`);

    try {
      // Fetch from Kloudtrack API
      const response: GroupedInsightsResponse = await getGroupedInsightsFromKloudtrackApi(
        groupBy,
        groupKey
      );

      // Validate response
      if (response.status === 'error' || !response.data) {
        throw new Error(response.error?.message || 'Failed to fetch grouped insights');
      }

      const insightData = response.data;

      // Cache the result
      this.groupedInsightsCache.set(cacheKey, insightData);

      return insightData;
    } catch (error) {
      console.error(
        `[InsightsService] Error fetching grouped insights for ${groupBy}=${groupKey}:`,
        error
      );
      throw error;
    }
  }

  /**
   * Clear all insights caches (useful for debugging or manual refresh)
   */
  clearAllCaches(): void {
    console.log('[InsightsService] Clearing all insights caches');
    this.stationInsightsCache.clear();
    this.groupedInsightsCache.clear();
  }

  /**
   * Get cache statistics for monitoring
   */
  getCacheStats() {
    return {
      stationInsights: {
        size: this.stationInsightsCache.size,
        keys: Array.from(this.stationInsightsCache['cache'].keys()),
      },
      groupedInsights: {
        size: this.groupedInsightsCache.size,
        keys: Array.from(this.groupedInsightsCache['cache'].keys()),
      },
    };
  }
}

// Export singleton instance
export const insightsService = new InsightsService();
