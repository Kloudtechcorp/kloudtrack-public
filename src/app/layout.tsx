import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Header from "@/components/shared/header";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kloudtrack",
  description:
    "Kloudtrack is network of real-time hyper localized weather monitoring station with web app to assist local athorities and communities better address weather related challenges.",
};

const getOverlayByTime = () => {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 7)
    return "from-orange-500/30 via-orange-600/15 to-transparent" // Dawn
  if (hour >= 7 && hour < 12)
    return "from-sky-400/25 via-sky-500/12 to-transparent" // Morning
  if (hour >= 12 && hour < 17)
    return "from-blue-400/20 via-blue-500/10 to-transparent" // Afternoon
  if (hour >= 17 && hour < 19)
    return "from-orange-600/35 via-orange-700/18 to-transparent" // Sunset
  if (hour >= 19 && hour < 22)
    return "from-indigo-800/40 via-indigo-900/20 to-transparent" // Dusk
  return "from-slate-900/50 via-slate-950/25 to-transparent" // Night
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const overlayClass = getOverlayByTime();

  return (
    <html lang="en">
      <body className={`${montserrat.className} dark bg-background`}>
        <div className="relative flex flex-col min-h-screen">
          {/* Overlay gradient */}
          <div
            className={`absolute inset-0 pointer-events-none bg-linear-to-b ${overlayClass} transition-colors duration-2000`}
          ></div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col min-h-screen">
            <Header />
            {children}
            <Toaster />
          </div>
        </div>
      </body>
    </html>
  );
}
