"use client";
import { StationData } from "@/lib/types";
import { useState } from "react";
import DailyActivities from "../../shared/daily-activity";
import DailySuggestions from "../../shared/daily-suggestion";

import { ActivityIcon, Lightbulb } from "lucide-react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DailyCards = ({ currentWeather }: { currentWeather: StationData }) => {
  const [activeTab, setActiveTab] = useState<"suggestions" | "activities">(
    "suggestions"
  );

  return (
    <Tabs defaultValue="tab-1" className="">
      <ScrollArea>
        <TabsList className="mb-1 space-x-2 py-3 px-1">
          <TabsTrigger
            value="tab-1"
            onClick={() => setActiveTab("suggestions")}
            className={`md:font-bold cursor-pointer text-xs  transition-all duration-300 ease-in-out transform ${
              activeTab === "suggestions"
                ? "bg-[#FBD008] scale-105"
                : "bg-white hover:bg-yellow-100 scale-100"
            }`}
          >
            <Lightbulb
              className="-ms-0.5 me-1.5 opacity-60 animate-color-change"
              size={16}
              aria-hidden="true"
            />
            Suggestion
          </TabsTrigger>
          <TabsTrigger
            value="tab-2"
            onClick={() => setActiveTab("activities")}
            className={`md:font-bold cursor-pointer text-xs md:text-sm transition-all  duration-300 ease-in-out transform ${
              activeTab === "activities"
                ? "bg-[#FBD008] scale-105 "
                : "bg-white hover:bg-yellow-100 scale-100"
            }`}
          >
            <ActivityIcon
              className="-ms-0.5 me-1.5 opacity-60  animate-color-change"
              size={16}
              aria-hidden="true"
            />
            Activity
          </TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <TabsContent className="" value="tab-1">
        <DailySuggestions currentWeather={currentWeather} />
      </TabsContent>
      <TabsContent value="tab-2">
        <DailyActivities currentWeather={currentWeather} />
      </TabsContent>
    </Tabs>
  );
};

export default DailyCards;
