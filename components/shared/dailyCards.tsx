import React from "react";
import DailyActivities from "./dailyActivities";
import DailySuggestions from "./dailySuggestions";

const DailyCards = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex rounded-xl">
        <div className="px-2 py-1 font-bold rounded-l-xl bg-yellow-400">
          Daily Suggestions
        </div>
        <div className="py-1 font-bold bg-yellow-400">|</div>
        <div className="px-2 py-1 font-bold rounded-r-xl bg-white hover:bg-yellow-100 transition duration-100">
          Daily Activities
        </div>
      </div>
      <DailyActivities />
      {/* <DailySuggestions /> */}
    </div>
  );
};

export default DailyCards;
