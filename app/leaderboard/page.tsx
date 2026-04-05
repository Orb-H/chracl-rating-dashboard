import { loadEntries } from "@/lib/loadEntries";
import { LeaderboardPageContent } from "./leaderboardPageContent";

export default function Leaderboard() {
  const entries = loadEntries();
  const latestEntry = entries.at(-1)!;
  return <LeaderboardPageContent selectedEntryId={latestEntry.id} />;
}
