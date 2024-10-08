"use client";

import React from "react";
import Image from "next/image";
import { ComboBox } from "./comboBox";
import { Switch } from "@/components/ui/switch";

const Header = ({ selectedLocations, setSelectedLocations }: any) => {
  return (
    <div className="w-full bg-[#D9D9D9] bg-opacity-25 h-20 flex text-center ">
      <div className="items-center flex w-full flex-row justify-start container mx-auto">
        <div className="flex w-full items-center">
          <span>
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
            />
          </span>
          <span className="">
            <Switch className="" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
