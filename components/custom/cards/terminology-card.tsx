import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TerminologyCardProps, TerminologyCardsProps } from "@/lib/types";

export default function TerminologyCards({ dataArray }: TerminologyCardsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
      {dataArray.map((item, index) => (
        <TerminologyCard
          key={index}
          title={item.name}
          description={item.description}
        />
      ))}
    </div>
  );
}

function TerminologyCard({ title, description }: TerminologyCardProps) {
  return (
    <Card className="rounded-md h-full transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
      <CardHeader className="p-3 sm:p-4 pb-2 sm:pb-3">
        <CardTitle className="uppercase text-sm sm:text-base font-semibold leading-tight">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 sm:px-4 pb-3 sm:pb-4">
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
