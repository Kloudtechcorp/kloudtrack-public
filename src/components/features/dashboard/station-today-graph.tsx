"use client";
import React from "react";
import StationTodayGraphTabs from "./station-today-graph-tabs";

interface StationTodayGraphProps {
  stationPublicId: string;
  stationType?: string;
}

const StationTodayGraph: React.FC<StationTodayGraphProps> = ({ stationPublicId }) => {
  return (
    <div className="flex flex-col gap-4 mb-8">
      <p className="text-foreground text-xl">Today Graph</p>
      <StationTodayGraphTabs stationPublicId={stationPublicId} />
    </div>
  );
};

export default StationTodayGraph;
