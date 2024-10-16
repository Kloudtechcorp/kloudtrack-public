"use client";

import CurrentWeather from "@/components/shared/currentWeather";
import DailyCard from "@/components/shared/dailyCard";
import SelectedLocation from "@/components/shared/selectedLocation";
import InfoCard from "@/components/shared/infoCard";
import Sun from "@/components/sun/sun";

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className="flex flex-col bg-gradient-to-b from-[#66CCFF] from-0% via-[#CCFFFF] via-75% to-[#FFFFFF] to-100% min-h-screen">
        <div className="flex flex-col container mx-auto">
          <div className="flex flex-row ">
            <div className="w-[50%] ">
              <SelectedLocation />
              <CurrentWeather />
              <DailyCard />
            </div>
            <div className="w-[50%] flex justify-end p-12">
              <Sun />
            </div>
          </div>

          <InfoCard />
        </div>
      </div>
    </main>
  );
}
