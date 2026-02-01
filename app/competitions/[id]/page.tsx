import { ConstructionIcon } from "lucide-react";
import { notFound } from "next/navigation";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { loadCompetitionById, loadCompetitions } from "@/lib/loadCompetitions";

export const dynamicParams = false;

export async function generateStaticParams() {
  const competitions = loadCompetitions();

  return competitions.map((competition) => ({
    id: competition.id,
  }));
}

export default async function CompetitionDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const competition = (() => {
    try {
      return loadCompetitionById(id);
    } catch {
      return notFound();
    }
  })();

  return (
    <main className="flex flex-col min-h-screen w-full max-w-3xl mx-auto items-center py-16 px-8 md:py-32 md:px-16 bg-background md:items-start">
      {/* TODO(#15): Fill with concrete content */}
      <Empty>
        <EmptyHeader>
          <EmptyMedia>
            <ConstructionIcon />
          </EmptyMedia>
          <EmptyTitle>준비중입니다.</EmptyTitle>
          <EmptyDescription>
            현재 레이아웃 작업 및 데이터 확보 작업을 진행중입니다. 곧{" "}
            <b>{competition.name}</b> 대회의 데이터를 준비할게요!
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </main>
  );
}
