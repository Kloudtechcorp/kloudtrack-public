/**
 * Server-side client for communicating with Kloudtrack API
 * This runs ONLY on the server and includes the secret API token
 */
import { GroupedInsightsResponse, StationInsightData } from "../../types/insights";
import { DashboardRaw, TelemetryHistoryMetricRaw, TelemetryHistoryTakeRaw } from "@/types/telemetry-raw";

const KLOUDTRACK_API_BASE_URL = process.env.KLOUDTRACK_API_BASE_URL || "https://api.kloudtechsea.com/api/v1";
const KLOUDTRACK_API_TOKEN =
  process.env.KLOUDTRACK_API_TOKEN || "kloud_live_134ee23c2f714a3bf3640fcb86565292d616568cb5219023";

if (!KLOUDTRACK_API_BASE_URL) {
  console.warn("Warning: KLOUDTRACK_API_BASE_URL is not set. API calls will fail.");
}

if (!KLOUDTRACK_API_TOKEN) {
  console.warn("Warning: KLOUDTRACK_API_TOKEN is not set. Using unauthenticated requests.");
}

interface KloudtrackApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

class KloudtrackApiClient {
  private baseURL: string;
  private apiToken: string | undefined;

  constructor(baseURL: string | undefined, apiToken: string | undefined) {
    this.baseURL = baseURL || "";
    this.apiToken = apiToken;
  }

  /**
   * Make authenticated request to Kloudtrack API
   */
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options?.headers as Record<string, string>),
    };

    // Add authorization header if token is available
    if (this.apiToken) {
      headers["x-kloudtrack-key"] = `${this.apiToken}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        // Add timeout
        signal: options?.signal || AbortSignal.timeout(10000), // 10 second timeout
      });

      if (!response.ok) {
        throw new Error(`Kloudtrack API Error: ${response.status} ${response.statusText}`);
      }

      const apiResponse = (await response.json()) as KloudtrackApiResponse<T>;

      if (!apiResponse.success) {
        throw new Error(apiResponse.message || "Kloudtrack API request failed");
      }
      return apiResponse.data;
    } catch (error) {
      console.error("Kloudtrack API request failed:", error);
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

// Export singleton instance
export const kloudtrackApi = new KloudtrackApiClient(KLOUDTRACK_API_BASE_URL, KLOUDTRACK_API_TOKEN);

// Export specific API methods
export async function getLatestTelemetryFromKloudtrackApi(stationId: string): Promise<TelemetryHistoryTakeRaw> {
  return kloudtrackApi.get<TelemetryHistoryTakeRaw>(`/telemetry/station/${stationId}/history?take=1`);

}

export async function getTelemetryMetricHistoryFromKloudtrackApi(stationId: string, parameter: string, params: Record<string, string>): Promise<TelemetryHistoryMetricRaw> {
  const queryString = new URLSearchParams(params).toString();
  return kloudtrackApi.get<TelemetryHistoryMetricRaw>(`/telemetry/station/${stationId}/history/${parameter}?${queryString}`);
}

export async function getDashboardDataFromKloudtrackApi(): Promise<DashboardRaw> {
  return kloudtrackApi.get<DashboardRaw>("/telemetry/dashboard");
}

export async function getStationInsightsFromKloudtrackApi(stationId: string): Promise<StationInsightData> {
  return kloudtrackApi.get<StationInsightData>(`/telemetry-insights/${stationId}`);
}

export async function getGroupedInsightsFromKloudtrackApi(
  groupBy: "city" | "organization",
  groupKey: string
): Promise<GroupedInsightsResponse> {
  return kloudtrackApi.get<GroupedInsightsResponse>(
    `/telemetry-insights/grouped?groupBy=${groupBy}&groupKey=${encodeURIComponent(groupKey)}`
  );
}
