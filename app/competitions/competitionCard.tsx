import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CompetitionCardProps = {
  id: string;
  name: string;
};

export function CompetitionCard({ id, name }: CompetitionCardProps) {
  return (
    <Card className="p-0 grid-cols-1 md:grid-cols-2 overflow-hidden">
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
        <CardTitle>{name}</CardTitle>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
