import { StationData } from "@/lib/types";
import { InfoCardStationData } from "@/lib/objects/info-card-data";
import { getAWSStations, getStation, getStationTree } from "@/lib/api/stationApi";

// Service layer: place for preprocessing, caching, or compositional logic
export async function fetchStationData(stationId: string): Promise<StationData> {
	// Potential preprocessing can be added here (e.g., validation)
	return getStation(stationId);
}

export async function fetchStationTree(stationId: string): Promise<InfoCardStationData> {
	return getStationTree(stationId);
}

export async function fetchAWSStations(): Promise<StationData[]> {
	return getAWSStations();
}

