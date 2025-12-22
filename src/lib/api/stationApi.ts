import { StationPublicInfo, TelemetryHistoryDTO, TelemetryPublicDTO } from "../types/telemetry";
import { ApiResponse } from "../types/apiResponse";
import { Telemetry } from "next/dist/telemetry/storage";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://app.kloudtechsea.com/api/v1";

async function fetchJson<T>(path: string): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url);

  // console.log(`JSON Response:`, await response.clone().json());
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }
  
  const apiResponse = (await response.json()) as ApiResponse<T>;
  
  // Check if the API call was successful
  if (!apiResponse.success) {
    throw new Error(`API Error: ${apiResponse.message}`);
  }
  
  // Return only the data property
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