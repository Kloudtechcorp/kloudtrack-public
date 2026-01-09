export interface StationPublicInfo {
  stationPublicId: string; 
  stationName: string;
  stationType: string;
  city: string;
  state: string;
  country: string;
  location: [number, number];
  isActive: boolean;
}

export interface TelemetryMetrics {
  telemetryId: number;
  recordedAt: string;
  temperature?: number | null;
  humidity?: number | null;
  pressure?: number | null;
  heatIndex?: number | null;
  windDirection?: number | null;
  windSpeed?: number | null;
  precipitation?: number | null;
  uvIndex?: number | null;
  distance?: number | null;
  lightIntensity?: number | null;
}

export interface TelemetryPublicDTO {
  station: StationPublicInfo;
  telemetry: TelemetryMetrics;
}

export interface TelemetryHistoryDTO {
  station: StationPublicInfo;
  telemetry: TelemetryMetrics[];
}

export interface StationDashboardData {
  station: StationPublicInfo;
  latestTelemetry: TelemetryMetrics | null;
  // recentHistory: TelemetryMetrics[] | null;
}