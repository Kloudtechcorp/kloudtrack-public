"use client";

import Terminology from "@/components/shared/terminology";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-3 bg-blue min-h-screen">
      <div className="container mx-auto">
        <Terminology />
      </div>
      <footer className="flex container mx-auto items-end">
        Disclaimer: Kloudtech does not claim any data taken from PAGASA for our
        knowledge base. If you need more information, visit their website at
        <a
          href="https://www.pagasa.dost.gov.ph/"
          className="text-blue-700 underline px-1"
        >
          pagasa.dost.gov.ph
        </a>
      </footer>
    </main>
  );
}
