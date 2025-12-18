import { StationPublicInfo } from "../types/telemetry";
import { getStationLatestTelemetry, getStationList } from "../api/stationApi";

export async function fetchStationList(): Promise<StationPublicInfo[]> {
  return getStationList();
}

export async function fetchStationLatestTelemetry(stationPublicId: string) {
	return getStationLatestTelemetry(stationPublicId);
}