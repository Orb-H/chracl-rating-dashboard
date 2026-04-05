import { loadCompetitions } from "@/lib/loadCompetitions";
import { loadEntries } from "@/lib/loadEntries";
import { loadLeaderboardRatingsByEntry } from "@/lib/loadLeaderboardRatingsByEntry";
import { LeaderboardTab } from "./leaderboardTab";

type LeaderboardPageContentProps = {
  selectedEntryId: string;
};

export function LeaderboardPageContent({
  selectedEntryId,
}: LeaderboardPageContentProps) {
  const competitions = loadCompetitions();
  const entries = loadEntries();
  const selectedEntryRatings = loadLeaderboardRatingsByEntry(selectedEntryId);

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
        selectedEntryId={selectedEntryId}
        selectedEntryRatings={selectedEntryRatings}
      />
    </main>
  );
}
