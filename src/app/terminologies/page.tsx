"use client";

import TerminologyTabs from "@/components/custom/terminology/terminology";

export default function Home() {
  return (
    <div className="flex max-w-7xl mx-auto my-8 flex-col items-center gap-3 bg-blue min-h-screen">
      <TerminologyTabs />
      <footer className="flex max-w-7xl mx-auto items-end">
        Disclaimer: Kloudtech does not claim any data taken from PAGASA for our
        knowledge base. If you need more information, visit their website at
        <a
          href="https://www.pagasa.dost.gov.ph/"
          className="text-blue-700 underline px-1"
        >
          pagasa.dost.gov.ph
        </a>
      </footer>
    </div>
  );
}
