"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const Header = () => {
  const router = useRouter();

  return (
    <div className="w-full h-14 flex items-center bg-background border-b-2 border-primary z-50">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex w-full items-center justify-between">
          <span className="cursor-pointer" onClick={() => router.push("/")}>
            <p className="text-base font-mono font-bold uppercase tracking-wider">
              <span className="text-foreground">[KLOUD</span>
              <span className="text-accent">TRACK]</span>
            </p>
          </span>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => router.push("/terminologies")}
              className="px-3 py-1.5 border-2 border-primary bg-secondary hover:bg-secondary-hover
                         text-muted hover:text-foreground flex items-center gap-2"
            >
              <BookOpen size={14} strokeWidth={2} />
              <span className="text-xs font-mono uppercase tracking-wider">TERMS</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;