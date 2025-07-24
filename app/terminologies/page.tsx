"use client";
import GoBackButton from "@/components/shared/back-button";
import Terminology from "@/components/shared/terminology";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-3 bg-blue min-h-screen py-5 ">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <GoBackButton />
        <Terminology />
      </div>
      <footer className="flex container mx-auto items-end px-3 sm:px-4 lg:px-6 pb-4">
        <p className="text-xs sm:text-sm text-center w-full leading-relaxed">
          Disclaimer: Kloudtech does not claim any data taken from PAGASA for
          our knowledge base. If you need more information, visit their website
          at
          <a
            href="https://www.pagasa.dost.gov.ph/"
            className="text-blue-700 underline px-1"
          >
            pagasa.dost.gov.ph
          </a>
        </p>
      </footer>
    </main>
  );
}
