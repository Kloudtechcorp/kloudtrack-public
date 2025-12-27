/**
 * Client-side API layer
 * Calls internal Next.js API routes (/api/*) which proxy to Kloudtrack API
 * API token is added server-side, so it's never exposed to the browser
 */
import { StationDashboardData, StationPublicInfo, TelemetryHistoryDTO, TelemetryPublicDTO } from "../types/telemetry";
import { ApiResponse } from "../types/api-response";

/**
 * Fetch from internal API routes
 * These routes are proxied through Next.js server which adds the API token
 */
async function fetchJson<T>(path: string): Promise<T> {
  // Call internal Next.js API routes (not external API)
  const url = `/api${path}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  const apiResponse = (await response.json()) as ApiResponse<T>;

  if (!apiResponse.success) {
    throw new Error(`API Error: ${apiResponse.message || 'Unknown error'}`);
  }
  return apiResponse.data;
}

export async function getStationList(): Promise<StationPublicInfo[]> {
  return fetchJson<StationPublicInfo[]>(`/telemetry/stations`);
}

export async function getStationLatestTelemetry(stationPublicId: string): Promise<TelemetryPublicDTO> {
  return fetchJson(`/telemetry/latest/${stationPublicId}`);
}

export async function getStationRecentHistory(stationPublicId: string): Promise<TelemetryHistoryDTO> {
  return fetchJson(`/telemetry/recent/${stationPublicId}`);
}

export async function getAllStationsDashboardData(): Promise<StationDashboardData[]> {
  return fetchJson<StationDashboardData[]>(`/telemetry/dashboard`);
}