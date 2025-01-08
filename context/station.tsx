"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface StationData {
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
    recordedAt: string;
    temperature: number;
    humidity: number;
    pressure: number;
    heatIndex: number;
    light: number;
    uvIntensity: number | null;
    windDirection: number | null;
    windSpeed: number | null;
    precipitation: number | null;
    gust: number | null;
    batteryVoltage: number | null;
    uvIndex: number | null;
  };
}

interface AWSStationsContextProps {
  stations: StationData[] | null;
  loading: boolean;
  error: string | null;
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

  return (
    <AWSStationsContext.Provider value={{ stations, loading, error }}>
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
