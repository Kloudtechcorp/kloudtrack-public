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
    <div className="w-full h-16 flex text-center bg-[#242424] z-50">
      <div className="items-center flex w-full flex-row justify-start container mx-auto">
        <div className="flex w-full items-center justify-between">
          <span className="cursor-pointer" onClick={() => router.push("/")}>
            <p style={{ color: "#ffffff"}} className="font-bold text-2xl">Kloud<span style={{ color: "#fbd008" }}>Track</span></p>
          </span>
        </div>
      </div>
    </div>

  );
};

export default Header;