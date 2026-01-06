import { ConstructionIcon } from "lucide-react";
import { notFound } from "next/navigation";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { loadParticipantById, loadParticipants } from "@/lib/loadParticipants";

export const dynamicParams = false;

export async function generateStaticParams() {
  const participants = loadParticipants();

  return participants.map((participant) => ({
    id: participant.id,
  }));
}

export default async function Participant({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const participant = loadParticipantById(id);

  if (!participant) {
    return notFound();
  }

  return (
    <main className="min-h-screen w-full max-w-3xl items-center py-16 px-8 md:py-32 md:px-16 bg-white dark:bg-black md:items_start">
      {/* TODO(#11): Fill with concrete content */}
      <Empty>
        <EmptyHeader>
          <EmptyMedia>
            <ConstructionIcon />
          </EmptyMedia>
          <EmptyTitle>준비중입니다.</EmptyTitle>
          <EmptyDescription>
            현재 레이아웃 작업 및 데이터 확보 작업을 진행중입니다. 곧{" "}
            <b>{participant.displayName}</b>님의 데이터를 준비할게요!
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </main>
  );
}
