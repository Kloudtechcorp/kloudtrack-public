import { ParameterProvider } from "../hooks/context/parameters-context";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Header from "@/components/layout/header";
import { AWSStationsProvider } from "@/hooks/context/station-context";
import { WeatherProvider } from "@/hooks/context/weather-context";
import GradientWrapper from "@/components/wrapper/gradient";
import { Toaster } from "@/components/ui/sonner";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kloudtrack",
  description:
    "Kloudtrack is network of real-time hyper localized weather monitoring station with web app to assist local athorities and communities better address weather related challenges.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 0,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} w-full`}>
        <AWSStationsProvider>
          <ParameterProvider>
            <WeatherProvider>
              <GradientWrapper>
                <Header />
                {children}

                <Toaster expand />
              </GradientWrapper>
            </WeatherProvider>
          </ParameterProvider>
        </AWSStationsProvider>
      </body>
    </html>
  );
}
