"use client";

import Disclaimer from "@/components/custom/terminology/disclaimer";
import TerminologyTabs from "@/components/custom/terminology/terminology-tabs";

export default function Home() {
  return (
    <div className="flex max-w-7xl mx-auto my-8 flex-col items-center gap-3 bg-blue min-h-screen">
      <TerminologyTabs />
      <Disclaimer />
    </div>
  );
}
