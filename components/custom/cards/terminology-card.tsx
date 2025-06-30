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
<Card className="rounded-lg mb-6 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white border border-gray-800 hover:border-yellow-500/30">
  <CardHeader className="p-2 flex items-start space-x-3">
    <svg
      className="w-6 h-6 text-yellow-500"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h0a1 1 0 001-1v-4a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      />
    </svg>
    <CardTitle className="text-xl font-medium text-black">{title}</CardTitle>
  </CardHeader>
  <CardContent className="p-4 text-black bg-white rounded-b-lg">
    <span className="text-lg leading-relaxed">{description}</span>
  </CardContent>
</Card>
  );
}
