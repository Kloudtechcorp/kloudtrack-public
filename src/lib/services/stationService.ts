import { StationPublicInfo, TelemetryHistoryDTO, TelemetryPublicDTO,  } from "../types/telemetry";
import { getStationLatestTelemetry, getStationList, getStationRecentHistory } from "../api/stationApi";

export async function fetchStationList(): Promise<StationPublicInfo[]> {
  return getStationList();
}

export async function fetchStationLatestTelemetry(stationPublicId: string): Promise<TelemetryPublicDTO> {
	return getStationLatestTelemetry(stationPublicId);
}

export async function fetchStationRecentHistory(stationPublicId: string): Promise<TelemetryHistoryDTO> {
  return getStationRecentHistory(stationPublicId);
}