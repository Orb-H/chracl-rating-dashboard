import { ChartContainer } from "@/components/ui/chart";
import { loadCurrentRating } from "@/lib/loadCurrentRating";
import { loadPlayersById } from "@/lib/loadPlayers";
import { LeaderboardTable } from "./leaderboardTable";

export default function Leaderboard() {
  const currentRating = loadCurrentRating();
  const players = loadPlayersById();

  const playersWithCurrentRating = Object.entries(players)
    .map(([key, player]) => {
      return {
        ...player,
        ...(currentRating[key] ?? { value: Number.MIN_SAFE_INTEGER }),
      };
    })
    .slice()
    .sort((a, b) => b.value - a.value);

  return (
    <main className="flex flex-col min-h-screen w-full max-w-3xl mx-auto items-center py-16 px-8 md:py-32 md:px-16 bg-white dark:bg-black md:items_start">
      <header className="mb-8 w-full">
        <h1 className="text-4xl font-bold">레이팅 리더보드</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          치레동 선수들의 현재 레이팅 순위를 확인하세요.
        </p>
      </header>
      {/* TODO(#40): Add a point graph to map player by rating value */}
      <LeaderboardTable ratingData={playersWithCurrentRating} />
    </main>
  );
}
