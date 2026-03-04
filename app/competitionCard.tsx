"use client";

import Autoplay from "embla-carousel-autoplay";
import { MoveRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Competition } from "@/types/competition";

export function CompetitionCard({
  competitions,
}: {
  competitions: Competition[];
}) {
  return (
    <Card>
      <CardHeader className="text-2xl font-bold">최근 대회</CardHeader>
      <CardContent>
        <Carousel className="p-0 m-0" plugins={[Autoplay({ delay: 2000 })]}>
          <CarouselContent>
            {competitions.map((competition) => (
              <CarouselItem key={competition.id}>
                <Link
                  href={`/competitions/${competition.id}`}
                  className="underline hover:no-underline"
                >
                  <Card className="overflow-hidden pt-0">
                    <CardHeader className="px-0">
                      <Image
                        src={`/competitions/${competition.id}.png`}
                        alt={competition.name}
                        width={640}
                        height={360}
                        className="w-full"
                      />
                    </CardHeader>
                    <CardContent>
                      <div className="font-semibold">{competition.name}</div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </CardContent>
      <CardFooter>
        <Button asChild className="ml-auto">
          <Link href="/competitions">
            전체 대회 보러가기 <MoveRightIcon className="inline" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
