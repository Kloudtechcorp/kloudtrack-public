"use client";

import { StationData } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

interface AWSStationsContextProps {
  stations: StationData[] | null;
  loading: boolean;
  error: string | null;
  selectedStation: string | null;
  favoriteLocations: string[];
  setSelectedStation: (stationId: string | null) => void;
  addFavoriteLocation: (stationId: string) => void;
  removeFavoriteLocation: (stationId: string) => void;
  refreshStations: () => Promise<void>;
}

const AWSStationsContext = createContext<AWSStationsContextProps | undefined>(undefined);

export const AWSStationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [stations, setStations] = useState<StationData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [favoriteLocations, setFavoriteLocations] = useState<string[]>([]);

  const testAPIConnection = async () => {
    try {
      const response = await fetch("https://app.kloudtechsea.com/api/v1/get/stations/aws", {
        method: "HEAD",
        headers: {
          "x-kloudtrack-key": process.env.NEXT_PUBLIC_API_KEY || "",
        },
      });
      return response.ok;
    } catch (err) {
      console.error("API connection failed:", err);
      return false;
    }
  };

  const fetchStations = useCallback(
    async (showToastOnError = true) => {
      try {
        const response = await fetch("https://app.kloudtechsea.com/api/v1/get/stations/aws", {
          headers: {
            "x-kloudtrack-key": process.env.NEXT_PUBLIC_API_KEY || "",
          },
        });

        if (!response.ok) {
          if (response.status === 0) {
            throw new Error("Network error - check if API is accessible and CORS is configured");
          }
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        const data: StationData[] = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received - expected array");
        }

        if (data.length === 0) {
          console.warn("No stations returned from API");
        }

        setStations(data);
        setError(null);

        return data;
      } catch (err) {
        const errorMessage = (err as Error).message;
        console.error("Error fetching stations:", err);
        setError(errorMessage);

        if (showToastOnError) {
          toast({
            variant: "destructive",
            title: "Failed to fetch stations",
            description: errorMessage,
          });
        }

        return null;
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  const refreshStations = useCallback(async () => {
    setLoading(true);
    await fetchStations(true);
  }, [fetchStations]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const initializeFetch = async () => {
      const isConnected = await testAPIConnection();
      if (!isConnected) {
        setError("Unable to connect to API server");
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Connection Error",
          description: "Unable to connect to weather stations API",
        });
        return;
      }

      await fetchStations(false);

      interval = setInterval(() => {
        fetchStations(false);
      }, 5000);
    };

    initializeFetch();

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [fetchStations, toast]);

  useEffect(() => {
    const savedStation = localStorage.getItem("selectedStation");

    const storedFavorites = localStorage.getItem("favoriteLocations");
    if (storedFavorites) {
      try {
        const favorites = JSON.parse(storedFavorites);
        if (Array.isArray(favorites)) {
          setFavoriteLocations(favorites);
        }
      } catch (err) {
        console.error("Error parsing stored favorites:", err);
        localStorage.removeItem("favoriteLocations");
      }
    }

    if (stations && stations.length > 0) {
      if (savedStation && stations.find((s) => s.id === savedStation)) {
        setSelectedStation(savedStation);
      } else if (!selectedStation) {
        setSelectedStation(stations[0].id);
        localStorage.setItem("selectedStation", stations[0].id);
      }
    }
  }, [stations, selectedStation]);

  const handleSetSelectedStation = (stationId: string | null) => {
    setSelectedStation(stationId);
    if (stationId) {
      localStorage.setItem("selectedStation", stationId);
    } else {
      localStorage.removeItem("selectedStation");
    }
  };

  const handleAddFavoriteLocation = (stationId: string) => {
    if (!stations?.find((s) => s.id === stationId)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Station not found.",
      });
      return;
    }

    setFavoriteLocations((prevFavorites) => {
      if (prevFavorites.includes(stationId)) {
        toast({
          title: "Already in Favorites",
          description: "This station is already in your favorites.",
        });
        return prevFavorites;
      }

      if (prevFavorites.length >= 3) {
        toast({
          variant: "destructive",
          title: "Limit Reached",
          description: "You can only add up to 3 stations to your favorites.",
        });
        return prevFavorites;
      }

      const updatedFavorites = [...prevFavorites, stationId];

      try {
        localStorage.setItem("favoriteLocations", JSON.stringify(updatedFavorites));

        toast({
          variant: "default",
          title: "Added to Favorites",
          description: "This station has been added to your favorites.",
        });
      } catch (err) {
        console.error("Error saving favorites to localStorage:", err);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to save favorites.",
        });
        return prevFavorites;
      }

      return updatedFavorites;
    });
  };

  const handleRemoveFavoriteLocation = (stationId: string) => {
    setFavoriteLocations((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter((id) => id !== stationId);

      try {
        localStorage.setItem("favoriteLocations", JSON.stringify(updatedFavorites));

        toast({
          title: "Station Removed",
          description: "This station has been removed from your favorites.",
        });
      } catch (err) {
        console.error("Error saving favorites to localStorage:", err);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update favorites.",
        });
        return prevFavorites;
      }

      return updatedFavorites;
    });
  };

  return (
    <AWSStationsContext.Provider
      value={{
        stations,
        loading,
        error,
        selectedStation,
        favoriteLocations,
        setSelectedStation: handleSetSelectedStation,
        addFavoriteLocation: handleAddFavoriteLocation,
        removeFavoriteLocation: handleRemoveFavoriteLocation,
        refreshStations,
      }}
    >
      {children}
    </AWSStationsContext.Provider>
  );
};

export const useAWSStations = (): AWSStationsContextProps => {
  const context = useContext(AWSStationsContext);
  if (!context) {
    throw new Error("useAWSStations must be used within an AWSStationsProvider");
  }
  return context;
};
