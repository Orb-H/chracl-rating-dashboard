import { loadCompetitions } from "@/lib/loadCompetitions";
import { loadEntries, loadEntriesById } from "@/lib/loadEntries";
import { loadHistories } from "@/lib/loadHistories";
import { loadPlayersById } from "@/lib/loadPlayers";
import { LeaderboardTab } from "./leaderboardTab";

export default function Leaderboard() {
  const players = loadPlayersById();
  const competitions = loadCompetitions();
  const entries = loadEntries();
  const entriesById = loadEntriesById();
  const histories = loadHistories();

  const playerRatingsByEntry = Object.fromEntries(
    entries.map((entry) => {
      const playerRatings = Object.entries(players)
        .map(([id, player]) => {
          const playerHistories = histories[id].filter(
            (history) =>
              entriesById[history.entryId].sortKey <= entry.sortKey &&
              history.entryId !== "initial",
          );
          return playerHistories.length > 0
            ? {
                ...player,
                ...playerHistories[playerHistories.length - 1].rating,
              }
            : null;
        })
        .filter((rating) => rating !== null);
      return [entry.id, playerRatings.sort((a, b) => b.value - a.value)];
    }),
  );

  return (
    <main className="flex flex-col min-h-screen w-full max-w-3xl mx-auto items-center py-16 px-8 md:py-32 md:px-16 bg-background md:items-start">
      <header className="mb-8 w-full">
        <h1 className="text-4xl font-bold">레이팅 리더보드</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          치레동 선수들의 레이팅 순위를 확인하세요.
        </p>
      </header>
      {/* TODO: optimize client payload */}
      <LeaderboardTab
        competitions={competitions}
        entries={entries}
        playerRatingsByEntry={playerRatingsByEntry}
      />
    </main>
  );
}
