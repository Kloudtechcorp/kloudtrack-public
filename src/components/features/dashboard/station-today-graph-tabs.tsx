"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import StationParameterChart from "./station-parameter-chart";
import { PARAMETERS } from "@/lib/constants/parameters";
import { ParameterType, ParameterDataPoint } from "@/types/parameter";
import { stationService } from "@/services/station.service";

interface StationTodayGraphTabsProps {
  stationPublicId: string;
}

const StationTodayGraphTabs: React.FC<StationTodayGraphTabsProps> = ({ stationPublicId }) => {
  const [activeParameter, setActiveParameter] = useState<ParameterType>('temperature');
  const [parameterData, setParameterData] = useState<Partial<Record<ParameterType, ParameterDataPoint[]>>>({});
  const [loading, setLoading] = useState<Partial<Record<ParameterType, boolean>>>({});
  const [errors, setErrors] = useState<Partial<Record<ParameterType, string | null>>>({});

  // Fetch data for a specific parameter
  const fetchParameterData = useCallback(
    async (parameterKey: ParameterType) => {
      const parameter = PARAMETERS.find((p) => p.key === parameterKey);
      if (!parameter || !stationPublicId) return;

      // Check if data is already loaded
      if (parameterData[parameterKey] && parameterData[parameterKey]!.length > 0) {
        return;
      }

      setLoading((prev) => ({ ...prev, [parameterKey]: true }));
      setErrors((prev) => ({ ...prev, [parameterKey]: null }));

      try {
        const data = await stationService.fetchStationParameterHistory(stationPublicId, parameter.apiKey);
        setParameterData((prev) => ({ ...prev, [parameterKey]: data }));
      } catch (error) {
        console.error(`Failed to fetch ${parameterKey} data:`, error);
        setErrors((prev) => ({
          ...prev,
          [parameterKey]: `Failed to load ${parameter.label} data. Please try again.`,
        }));
      } finally {
        setLoading((prev) => ({ ...prev, [parameterKey]: false }));
      }
    },
    [stationPublicId, parameterData]
  );

  // Fetch data when active parameter changes (lazy loading)
  useEffect(() => {
    fetchParameterData(activeParameter);
  }, [activeParameter, fetchParameterData]);

  // Polling: Refresh active parameter every 5 minutes
  useEffect(() => {
    if (!stationPublicId) return;

    const pollData = async () => {
      const parameter = PARAMETERS.find((p) => p.key === activeParameter);
      if (!parameter) return;

      try {
        const data = await stationService.fetchStationParameterHistory(stationPublicId, parameter.apiKey);
        setParameterData((prev) => ({ ...prev, [activeParameter]: data }));
      } catch (error) {
        console.error(`Failed to refresh ${activeParameter} data:`, error);
      }
    };

    // Poll every 5 minutes (300000 milliseconds)
    const intervalId = setInterval(pollData, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [activeParameter, stationPublicId]);

  // Handle retry for a specific parameter
  const handleRetry = (parameterKey: ParameterType) => {
    // Clear existing data to force re-fetch
    setParameterData((prev) => {
      const newData = { ...prev };
      delete newData[parameterKey];
      return newData;
    });
    fetchParameterData(parameterKey);
  };

  return (
    <Tabs
      defaultValue="temperature"
      value={activeParameter}
      onValueChange={(value) => setActiveParameter(value as ParameterType)}
      className="w-full"
    >
      <TabsList className="bg-white/10 backdrop-blur-md backdrop-brightness-110 border border-white/20 w-full md:w-auto overflow-x-auto">
        {PARAMETERS.map((param) => (
          <TabsTrigger
            key={param.key}
            value={param.key}
            className="text-white data-[state=active]:text-white data-[state=active]:border-white"
          >
            {param.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {PARAMETERS.map((param) => (
        <TabsContent key={param.key} value={param.key}>
          <StationParameterChart
            data={parameterData[param.key] || []}
            parameter={param}
            loading={loading[param.key] || false}
            error={errors[param.key] || null}
            onRetry={() => handleRetry(param.key)}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default StationTodayGraphTabs;
