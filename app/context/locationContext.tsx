"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  locationArray,
  dailySuggestionArray,
  dailyActivityArray,
} from "@/lib/objects/arrays";
import { LocationContextType, LocationProps } from "@/lib/types";

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [locationData] = useState(locationArray);
  const [suggestions] = useState(dailySuggestionArray);
  const [activities] = useState(dailyActivityArray);

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

  useEffect(() => {
    if (locationData.length > 0 && !selectedLocation) {
      setSelectedLocation({
        location: locationData[0].location,
        area: locationData[0].area,
      });
    }
  }, [locationData, selectedLocation]);

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
