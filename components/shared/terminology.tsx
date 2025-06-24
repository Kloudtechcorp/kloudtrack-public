import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TerminologyCard from "../custom/cards/terminology-card";
import { commonArray, rainfallWarningArray, floodWarningArray, tropicalCycloneArray } from "@/lib/objects/arrays";
// import { SwitchLanguage } from "../ui/switchLanguage";

export default function Terminology() {
  return (
    <div className="mt-5 p-3 flex bg-[#545454] bg-opacity-5 rounded-md">
      <Tabs defaultValue="common" className="flex flex-col w-full gap-1">
        <div className="flex">
          <TabsList>
            <TabsTrigger value="common">Common</TabsTrigger>
            <TabsTrigger value="rainfall">Rainfall</TabsTrigger>
            <TabsTrigger value="flood">Flood Warning</TabsTrigger>
            <TabsTrigger value="tropicalCyclone">Tropical Cyclone Warning</TabsTrigger>
          </TabsList>
          {/* <span className="flex w-full justify-end">
            <SwitchLanguage />
          </span> */}
        </div>
        <TabsContent value="common">
          <TerminologyCard dataArray={commonArray} />
        </TabsContent>
        <TabsContent value="rainfall">
          <TerminologyCard dataArray={rainfallWarningArray} />
        </TabsContent>
        <TabsContent value="flood">
          <TerminologyCard dataArray={floodWarningArray} />
        </TabsContent>
        <TabsContent value="tropicalCyclone">
          <TerminologyCard dataArray={tropicalCycloneArray} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
