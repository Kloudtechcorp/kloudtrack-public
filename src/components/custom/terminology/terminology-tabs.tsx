import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { WEATHER_REFERENCES } from "@/lib/constants/weather-references";
import TerminologyCard from "./terminology-card";
type WeatherRefs = typeof WEATHER_REFERENCES;
type WeatherKey = keyof WeatherRefs;
export type WeatherItem = WeatherRefs[WeatherKey][number];


const TerminologyTabs: React.FC = () => {
  const groupKeys = Object.keys(WEATHER_REFERENCES) as WeatherKey[];

  const allItems: (WeatherItem & { category: string })[] = groupKeys.flatMap((key) =>
    WEATHER_REFERENCES[key].map((item) => ({ ...item, category: key }))
  );

  return (
    <Tabs defaultValue="All" className="w-full">
      <TabsList className="w-full justify-start rounded-none border-b bg-transparent border-gray-600 mb-4 overflow-x-auto">
        <TabsTrigger value="All">All</TabsTrigger>
        {groupKeys.map((key) => (
          <TabsTrigger key={key} value={key}>{key}</TabsTrigger>
        ))}
      </TabsList>
      {/* All Tab */}
      <TabsContent value="All">
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
          {allItems.map((item, idx) => (
            <TerminologyCard key={`all-${idx}`} {...item} />
          ))}
        </div>
      </TabsContent>
      {/* Group Tabs */}
      {groupKeys.map((key) => (
        <TabsContent key={key} value={key}>
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
            {WEATHER_REFERENCES[key].map((item, idx) => (
              <TerminologyCard key={`${key}-${idx}`} {...item} category={key} />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TerminologyTabs;