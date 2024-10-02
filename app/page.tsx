import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen p-8 bg-gradient-to-b from-[#66CCFF] from-0% via-[#CCFFFF] via-75% to-[#FFFFFF] to-100% ">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start ">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Card className="p-3 px-5 flex gap-2 bg-transparent border-transparent">
            <span className=""> Filler Icon</span>
            <div>
              <CardTitle>Umbrellas</CardTitle>
              <div className="flex justify-center items-center gap-1">
                <span className="border-green-500 border-4 rounded h-2 flex "></span>
                <CardDescription>Card Description</CardDescription>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
