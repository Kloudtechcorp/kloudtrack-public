"use client";
import React from "react";
import Image from "next/image";
import { ComboBox } from "./comboBox";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  return (
    <div className="w-full bg-gray-100 bg-opacity-85 h-16 flex text-center">
      <div className="items-center flex w-full flex-row justify-start container mx-auto">
        <div className="flex w-full items-center">
          <span onClick={() => router.push("/")}>
            <Image
              src="/assets/icons/logo.png"
              alt="Logo"
              width={200}
              height={200}
            />
          </span>
          <span className="flex w-full justify-center">
            <ComboBox />
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
