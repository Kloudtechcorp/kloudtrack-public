import { StationPublicInfo, TelemetryHistoryDTO, TelemetryPublicDTO } from "../types/telemetry";
import { ApiResponse } from "../types/apiResponse";


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://app.kloudtechsea.com/api/v1";
const API_KEY = process.env.KLOUDTRACK_API_KEY;


async function fetchJson<T>(path: string): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  if (!API_KEY) {
    throw new Error("API key is not set in environment variables");
  }
  const header = {
    "x-kloudtrack-key": API_KEY
  };
  const response = await fetch(url, { headers: header });

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
  console.log("Fetching latest telemetry for station:", stationPublicId);
	// return fetchJson(`/telemetry/latest/${stationPublicId}`);
  const data = await fetchJson<TelemetryPublicDTO>(`/telemetry/latest/${stationPublicId}`);
  console.log("Received telemetry data:", data);
  return data;
}

export async function getStationRecentHistory(stationPublicId: string): Promise<TelemetryHistoryDTO> {
  return fetchJson(`/telemetry/recent/${stationPublicId}`);
}