export interface DashboardRaw {
  stationName: string;
  stationType: string;
  location: [number, number];
  address: string;
  city: string;
  state: string;
  country: string;
  elevation: number;
  isActive: boolean;
  activatedAt: string | null;
  organization: string | null;
  latestTelemetry: LatestTelemetryRaw | null;
  id: string;
}

export interface StationRaw {
  stationName: string;
  stationType: string;
  location: [number, number];
  address: string;
  city: string;
  state: string;
  country: string;
  elevation: number;
  isActive: boolean;
  activatedAt: string | null;
  organizationId: string | null;
  organization: string | null;
  id: string;
}


export interface LatestTelemetryRaw {
  recordedAt: string;
  heatIndex: number | null;
  temperature: number | null;
  humidity: number | null;
  pressure: number | null;
  wind: {
    direction: number | null;
    speed: number | null;
  };
  precipitation: number | null;
  uvIndex: number | null;
  distance: number | null;
  light: number | null;
  hourlyPrecip?: number | null;
}

// History param (take)
export interface TelemetryHistoryTakeRaw {
  station: StationRaw;
  telemetry: LatestTelemetryRaw[];
}

export interface TelemetryMetricRaw {
  id: number;
  recordedAt: string;
  createdAt?: string;
  value: number;
}

// History param (metric)
export interface TelemetryHistoryMetricRaw {
  station: StationRaw;
  data: TelemetryMetricRaw[];
}