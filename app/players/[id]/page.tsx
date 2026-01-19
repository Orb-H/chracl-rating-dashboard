import { notFound } from "next/navigation";
import { loadEntriesById } from "@/lib/loadEntries";
import { loadHistoriesById } from "@/lib/loadHistories";
import { loadMatches } from "@/lib/loadMatches";
import { loadPlayerById, loadPlayers } from "@/lib/loadPlayers";
import { RatingHistory } from "@/types/rating";
import { CollapsibleItem } from "./CollapsibleItem";
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
  const ratingHistoryByCompetition = [...histories]
    .reverse()
    .reduce(
      (acc, history) => {
        if (acc.length === 0) {
          return [
            { ...history, name: entries[history.entryId].competitionId ?? "" },
          ];
        }

        const last = acc.at(-1)!;
        if (last.name !== (entries[history.entryId].competitionId ?? "")) {
          acc.push({
            ...history,
            name: entries[history.entryId].competitionId ?? "",
          });
        }
        return acc;
      },
      [] as (RatingHistory & { name: string })[],
    )
    .reverse();

  return (
    <main className="flex flex-col min-h-screen w-full max-w-3xl mx-auto items-center py-16 px-8 md:py-32 md:px-16 bg-background md:items-start">
      <h1 className="mb-8 text-4xl font-bold">{player.displayName}</h1>
      <CollapsibleItem title="선수 프로필" defaultOpen>
        {/* TODO(#11): Add a short content about brief profile */}
        추가 예정입니다.
      </CollapsibleItem>
      <CollapsibleItem title="레이팅 그래프">
        <RatingChart
          ratingHistoryByCompetition={ratingHistoryByCompetition}
          ratingHistoryByMatch={ratingHistoryByMatch}
        />
      </CollapsibleItem>
    </main>
  );
}
