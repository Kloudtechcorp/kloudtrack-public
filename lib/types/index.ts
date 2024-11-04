import {
  locationArray,
  dailySuggestionArray,
  dailyActivityArray,
} from "@/lib/objects/arrays";

export type LocationContextType = {
  locationData: typeof locationArray;
  suggestions: typeof dailySuggestionArray;
  activities: typeof dailyActivityArray;
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
