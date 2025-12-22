import { ParameterProvider } from "../hooks/context/parameters-context";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Header from "@/components/custom/shared/header";
import { AWSStationsProvider } from "@/hooks/context/station-context";
import { Toaster } from "@/components/ui/toaster";
import { WeatherProvider } from "@/hooks/context/weather-context";
import GradientWrapper from "@/components/custom/shared/gradient";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kloudtrack",
  description:
    "Kloudtrack is network of real-time hyper localized weather monitoring station with web app to assist local athorities and communities better address weather related challenges.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={montserrat.className}>
        <AWSStationsProvider>
          <ParameterProvider>
            <WeatherProvider>
              <GradientWrapper>
                <Header />
                {children}
                <Toaster />
              </GradientWrapper>
            </WeatherProvider>
          </ParameterProvider>
        </AWSStationsProvider>
      </body>
    </html>
  );
}
