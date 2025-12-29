"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";

const Header = () => {
  const router = useRouter();

  return (
    <div className="w-full h-14 flex items-center bg-zinc-950 border-b-2 border-zinc-800 z-50">
      <div className="container mx-auto px-4">
        <div className="flex w-full items-center justify-between">
          <span className="cursor-pointer" onClick={() => router.push("/")}>
            <p className="text-base font-mono font-bold uppercase tracking-wider">
              <span className="text-white">[KLOUD</span>
              <span className="text-yellow-500">TRACK]</span>
            </p>
          </span>
          <button
            onClick={() => router.push("/terminologies")}
            className="px-3 py-1.5 border-2 border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:border-zinc-700
                       text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <BookOpen size={14} strokeWidth={2} />
            <span className="text-xs font-mono uppercase tracking-wider">TERMS</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;