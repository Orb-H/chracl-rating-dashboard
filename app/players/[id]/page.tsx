import { notFound } from "next/navigation";
import { loadEntriesById } from "@/lib/loadEntries";
import { loadHistoriesById } from "@/lib/loadHistories";
import { loadMatches } from "@/lib/loadMatches";
import { loadPlayerById, loadPlayers } from "@/lib/loadPlayers";
import { RatingChart } from "./RatingChart";

export const dynamicParams = false;

export async function generateStaticParams() {
  const participants = loadPlayers();

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
  const participant = (() => {
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
    try {
      const match = participatedMatches.find(
        (match) => match.entryId === history.entryId,
      );
      return {
        ...history,
        ...match,
        name: match ? match.competitionId + " " + match.name : "",
      };
    } catch {
      throw new Error("Failed to load match for history");
    }
  });

  return (
    <main className="flex flex-col min-h-screen w-full max-w-3xl mx-auto items-center py-16 px-8 md:py-32 md:px-16 bg-background md:items-start">
      <h1 className="mb-8 text-4xl font-bold">{participant.displayName}</h1>
      <RatingChart ratingHistoryByMatch={ratingHistoryByMatch} />
    </main>
  );
}
