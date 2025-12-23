import { StationDashboardData, StationPublicInfo, TelemetryHistoryDTO, TelemetryPublicDTO } from "../types/telemetry";
import { ApiResponse } from "../types/api-response";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function fetchJson<T>(path: string): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }
  
  const apiResponse = (await response.json()) as ApiResponse<T>;
  
  if (!apiResponse.success) {
    throw new Error(`API Error: ${apiResponse.message}`);
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