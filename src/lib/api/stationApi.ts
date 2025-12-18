import { StationPublicInfo } from "../types/telemetry";
import { ApiResponse } from "../types/apiResponse";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://app.kloudtechsea.com/api/v1";

async function fetchJson<T>(path: string): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url);

  console.log(`JSON Response:`, await response.clone().json());
  
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
  const result = await fetchJson<StationPublicInfo[]>(`/telemetry/stations`);
  console.log("getStationList raw result:", result);
  return result;
}

export async function getStationLatestTelemetry(stationPublicId: string) {
	return fetchJson(`/telemetry/latest/${stationPublicId}`);
}