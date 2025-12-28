/**
 * Server-side client for communicating with Kloudtrack API
 * This runs ONLY on the server and includes the secret API token
 */
import { StationPublicInfo, TelemetryPublicDTO, TelemetryHistoryDTO, StationDashboardData } from "../types/telemetry";

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
    console.log({ url });
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
export async function getStationsFromKloudtrackApi(): Promise<StationPublicInfo[]> {
  return kloudtrackApi.get<StationPublicInfo[]>("/telemetry/stations");
}

export async function getLatestTelemetryFromKloudtrackApi(stationId: string): Promise<TelemetryPublicDTO> {
  return kloudtrackApi.get<TelemetryPublicDTO>(`/telemetry/latest/${stationId}`);
}

export async function getRecentTelemetryFromKloudtrackApi(stationId: string): Promise<TelemetryHistoryDTO> {
  return kloudtrackApi.get<TelemetryHistoryDTO>(`/telemetry/recent/${stationId}`);
}

export async function getDashboardDataFromKloudtrackApi(): Promise<StationDashboardData[]> {
  return kloudtrackApi.get<StationDashboardData[]>("/telemetry/dashboard");
}
