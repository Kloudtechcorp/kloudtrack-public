"use client";

import { StationData } from "@/lib/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface AWSStationsContextProps {
  stations: StationData[] | null;
  loading: boolean;
  error: string | null;
  selectedStation: string | null;
  favoriteLocations: string[];
  setSelectedStation: (stationId: string | null) => void;
  addFavoriteLocation: (stationId: string) => void;
  removeFavoriteLocation: (stationId: string) => void;
}

const AWSStationsContext = createContext<AWSStationsContextProps | undefined>(
  undefined
);

export const AWSStationsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [stations, setStations] = useState<StationData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStation, setSelectedStation] = useState<string | null>(
    stations ? stations[0].id : null
  );
  const [favoriteLocations, setFavoriteLocations] = useState<string[]>([]);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch(
          "https://app.kloudtechsea.com/api/v1/get/stations/aws",
          {
            headers: {
              "x-kloudtrack-key": "6LHB-G2R6-XJQI-4JN4",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data: StationData[] = await response.json();
        setStations(data);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
    const interval = setInterval(fetchStations, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const savedStation = localStorage.getItem("selectedStation");
    if (savedStation) {
      setSelectedStation(savedStation);
    }

    const storedFavorites = localStorage.getItem("favoriteLocations");
    if (storedFavorites) {
      setFavoriteLocations(JSON.parse(storedFavorites));
    }
  }, []);

  const handleSetSelectedStation = (stationId: string | null) => {
    setSelectedStation(stationId);
    if (stationId) {
      localStorage.setItem("selectedStation", stationId);
    } else {
      localStorage.removeItem("selectedStation");
    }
  };

  const handleAddFavoriteLocation = (stationId: string) => {
    setFavoriteLocations((prevFavorites) => {
      if (prevFavorites.includes(stationId)) {
        return prevFavorites;
      }

      if (prevFavorites.length < 3) {
        const updatedFavorites = [...prevFavorites, stationId];
        localStorage.setItem(
          "favoriteLocations",
          JSON.stringify(updatedFavorites)
        );

        toast.success("This station has been added to your favorites.");

        return updatedFavorites;
      }

      toast.error("You can only add up to 3 stations to your favorites.");

      return prevFavorites;
    });
  };

  const handleRemoveFavoriteLocation = (stationId: string) => {
    setFavoriteLocations((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter((id) => id !== stationId);
      localStorage.setItem(
        "favoriteLocations",
        JSON.stringify(updatedFavorites)
      );

      toast.success("This station has been removed to your favorites.");
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
      }}
    >
      {children}
    </AWSStationsContext.Provider>
  );
};

export const useAWSStations = (): AWSStationsContextProps => {
  const context = useContext(AWSStationsContext);
  if (!context) {
    throw new Error(
      "useAWSStations must be used within an AWSStationsProvider"
    );
  }
  return context;
};
