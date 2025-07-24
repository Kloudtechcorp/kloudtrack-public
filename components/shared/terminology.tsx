import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TerminologyCard from "../custom/cards/terminology-card";
import {
  commonArray,
  rainfallWarningArray,
  floodWarningArray,
  tropicalCycloneArray,
} from "@/lib/objects/arrays";

export default function Terminology() {
  return (
    <div className="mt-3 sm:mt-5 p-3 sm:p-4 lg:p-6 flex bg-[#545454] bg-opacity-5 rounded-md">
      <Tabs defaultValue="common" className="flex flex-col w-full gap-1">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0">
          {/* Mobile: Scrollable tabs */}
          <div className="overflow-x-auto">
            <TabsList className="flex w-max sm:w-auto min-w-full sm:min-w-0">
              <TabsTrigger
                value="common"
                className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 whitespace-nowrap"
              >
                Common
              </TabsTrigger>
              <TabsTrigger
                value="rainfall"
                className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 whitespace-nowrap"
              >
                Rainfall
              </TabsTrigger>
              <TabsTrigger
                value="flood"
                className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 whitespace-nowrap"
              >
                Flood Warning
              </TabsTrigger>
              <TabsTrigger
                value="tropicalCyclone"
                className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 whitespace-nowrap"
              >
                Tropical Cyclone
              </TabsTrigger>
            </TabsList>
          </div>

          {/* <span className="flex w-full sm:w-auto justify-center sm:justify-end">
            <SwitchLanguage />
          </span> */}
        </div>

        <div className="mt-3 sm:mt-4">
          <TabsContent value="common" className="mt-0">
            <TerminologyCard dataArray={commonArray} />
          </TabsContent>
          <TabsContent value="rainfall" className="mt-0">
            <TerminologyCard dataArray={rainfallWarningArray} />
          </TabsContent>
          <TabsContent value="flood" className="mt-0">
            <TerminologyCard dataArray={floodWarningArray} />
          </TabsContent>
          <TabsContent value="tropicalCyclone" className="mt-0">
            <TerminologyCard dataArray={tropicalCycloneArray} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
