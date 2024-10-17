"use client";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import {
  locationArray,
  dailySuggestionArray,
  dailyActivityArray,
} from "@/lib/objects/arrays";
import { LocationContextType, LocationProps, WeatherData } from "@/lib/types";

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [locationData] = useState(locationArray);
  const [suggestions] = useState(dailySuggestionArray);
  const [activities] = useState(dailyActivityArray);

  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(
    null
  );

  const [selectedLocation, setSelectedLocation] = useState<
    LocationContextType["selectedLocation"]
  >(
    locationData.length > 0
      ? { location: locationData[0].location, area: locationData[0].area }
      : null
  );

  const [favoriteLocations, setFavoriteLocations] = useState<
    LocationContextType["favoriteLocations"]
  >([]);

  const addFavoriteLocation = (location: LocationProps) => {
    if (favoriteLocations.length < 3) {
      setFavoriteLocations((prev) => [...prev, location]);
    } else {
      alert("Cannot add more than 3 favorite locations.");
    }
  };

  const removeFavoriteLocation = (location: LocationProps) => {
    setFavoriteLocations((prev) =>
      prev.filter(
        (favLocation) =>
          favLocation.location !== location.location ||
          favLocation.area !== location.area
      )
    );
  };

  const fetchWeatherData = (location: string) => {
    console.log(`Fetching weather data for: ${location}`);

    const locationData = locationArray.find((loc) => loc.location === location);

    if (locationData) {
      const weatherData: WeatherData = {
        temperature: locationData.temperature,
        feelsLike: locationData.heatIndex,
        uvIndex: locationData.uvIndex,
        windSpeed: locationData.windSpeed,
        visibility: 10,
        humidity: locationData.humidity,
        skyCondition: locationData.weather,
      };

      setCurrentWeather(weatherData);
    } else {
      console.error("Location not found in the locationArray.");
    }
  };

  useEffect(() => {
    if (selectedLocation) {
      fetchWeatherData(selectedLocation.location);
    }
  }, [selectedLocation]);

  return (
    <LocationContext.Provider
      value={{
        locationData,
        suggestions,
        activities,
        selectedLocation,
        setSelectedLocation,
        favoriteLocations,
        addFavoriteLocation,
        removeFavoriteLocation,
        currentWeather,
        setCurrentWeather,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error(
      "useLocationContext must be used within a LocationProvider"
    );
  }
  return context;
};
