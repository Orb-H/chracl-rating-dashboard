import { loadCompetitions } from "@/lib/loadCompetitions";
import { loadEntries } from "@/lib/loadEntries";
import { loadLeaderboardRatingsByEntry } from "@/lib/loadLeaderboardRatingsByEntry";
import { LeaderboardTab } from "./leaderboardTab";

export default function Leaderboard() {
  const competitions = loadCompetitions();
  const entries = loadEntries();
  const latestEntry = entries.at(-1);
  const initialPlayerRatingsByEntry = latestEntry
    ? { [latestEntry.id]: loadLeaderboardRatingsByEntry(latestEntry.id) }
    : {};

  return (
    <main className="flex flex-col min-h-screen w-full max-w-3xl mx-auto items-center py-16 px-8 md:py-32 md:px-16 bg-background md:items-start">
      <header className="mb-8 w-full">
        <h1 className="text-4xl font-bold">레이팅 리더보드</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          치레동 선수들의 레이팅 순위를 확인하세요.
        </p>
      </header>
      <LeaderboardTab
        competitions={competitions}
        entries={entries}
        initialPlayerRatingsByEntry={initialPlayerRatingsByEntry}
      />
    </main>
  );
}
