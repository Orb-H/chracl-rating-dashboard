import { loadCurrentRating } from "@/lib/loadCurrentRating";
import { loadPlayers } from "@/lib/loadPlayers";
import { PlayerCard } from "./playerCard";

// TODO: Set current season as a global constant.
const currentSeason = "season3";

export default function Participants() {
  const players = loadPlayers();
  const ratings = loadCurrentRating();

  const playersWithRating = players
    .map((player) => ({
      ...player,
      ...ratings[player.id],
    }))
    // TODO(#10): Provide several sort options
    .sort((a, b) => {
      return (
        (b.tiers?.[currentSeason] ?? "").localeCompare(
          a.tiers?.[currentSeason] ?? "",
        ) || (b.value ?? 0) - (a.value ?? 0)
      );
    });

  return (
    <main className="flex flex-col min-h-screen w-full max-w-3xl mx-auto items-center py-16 px-8 md:py-32 md:px-16 bg-background md:items_start">
      <header className="mb-8 w-full">
        <h1 className="text-4xl font-bold">선수 목록</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          치레동에 참가하는 선수들을 확인해보세요.
        </p>
      </header>
      {/* TODO(#10): Provide several sort options */}
      <div className="grid w-full gap-8 grid-cols-1 md:grid-cols-2">
        {/* TODO(#14): Add a link to each competition*/}
        {playersWithRating.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </main>
  );
}
