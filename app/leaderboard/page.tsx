import { notFound } from "next/navigation";
import { loadEntries } from "@/lib/loadEntries";
import { LeaderboardPageContent } from "./leaderboardPageContent";

export default function Leaderboard() {
  const entries = loadEntries();
  const latestEntry = entries.at(-1);
  if (!latestEntry) {
    return notFound();
  }
  return <LeaderboardPageContent selectedEntryId={latestEntry.id} />;
}
