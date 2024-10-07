import React from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface DailySuggestionProps {
  title: string;
  description: string;
  imageSrc: string;
  altText: string;
  color: string;
}

const dailySuggestionsData: DailySuggestionProps[] = [
  {
    title: "Jogging",
    description: "Highly suggested",
    imageSrc: "assets/dailyIcons/jog.svg",
    altText: "Jog",
    color: "green-500",
  },
  {
    title: "Cycling",
    description: "Highly suggested",
    imageSrc: "assets/dailyIcons/cycle.svg",
    altText: "Cycle",
    color: "green-500",
  },
  {
    title: "Swimming",
    description: "Highly suggested",
    imageSrc: "assets/dailyIcons/swim.svg",
    altText: "Swim",
    color: "green-500",
  },
  {
    title: "Camping",
    description: "Highly suggested",
    imageSrc: "assets/dailyIcons/camp.svg",
    altText: "Camp",
    color: "yellow-500",
  },
  {
    title: "Sports",
    description: "Safe",
    imageSrc: "assets/dailyIcons/ball.svg",
    altText: "Sports",
    color: "green-500",
  },
];

const DailyActivities = () => {
  return (
    <div className="flex gap-2 px-1 flex-col w-full">
      {dailySuggestionsData.map((card, index) => (
        <Card
          key={index}
          className="p-3 px-4 flex gap-3 bg-[#FBFBFB] bg-opacity-50 border-transparent rounded-md w-80"
        >
          <div className="flex items-start">
            <Image
              src={card.imageSrc}
              alt={card.altText}
              width={40}
              height={40}
            />
          </div>
          <div className="flex flex-col justify-center pr-3">
            <CardTitle>{card.title}</CardTitle>

            <div className="flex justify-start items-center gap-1">
              <span
                className={`border-4 rounded h-2 flex ${
                  card.color === "green-500"
                    ? "border-green-500"
                    : card.color === "yellow-500"
                    ? "border-yellow-500"
                    : card.color === "red-500"
                    ? "border-red-500"
                    : "border-gray-500"
                }`}
              ></span>
              <CardDescription className="text-black">
                {card.description}
              </CardDescription>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DailyActivities;
