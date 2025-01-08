"use client";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { dailySuggestionArray, dailyActivityArray } from "@/lib/objects/arrays";
import {
  LocationContextType,
  LocationProps,
  WeatherData,
  StationData,
} from "@/lib/types";

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [locationData, setLocationData] = useState<StationData[]>([]);

  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(
    null
  );

  const [selectedLocation, setSelectedLocation] =
    useState<LocationContextType["selectedLocation"]>(null);

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

  const fetchWeatherData = async (locationId: string) => {
    try {
      const response = await fetch(
        "https://app.kloudtechsea.com/api/v1/get/stations/aws",
        {
          headers: {
            "x-kloudtrack-key": "6LHB-G2R6-XJQI-4JN4",
          },
        }
      );
      const data: StationData[] = await response.json();

      const locationData = data.find((item) => item.id === locationId);

      if (locationData) {
        const weatherData: WeatherData = {
          temperature: locationData.data.temperature,
          feelsLike: locationData.data.heatIndex,
          uvIndex: locationData.data.uvIndex,
          windSpeed: locationData.data.windSpeed,
          visibility: 10,
          humidity: locationData.data.humidity,
          skyCondition: "Clear",
        };

        setCurrentWeather(weatherData);
      } else {
        console.error("Location not found in the locationData.");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await fetch("http://localhost:8000/get/stations/aws", {
          headers: {
            "x-kloudtrack-key": "6LHB-G2R6-XJQI-4JN4",
          },
        });
        const data: StationData[] = await response.json();
        setLocationData(data);

        if (data.length > 0) {
          setSelectedLocation({
            location: data[0].name,
            area: data[0].barangay,
          });
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    fetchLocationData();
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      const locationId = locationData.find(
        (loc) =>
          loc.name === selectedLocation.location &&
          loc.barangay === selectedLocation.area
      )?.id;

      if (locationId) {
        fetchWeatherData(locationId);
      }
    }
  }, [selectedLocation]);

  return (
    <LocationContext.Provider
      value={{
        locationData,
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
