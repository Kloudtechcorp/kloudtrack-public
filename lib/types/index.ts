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

// export type WeatherDataProps = {
//   stationId: number;
//   location: string;
//   area: string;
//   temperature: number;
//   heatIndex: number;
//   humidity: number;
//   precipitation: number;
//   gust: number;
//   airPressure: number;
//   windSpeed: number;
//   windDirection: number;
//   uvIndex: number;
//   irradiance: number;
//   lux: number;
//   weather: string;
// };

// export type CurrentWeatherProps = {
//   currentWeather: WeatherDataProps | null;
// };

// export type ComboBoxProps = {
//   selectedLocations: string[];
//   setSelectedLocations: React.Dispatch<React.SetStateAction<string[]>>;
//   setCurrentWeather: React.Dispatch<
//     React.SetStateAction<WeatherDataProps | null>
//   >;
//   locationData: { location: string; area: string }[];
//   suggestions: string[];
//   activities: string[];
// };

// export type HeaderProps = {
//   selectedLocations: string[];
//   setSelectedLocations: React.Dispatch<React.SetStateAction<string[]>>;
//   setCurrentWeather: React.Dispatch<
//     React.SetStateAction<WeatherDataProps | null>
//   >;
// };

// export type SelectedLocationsProps = {
//   locations: string[];
//   setCurrentWeather: Dispatch<SetStateAction<WeatherDataProps | null>>;
//   currentWeather: WeatherDataProps | null;
// };
