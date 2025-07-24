"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTextColor } from "@/hooks/use-text-color";
import { AlignJustify, BookOpen } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CustomComboBox } from "../custom/combo-box";
import SelectedLocation from "../shared/selected-location";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useState } from "react";

const Header = () => {
  const router = useRouter();
  const textColor = useTextColor();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <header className="w-full backdrop-brightness-100 backdrop-blur-lg z-50 py-3 sticky top-0 shadow-sm">
      <div className="md:container md:mx-auto px-3.5">
        <div className="hidden md:flex items-center w-full md:gap-4 md:flex-row md:justify-between">
          {/* Logo Section */}
          <button
            className="inline-flex items-center flex-grow md:flex-grow-0 justify-start gap-2 p-2 -m-2 rounded-lg hover:bg-black/5 transition-colors w-fit"
            onClick={() => router.push("/")}
            aria-label="Go to homepage"
          >
            <div className="relative h-6 w-6 md:w-9 md:h-9">
              <Image
                src="/icons/kloudtrack.png"
                alt="KloudTrack Logo"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
            <h1
              className="text-sm md:text-xl font-bold"
              style={{ color: textColor }}
            >
              Kloud<span className="text-yellow-500">Track</span>
            </h1>
          </button>

          <div className="flex-shrink-0">
            <CustomComboBox />
          </div>

          <div className="flex-shrink-0">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.push("/terminologies")}
                    aria-label="Weather Terminologies"
                    className="hover:bg-black/5"
                  >
                    <BookOpen className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Weather Terminologies</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="md:hidden flex items-center w-full md:gap-4 md:flex-row md:justify-between">
          <button
            className="inline-flex items-center flex-grow md:flex-grow-0 justify-start gap-2 p-2 -m-2 rounded-lg hover:bg-black/5 transition-colors"
            onClick={() => router.push("/")}
            aria-label="Go to homepage"
          >
            <div className="relative h-6 w-6 md:w-9 md:h-9">
              <Image
                src="/icons/kloudtrack.png"
                alt="KloudTrack Logo"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
            <h1
              className="text-sm md:text-xl font-bold"
              style={{ color: textColor }}
            >
              Kloud<span className="text-yellow-500">Track</span>
            </h1>
          </button>

          <div className="flex-shrink-0">
            <CustomComboBox />
          </div>

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <div className="flex-shrink-0">
              <SheetTrigger asChild>
                <Button
                  variant={"ghost"}
                  className="hover:bg-transparent p-0 pl-1"
                >
                  <AlignJustify
                    className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0"
                    style={{ color: textColor }}
                  />
                </Button>
              </SheetTrigger>
              <SheetContent
                className="backdrop-blur-xl bg-white/80 border-white/20 shadow-xl rounded-br-lg rounded-bl-lg"
                side={"top"}
              >
                <SelectedLocation onClose={() => setIsSheetOpen(false)} />
              </SheetContent>
            </div>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
