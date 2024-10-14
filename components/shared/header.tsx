"use client";

import React from "react";
import Image from "next/image";
import { ComboBox } from "./comboBox";
import { Switch } from "@/components/ui/switch";
import { HeaderProps } from "@/lib/types";
import { useRouter } from "next/navigation";

const Header = ({
  selectedLocations,
  setSelectedLocations,
  setCurrentWeather,
}: HeaderProps) => {
  const router = useRouter();

  return (
    <div className="w-full bg-[#D9D9D9] bg-opacity-25 h-16 flex text-center">
      <div className="items-center flex w-full flex-row justify-start container mx-auto">
        <div className="flex w-full items-center">
          <span onClick={() => router.push("../../app/clear/page")}>
            <Image
              src="/assets/icons/logo.png"
              alt="Logo"
              width={200}
              height={200}
            />
          </span>
          <span className="flex w-full justify-center">
            <ComboBox
              selectedLocations={selectedLocations}
              setSelectedLocations={setSelectedLocations}
              setCurrentWeather={setCurrentWeather}
            />
          </span>
          <span>
            <Switch />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
