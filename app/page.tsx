"use client";

import CurrentWeather from "@/components/shared/currentWeather";
import DailyCard from "@/components/shared/dailyCard";
import SelectedLocation from "@/components/shared/selectedLocation";
import InfoCard from "@/components/shared/infoCard";
import Sun from "@/components/sun/sun";

export default function Home() {
  return (
    <div className="flex flex-col bg-gradient-to-tr from-[#f7f7f7] via-[#f7f7f7] via-10% to-[#454545] min-h-screen overflow-hidden relative">
      <div className="flex flex-col container mx-auto">
        <div className="flex flex-row relative overflow-hidden">
          <div className="w-full z-50">
            {/* <SelectedLocation /> */}
            {/* <CurrentWeather /> */}
            {/* <DailyCard /> */}
          </div>
        </div>

        {/* <InfoCard /> */}
        {/* <div className="absolute top-0 right-0">
          <div className="ball-1">
            <div className="ball-2">
              <div className="ball-3">
                <div className="ball-4">
                  <div className="ball-5"></div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
