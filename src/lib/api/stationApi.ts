import { StationData } from "@/lib/types";
import { InfoCardStationData } from "@/lib/objects/info-card-data";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://app.kloudtechsea.com/api/v1";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY ?? "6LHB-G2R6-XJQI-4JN4";

async function fetchJson<T>(path: string): Promise<T> {
	const url = `${API_BASE_URL}${path}`;
	const response = await fetch(url, {
		headers: {
			"x-kloudtrack-key": API_KEY,
		},
	});

	if (!response.ok) {
		throw new Error(`API request failed: ${response.status} ${response.statusText}`);
	}

	return (await response.json()) as T;
}

export async function getStation(stationId: string): Promise<StationData> {
	return fetchJson<StationData>(`/get/station/${stationId}`);
}

export async function getStationTree(stationId: string): Promise<InfoCardStationData> {
	return fetchJson<InfoCardStationData>(`/get/station/${stationId}/tree`);
}

export async function getAWSStations(): Promise<StationData[]> {
	return fetchJson<StationData[]>(`/get/stations/aws`);
}

