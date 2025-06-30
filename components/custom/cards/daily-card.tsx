"use client";
import React, { useState } from "react";
import DailyActivities from "../../shared/daily-activity";
import DailySuggestions from "../../shared/daily-suggestion";
import { StationData } from "@/lib/types";

const DailyCards = ({ currentWeather }: { currentWeather: StationData }) => {
  const [activeTab, setActiveTab] = useState<"suggestions" | "activities">("suggestions");

  return (
    <div className="flex flex-col justify-center items-center gap-4 py-3">
      <div className="flex rounded-lg px-2">
        <div
          className={`px-4 py-2 font-bold rounded-l-lg cursor-pointer transition-all duration-300 ease-in-out transform ${
            activeTab === "suggestions" ? "bg-[#FBD008] scale-105" : "bg-white hover:bg-yellow-100 scale-100"
          }`}
          onClick={() => setActiveTab("suggestions")}
        >
          Daily Suggestions
        </div>
        <div className="py-1 bg-[#FBD008]">|</div>
        <div
          className={`px-4 py-2 font-bold rounded-r-lg cursor-pointer transition-all duration-300 ease-in-out transform ${
            activeTab === "activities" ? "bg-[#FBD008] scale-105 " : "bg-white hover:bg-yellow-100 scale-100"
          }`}
          onClick={() => setActiveTab("activities")}
        >
          Daily Activities
        </div>
      </div>
      {activeTab === "suggestions" && <DailySuggestions currentWeather={currentWeather} />}
      {activeTab === "activities" && <DailyActivities currentWeather={currentWeather} />}
    </div>
  );
};

export default DailyCards;
