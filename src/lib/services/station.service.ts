/**
 * Service layer for station data
 * Uses Kloudtrack API service for server-side calls
 */
import { StationPublicInfo, TelemetryHistoryDTO, TelemetryPublicDTO, StationDashboardData } from "../types/telemetry";
import {
  getStationsFromKloudtrackApi,
  getLatestTelemetryFromKloudtrackApi,
  getRecentTelemetryFromKloudtrackApi,
  getDashboardDataFromKloudtrackApi
} from "./kloudtrack-api.service";

export async function fetchStationList(): Promise<StationPublicInfo[]> {
  return getStationsFromKloudtrackApi();
}

export async function fetchStationLatestTelemetry(stationPublicId: string): Promise<TelemetryPublicDTO> {
  return getLatestTelemetryFromKloudtrackApi(stationPublicId);
}

export async function fetchStationRecentHistory(stationPublicId: string): Promise<TelemetryHistoryDTO> {
  return getRecentTelemetryFromKloudtrackApi(stationPublicId);
}

export async function fetchAllStationsDashboardData(): Promise<StationDashboardData[]> {
  return getDashboardDataFromKloudtrackApi();
}