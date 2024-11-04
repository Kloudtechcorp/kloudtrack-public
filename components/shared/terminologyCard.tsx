import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TerminologyCardProps, TerminologyCardsProps } from "@/lib/types";

export default function TerminologyCards({ dataArray }: TerminologyCardsProps) {
  return (
    <div>
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
    <Card className="rounded-md mb-2">
      <CardHeader className="p-2">
        <CardTitle className="uppercase">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-2 pb-1">
        <span>{description}</span>
      </CardContent>
    </Card>
  );
}
