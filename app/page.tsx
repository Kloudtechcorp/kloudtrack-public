import CurrentWeather from "@/components/shared/currentWeather";
import DailyCards from "@/components/shared/dailyCards";
import Header from "@/components/shared/header";

export default function Home() {
  return (
    <div className="flex flex-col bg-gradient-to-b from-[#66CCFF] from-0% via-[#CCFFFF] via-75% to-[#FFFFFF] to-100% min-h-svh">
      <Header />
      <main className="flex flex-col gap-4 container mx-auto">
        <CurrentWeather />
        <DailyCards />
      </main>
    </div>
  );
}
