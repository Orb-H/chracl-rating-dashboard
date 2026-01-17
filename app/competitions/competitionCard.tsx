import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type CompetitionCardProps = {
  id: string;
  name: string;
};

export function CompetitionCard({ id, name }: CompetitionCardProps) {
  return (
    <Card className="overflow-hidden pt-0">
      <CardHeader className="px-0">
        <Image
          src={`/competitions/${id}.png`}
          alt={name}
          width={640}
          height={360}
          className="w-full"
        />
      </CardHeader>
      <CardContent>
        <div className="font-semibold">{name}</div>
      </CardContent>
    </Card>
  );
}
