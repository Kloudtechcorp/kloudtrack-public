import React from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Line, LineChart } from "recharts";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import { useParameterContext } from "@/context/parametersContext";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

const chartData = [
  { time: "3PM", value: 0 },
  { time: "4PM", value: 50 },
  { time: "5PM", value: 65 },
];

interface InfoCardProps {
  title: string;
  description: string;
  explanation: string;
  tooltip: string;
}
const infoCardData: InfoCardProps[] = [
  {
    title: "Temperature",
    description: "Increase in Temperature",
    explanation: "This is an explanation of temperature",
    tooltip:
      "Ang temperature or temperature ay ang sukatan ng init o lamig sa paligid. Ang temperatura ay nagtatakda kung kailangan natin ng magaan o makapal na damit.",
  },
  {
    title: "Heat Index",
    description: "Increase in Temperature",
    explanation: "This is an explanation of heat index",
    tooltip:
      "Ito ang indikasyon ng kung gaano kalakas ang pakiramdam ng init, isinasaalang-alang ang temperatura at halumigmig. Sa mataas na heat index, pakiramdam mo ay parang nasa ilalim ka ng mainit na araw.",
  },
  {
    title: "UV Index",
    description: "Low (2)",
    explanation: "This is an explanation of UV",
    tooltip:
      "Ang sukatan ng lakas ng ultraviolet (UV) rays mula sa araw. Kapag mataas ang UV Index, mahalaga ang paggamit ng sunscreen upang protektahan ang iyong balat mula sa sunburn at iba pang pinsala.",
  },
  {
    title: "Precipitation",
    description: "Rising slowly",
    explanation: "This is an explanation of precipitation",
    tooltip:
      "Ito ay tumutukoy sa pag-ulan, niyebe, o yelo na bumabagsak mula sa langit. Ang impormasyon tungkol sa precipitasyon ay nagbibigay ng ideya kung kailangan mong magdala ng payong o maghanda para sa mas malamig na kondisyon.",
  },

  {
    title: "Wind",
    description: "Force: 5 (Fresh Breeze)",
    explanation: "This is an explanation of wind",
    tooltip:
      "Ang paggalaw ng hangin sa kapaligiran. Ang lakas at direksyon ng hangin ay maaaring makaapekto sa pakiramdam ng temperatura at sa mga kondisyon sa labas.",
  },
  {
    title: "Air Pressure",
    description: "Rising slowly",
    explanation: "This is an explanation of pressure",
    tooltip:
      "Ang puwersa na inilalapat ng hangin sa ibabaw ng lupa. Ang pagbabago sa presyon ng hangin ay maaaring magdulot ng mga pagbabago sa panahon at kalagayan ng ating pakiramdam.",
  },
  {
    title: "Humidity",
    description: "Relatively Humid (50%)",
    explanation: "This is an explanation of humidity",
    tooltip:
      "Ang dami ng moisture sa hangin. Ang mataas na halumigmig ay nagbibigay ng pakiramdam ng init, habang ang mababang halumigmig ay mas tuyo at komportable.",
  },
  {
    title: "Cloud Cover",
    description: "Mostly Clear (32%)",
    explanation: "This is an explanation of cloud cover",
    tooltip:
      "Ang antas ng pagkakabara ng mga ulap sa langit. Ang impormasyon tungkol sa takip-ulap ay makakatulong sa iyo na malaman kung kailangan mong magdala ng payong o magplano para sa mga aktibidad sa labas.",
  },
];

const InfoCards = React.memo(() => {
  const router = useRouter();
  const { setSelectedParameter } = useParameterContext();

  return (
    <div className="flex gap-3 px-1 py-32 flex-wrap w-full ">
      {infoCardData.map((card, index) => (
        <Card
          key={index}
          className="p-3 flex bg-[#545454] bg-opacity-5 border-transparent rounded-md w-[23%]"
        >
          <div
            onClick={() => {
              setSelectedParameter(card.title);
              router.push("graphs");
            }}
          >
            <div className="flex flex-col justify-center gap-2 w-full">
              <div className="flex items-center gap-2">
                <CardTitle>{card.title}</CardTitle>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle height={20} width={20} fill="#FDB008" />
                    </TooltipTrigger>
                    <TooltipContent className="min-w-40 max-w-64 text-wrap">
                      <p>{card.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <Card className="p-6 shadow-none bg-[#545454] bg-opacity-10 border-none">
                <ChartContainer
                  config={chartConfig}
                  className="min-h-[150px] w-full flex justify-center items-center"
                >
                  <LineChart
                    accessibilityLayer
                    data={chartData}
                    margin={{ top: 30, right: 10, bottom: 30, left: 10 }}
                  >
                    <Line
                      dataKey="value"
                      type="monotone"
                      strokeWidth={4}
                      dot={(dotProps) => {
                        const { index, cx, cy } = dotProps;

                        if (index > 0 && index < chartData.length - 1) {
                          return (
                            <circle
                              r={16}
                              fill="var(--color-desktop)"
                              cx={cx}
                              cy={cy}
                            />
                          );
                        }
                        return <></>;
                      }}
                    />
                  </LineChart>
                </ChartContainer>

                <div className="flex justify-end font-medium text-5xl items-end px-4">
                  30
                  <span className="text-4xl">°C</span>
                </div>
              </Card>

              <CardTitle>{card.description}</CardTitle>
              <CardDescription className="text-black">
                {card.explanation}
              </CardDescription>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
});

InfoCards.displayName = "InfoCards";

export default InfoCards;
