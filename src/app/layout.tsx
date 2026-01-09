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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} dark`}>
          <div className="flex flex-col bg-background min-h-screen">
            <Header />
            {children}
            <Toaster />
          </div>
      </body>
    </html>
  );
}
