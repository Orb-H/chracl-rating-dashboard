import { ChevronDownIcon } from "lucide-react";
import { notFound } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { loadEntriesById } from "@/lib/loadEntries";
import { loadHistoriesById } from "@/lib/loadHistories";
import { loadMatches } from "@/lib/loadMatches";
import { loadPlayerById, loadPlayers } from "@/lib/loadPlayers";
import { RatingChart } from "./RatingChart";

export const dynamicParams = false;

export async function generateStaticParams() {
  const players = loadPlayers();

  return players.map((player) => ({
    id: player.id,
  }));
}

export default async function Player({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const player = (() => {
    try {
      return loadPlayerById(id);
    } catch {
      return notFound();
    }
  })();
  const entries = (() => {
    try {
      return loadEntriesById();
    } catch (e) {
      throw new Error(
        "Failed to load entries" + (e instanceof Error ? ": " + e.message : ""),
      );
    }
  })();
  const histories = (() => {
    try {
      return loadHistoriesById(id).sort((a, b) => {
        return entries[a.entryId].sortKey - entries[b.entryId].sortKey;
      });
    } catch (e) {
      throw new Error(
        "Failed to load histories" +
          (e instanceof Error ? ": " + e.message : ""),
      );
    }
  })();
  const participatedMatches = (() => {
    try {
      return loadMatches().filter((match) =>
        match.participants.some((p) => p.id === id),
      );
    } catch (e) {
      throw new Error(
        "Failed to load matches" + (e instanceof Error ? ": " + e.message : ""),
      );
    }
  })();

  const ratingHistoryByMatch = histories.map((history) => {
    const match = participatedMatches.find(
      (match) => match.entryId === history.entryId,
    );
    return {
      ...history,
      name: match ? match.competitionId + " " + match.name : "",
    };
  });

  return (
    <main className="flex flex-col min-h-screen w-full max-w-3xl mx-auto items-center py-16 px-8 md:py-32 md:px-16 bg-background md:items-start">
      <h1 className="mb-8 text-4xl font-bold">{player.displayName}</h1>
      <Collapsible className="w-full group/collapsible" defaultOpen>
        <CollapsibleTrigger className="w-full mb-4 flex flex-row justify-between items-center">
          <span className="text-2xl font-semibold">선수 프로필</span>
          <ChevronDownIcon className="transition-transform group-data-[state=open]/collapsible:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          {/* TOOD(#11): Add a short content about brief profile */}
          추가 예정입니다.
        </CollapsibleContent>
      </Collapsible>
      <Separator className="my-4 w-full" />
      <Collapsible className="w-full group/collapsible">
        <CollapsibleTrigger className="w-full mb-4 flex flex-row justify-between items-center">
          <span className="text-2xl font-semibold">레이팅 그래프</span>
          <ChevronDownIcon className="transition-transform group-data-[state=open]/collapsible:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <RatingChart ratingHistoryByMatch={ratingHistoryByMatch} />
        </CollapsibleContent>
      </Collapsible>
      <Separator className="my-4 w-full" />
    </main>
  );
}
