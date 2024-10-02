"use client"; // Add this line at the top
import React, { useState } from "react";
import DailyActivities from "./dailyActivities";
import DailySuggestions from "./dailySuggestions";

const DailyCards = () => {
  const [activeTab, setActiveTab] = useState<"suggestions" | "activities">(
    "suggestions"
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex rounded-xl">
        <div
          className={`px-2 py-1 font-bold rounded-l-xl cursor-pointer ${
            activeTab === "suggestions"
              ? "bg-yellow-400"
              : "bg-white hover:bg-yellow-100"
          } transition duration-100`}
          onClick={() => setActiveTab("suggestions")}
        >
          Daily Suggestions
        </div>
        <div className="py-1 font-bold bg-yellow-400">|</div>
        <div
          className={`px-2 py-1 font-bold rounded-r-xl cursor-pointer ${
            activeTab === "activities"
              ? "bg-yellow-400"
              : "bg-white hover:bg-yellow-100"
          } transition duration-100`}
          onClick={() => setActiveTab("activities")}
        >
          Daily Activities
        </div>
      </div>

      {activeTab === "suggestions" && <DailySuggestions />}
      {activeTab === "activities" && <DailyActivities />}
    </div>
  );
};

export default DailyCards;
