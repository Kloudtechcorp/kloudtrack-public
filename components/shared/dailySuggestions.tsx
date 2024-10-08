import React from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface DailySuggestionsData {
  title: string;
  description: string;
  imageSrc: string;
  altText: string;
  color: string;
}

const dailySuggestions: DailySuggestionsData[] = [
  {
    title: "Umbrellas",
    description: "Highly suggested",
    imageSrc: "assets/dailyIcons/umbrella.svg",
    altText: "Umbrella",
    color: "green-500",
  },
  {
    title: "Refreshments",
    description: "Highly suggested",
    imageSrc: "assets/dailyIcons/bottle.svg",
    altText: "Refreshment",
    color: "green-500",
  },
  {
    title: "Sunscreen",
    description: "Highly suggested",
    imageSrc: "assets/dailyIcons/sunscreen.svg",
    altText: "Sunscreen",
    color: "green-500",
  },
  {
    title: "Clothing",
    description: "Highly suggested",
    imageSrc: "assets/dailyIcons/clothing.svg",
    altText: "Clothing",
    color: "yellow-500",
  },
  {
    title: "Driving Conditions",
    description: "Safe",
    imageSrc: "assets/dailyIcons/car.svg",
    altText: "Car",
    color: "green-500",
  },
  {
    title: "Heat Stroke",
    description: "Danger",
    imageSrc: "assets/dailyIcons/temp.svg",
    altText: "Temp",
    color: "red-500",
  },
];

const DailyActivities = () => {
  return (
    <div className="flex gap-2 px-1 flex-col w-[22rem]">
      {dailySuggestions.map((card, index) => (
        <Card
          key={index}
          className="p-3 px-4 flex gap-3 bg-[#FBFBFB] bg-opacity-50 border-transparent rounded-md w-full"
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
                    : "border-transparent"
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
