"use client";

import React from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface WeatherParametersProps {
  title: string;
  description: string;
  parameter: string;
  imageSrc: string;
  altText: string;
  color: string;
}

const WeatherParametersData: WeatherParametersProps[] = [
  {
    title: "Temperature",
    description: "Highly suggested",
    parameter: "temperature",
    imageSrc: "assets/dailyIcons/umbrella.svg",
    altText: "Umbrella",
    color: "green-500",
  },
  {
    title: "Heat Index",
    description: "Highly suggested",
    parameter: "heatIndex",
    imageSrc: "assets/dailyIcons/bottle.svg",
    altText: "Refreshment",
    color: "green-500",
  },
  {
    title: "UV Index",
    description: "Highly suggested",
    parameter: "uvIndex",
    imageSrc: "assets/dailyIcons/sunscreen.svg",
    altText: "Sunscreen",
    color: "green-500",
  },
  {
    title: "Precipitation",
    description: "Highly suggested",
    parameter: "precipitation",
    imageSrc: "assets/dailyIcons/clothing.svg",
    altText: "Clothing",
    color: "yellow-500",
  },
  {
    title: "Wind",
    description: "Safe",
    parameter: "wind",
    imageSrc: "assets/dailyIcons/car.svg",
    altText: "Car",
    color: "green-500",
  },
  {
    title: "Air Pressure",
    description: "Danger",
    parameter: "airPressure",
    imageSrc: "assets/dailyIcons/temp.svg",
    altText: "Temp",
    color: "red-500",
  },

  {
    title: "Humidity",
    description: "Danger",
    parameter: "humidity",
    imageSrc: "assets/dailyIcons/temp.svg",
    altText: "Temp",
    color: "red-500",
  },
  {
    title: "Cloud Cover",
    description: "Danger",
    parameter: "cloudCover",
    imageSrc: "assets/dailyIcons/temp.svg",
    altText: "Temp",
    color: "red-500",
  },
];

const WeatherParameters = () => {
  const router = useRouter();

  return (
    <div className="flex gap-2 px-1 flex-row w-full">
      {WeatherParametersData.map((card, index) => (
        <Card
          key={index}
          className="p-3 px-4 flex flex-col gap-3 bg-[#FBFBFB] bg-opacity-50 border-transparent rounded-md w-72"
        >
          <button
            type="button"
            onClick={() => router.push(`/graphs/${card.parameter}`)}
          >
            <CardTitle>{card.title}</CardTitle>

            <div className="flex items-start">
              <Image
                src={card.imageSrc}
                alt={card.altText}
                width={40}
                height={40}
              />
            </div>
            <div className="flex flex-col justify-center pr-3">
              <div className="flex justify-start items-center gap-1">
                <span
                  className={`border-${card.color} border-4 rounded h-2 flex`}
                ></span>
                <CardDescription className="text-black">
                  {card.description}
                </CardDescription>
              </div>
            </div>
          </button>
        </Card>
      ))}
    </div>
  );
};

export default WeatherParameters;
