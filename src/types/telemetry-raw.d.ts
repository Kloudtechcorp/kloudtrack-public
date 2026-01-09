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


export interface TelemetryRaw {
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
}

export interface TelemetryMetricRaw {
  id: number;
  recordedAt: string;
  createdAt?: string;
  value: number;
}

// History response from (/:stationId//?take=1&... | /?interval=...&startDate=...)
export interface TelemetryHistoryTakeRaw {
  station: StationRaw;
  telemetry: TelemetryRaw[];
}

// History response (/:stationId/:metric/?interval=...&startDate=...)
export interface TelemetryHistoryMetricRaw {
  station: StationRaw;
  data: TelemetryMetricRaw[];
}