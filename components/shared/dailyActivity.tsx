import React from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { dailyActivityArray } from "@/lib/objects/arrays";

const DailyActivity = () => {
  if (!dailyActivityArray || dailyActivityArray.length === 0) {
    return <div>No activities available.</div>;
  }

  return (
    <div className="flex gap-2 px-1 flex-col w-[22rem] ">
      {dailyActivityArray.map((card, index) => (
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

export default DailyActivity;
