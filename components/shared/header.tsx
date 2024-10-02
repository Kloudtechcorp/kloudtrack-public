import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <div className="w-full bg-[#D9D9D9] bg-opacity-25 h-20 flex text-center ">
      <div className="items-center flex w-full flex-row justify-start container mx-auto">
        <div className="flex">
          {/* <span className="text-3xl font-bold capitalize text-[#545454]">
            Kloud
          </span>
          <span className="text-3xl font-bold capitalize text-[#FBD008]">
            Track
          </span> */}
          <Image
            src="/assets/icons/logo.png"
            alt="Logo"
            width={200}
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
