"use client";
import React from "react";
import Image from "next/image";
import { CustomComboBox } from "./combo-box";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Header = () => {
  const router = useRouter();

  return (
    <div className="w-full bg-inherit backdrop-brightness-110 backdrop-blur-sm z-50 h-16 flex text-center sticky top-0">
      <div className="items-center flex w-full flex-row justify-start container mx-auto">
        <div className="flex w-full items-center">
          <span className="cursor-pointer" onClick={() => router.push("/")}>
            <Image src="/icons/logo.png" alt="Logo" width={200} height={200} />
          </span>
          <span className="flex w-full justify-center">
            <CustomComboBox />
          </span>

          <div className="flex gap-3">
            <span>
              <Switch />
            </span>

            <span onClick={() => router.push("/terminologies")}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Image src="/icons/terminologies.svg" alt="Logo" width={52} height={52} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Weather Terminologies</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
