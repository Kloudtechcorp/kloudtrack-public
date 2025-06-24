import { InfoCardWeatherData } from "../objects/info-card-data";

export type LocationContextType = {
  locationData: StationData[];
  selectedLocation: LocationProps | null;
  setSelectedLocation: (location: LocationProps) => void;
  favoriteLocations: LocationProps[];
  addFavoriteLocation: (location: LocationProps) => void;
  removeFavoriteLocation: (location: LocationProps) => void;
  currentWeather: WeatherData | null;
  setCurrentWeather: (weather: WeatherData) => void;
};

export type WeatherData = {
  temperature: number;
  feelsLike: number;
  uvIndex: number;
  windSpeed: number;
  visibility: number;
  humidity: number;
  skyCondition: string;
};

export type ParameterContextType = {
  parameters: string[];
  selectedParameter: string;
  setSelectedParameter: (parameter: string) => void;
};

export type PayloadProps = {
  name: string;
  value: number | string;
};

export type TooltipProps = {
  payload: PayloadProps[];
  label: string;
};

export type LocationProps = {
  location: string;
  area: string;
};

export type InfoCardProps = {
  title: string;
  description: string;
  explanation: string;
  tooltip?: string;
  unit?: string;
  getValue: (data: InfoCardWeatherData) => number | null | undefined;
  formatDescription?: (value: number | null | undefined) => string;
  applicableTypes?: string[];
};

export type DailyCardProps = {
  title: string;
  description: string;
  imageSrc: string;
  altText: string;
  color: string;
};

export type TerminologyCardProps = {
  title: string;
  description: string;
};

export type TerminologyCardsProps = {
  dataArray: { name: string; description: string }[];
};

export type StationData = {
  id: string;
  name: string;
  type: string;
  latitude: number;
  longitude: number;
  barangay: string;
  municipality: string;
  province: string;
  region: string;
  image: string;
  data: {
    recordedAt: string; // ISO timestamp
    temperature: number;
    humidity: number;
    pressure: number;
    heatIndex: number;
    light: number;
    uvIntensity: number | null;
    windDirection: number;
    windSpeed: number;
    precipitation: number;
    gust: number;
    batteryVoltage: number | null;
    uvIndex: number;
  };
};
