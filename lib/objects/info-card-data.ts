export interface InfoCardWeatherData {
  recordedAt: string;
  temperature?: number;
  humidity?: number;
  pressure?: number;
  heatIndex?: number;
  light?: number;
  uvIntensity?: number;
  windDirection?: number;
  windSpeed?: number;
  precipitation?: number;
  gust?: number;
  batteryVoltage?: number;
  uvIndex?: number;
  calculatedDistance?: number;
}

export interface InfoCardCoastalData {
  recordedAt: string;
  temperature?: number;
  humidity?: number;
  pressure?: number;
  calculatedDistance: number;
}

export interface InfoCardRainData {
  recordedAt: string;
  precipitation?: number;
}

export interface InfoCardRiverData {
  recordedAt: string;
  distance?: number;
}

export interface InfoCardStationData {
  name: string;
  type: "AWS" | "CLMS" | "ARG" | "RLMS";
  data: {
    current:
      | InfoCardWeatherData
      | InfoCardCoastalData
      | InfoCardRainData
      | InfoCardRiverData;
    previous: (
      | InfoCardWeatherData
      | InfoCardCoastalData
      | InfoCardRainData
      | InfoCardRiverData
    )[];
  };
}

export interface InfoCardChartDataPoint {
  time: string;
  value: number;
}

const getWindForce = (speed: number): string => {
  if (speed < 1) return "Calm";
  if (speed < 4) return "Light Air";
  if (speed < 7) return "Light Breeze";
  if (speed < 11) return "Gentle Breeze";
  if (speed < 16) return "Moderate Breeze";
  if (speed < 22) return "Fresh Breeze";
  if (speed < 28) return "Strong Breeze";
  if (speed < 34) return "Near Gale";
  return "Gale";
};

const getUVLevel = (index: number): string => {
  if (index < 3) return "Low";
  if (index < 6) return "Moderate";
  if (index < 8) return "High";
  if (index < 11) return "Very High";
  return "Extreme";
};

const getHumidityLevel = (humidity: number): string => {
  if (humidity < 30) return "Low";
  if (humidity < 60) return "Moderate";
  return "High";
};

const getWindDirectionCompass = (degrees: number): string => {
  if (degrees == null || isNaN(degrees)) return "Unknown";
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
    "N",
  ];
  const index = Math.round(degrees / 22.5);
  return directions[index % 16];
};

interface InfoCardProps {
  title: string;
  description: string;
  explanation: string;
  tooltip: string;
  unit: string;
  getValue: (data: InfoCardWeatherData) => number | undefined;
  formatDescription: (value: number | undefined) => string;
  applicableTypes: string[];
}

export const infoCardData: InfoCardProps[] = [
  {
    title: "Temperature",
    description: "Current Temperature",
    explanation: "Real-time temperature measurement from the station",
    tooltip:
      "Ang temperature o temperatura ay ang sukatan ng init o lamig sa paligid.",
    unit: "°C",
    getValue: (data) => data.temperature,
    formatDescription: (value) =>
      value ? `${value.toFixed(1)}°C` : "No data available",
    applicableTypes: ["AWS", "CLMS"],
  },
  {
    title: "Heat Index",
    description: "Feels Like Temperature",
    explanation: "How hot it actually feels considering humidity",
    tooltip: "Ito ang indikasyon ng kung gaano kalakas ang pakiramdam ng init.",
    unit: "°C",
    getValue: (data) => data.heatIndex,
    formatDescription: (value) =>
      value ? `Feels like ${value.toFixed(1)}°C` : "No data available",
    applicableTypes: ["AWS"],
  },
  {
    title: "UV Index",
    description: "UV Radiation Level",
    explanation: "Current ultraviolet radiation intensity",
    tooltip: "Ang sukatan ng lakas ng ultraviolet (UV) rays mula sa araw.",
    unit: "",
    getValue: (data) => data.uvIndex,
    formatDescription: (value) =>
      value
        ? `${getUVLevel(value)} (${value.toFixed(1)})`
        : "No data available",
    applicableTypes: ["AWS"],
  },
  {
    title: "Precipitation",
    description: "Rainfall Amount",
    explanation: "Current precipitation measurement",
    tooltip: "Ito ay tumutukoy sa pag-ulan na bumabagsak mula sa langit.",
    unit: "mm",
    getValue: (data) => data.precipitation,
    formatDescription: (value) =>
      value ? `${value.toFixed(1)} mm` : "No rainfall",
    applicableTypes: ["AWS", "ARG"],
  },
  {
    title: "Wind",
    description: "Wind Conditions",
    explanation: "Current wind speed and classification",
    tooltip: "Ang paggalaw ng hangin sa kapaligiran.",
    unit: "m/s",
    getValue: (data) => data.windSpeed,
    formatDescription: (value) =>
      value
        ? `${value.toFixed(1)} m/s - ${getWindForce(value)}`
        : "No data available",
    applicableTypes: ["AWS"],
  },
  {
    title: "Light Intensity",
    description: "Current Light Level",
    explanation: "The intensity of visible light measured at the station",
    tooltip: "Ang sukat ng liwanag na nakikita ng mata ng tao sa kapaligiran.",
    unit: "lux",
    getValue: (data) => data.light,
    formatDescription: (value) =>
      value ? `${value.toFixed(0)} lx` : "No data available",
    applicableTypes: ["AWS"],
  },
  {
    title: "Air Pressure",
    description: "Atmospheric Pressure",
    explanation: "Current atmospheric pressure reading",
    tooltip: "Ang puwersa na inilalapat ng hangin sa ibabaw ng lupa.",
    unit: "hPa",
    getValue: (data) => data.pressure,
    formatDescription: (value) =>
      value ? `${value.toFixed(1)} hPa` : "No data available",
    applicableTypes: ["AWS", "CLMS"],
  },
  {
    title: "Humidity",
    description: "Relative Humidity",
    explanation: "Current relative humidity level",
    tooltip: "Ang dami ng moisture sa hangin.",
    unit: "%",
    getValue: (data) => data.humidity,
    formatDescription: (value) =>
      value
        ? `${value.toFixed(1)}% - ${getHumidityLevel(value)}`
        : "No data available",
    applicableTypes: ["AWS", "CLMS"],
  },
  {
    title: "Water Level",
    description: "Current Level",
    explanation: "Current water level reading",
    tooltip: "Ang kasalukuyang taas ng tubig.",
    unit: "m",
    getValue: (data) => data.calculatedDistance,
    formatDescription: (value) =>
      value ? `${value.toFixed(2)} m` : "No data available",
    applicableTypes: ["CLMS", "RLMS"],
  },
];
