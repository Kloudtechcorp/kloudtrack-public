import React from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { dailySuggestionArray } from "@/lib/objects/arrays";
import { StationData } from "@/lib/types";
import { getSuggestion } from "@/lib/get-suggestions";

const DailySuggestion = ({ currentWeather }: { currentWeather: StationData }) => {
  if (!dailySuggestionArray || dailySuggestionArray.length === 0) {
    return <div>No activities available.</div>;
  }

  return (
    <div className="flex gap-2 px-1 flex-col w-[22rem]">
      {dailySuggestionArray.map((card, index) => {
        const suggestion = getSuggestion(card.title, currentWeather);

        return (
          <Card
            key={index}
            className="p-3 px-4 flex gap-3 bg-[#FBFBFB] bg-opacity-50 border-transparent rounded-md w-full"
          >
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={card.imageSrc}
                  alt={card.altText}
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <CardTitle>{card.title}</CardTitle>

              <div className="flex flex-row items-center gap-1">
                <span
                  className={`border-4 rounded h-2 flex ${
                    suggestion.color === "green-500"
                      ? "border-green-500"
                      : suggestion.color === "yellow-500"
                      ? "border-yellow-500"
                      : suggestion.color === "red-500"
                      ? "border-red-500"
                      : suggestion.color === "orange-500"
                      ? "border-orange-500"
                      : suggestion.color === "purple-500"
                      ? "border-purple-500"
                      : "border-transparent"
                  }`}
                />
                <CardDescription className="text-xs font-normal text-[#333]">{suggestion.description}</CardDescription>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default DailySuggestion;
