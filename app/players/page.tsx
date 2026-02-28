import { StarIcon, TrophyIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { currentSeason } from "@/lib/constants";
import { loadCurrentRating } from "@/lib/loadCurrentRating";
import { loadPlayers } from "@/lib/loadPlayers";
import { Player } from "@/types/player";
import { Rating } from "@/types/rating";
import { PlayerCard } from "./playerCard";

export default function Participants() {
  const players = loadPlayers();
  const ratings = loadCurrentRating();

  const playersWithRating = players.map((player) => ({
    ...player,
    ...ratings[player.id],
  }));

  return (
    <main className="flex flex-col min-h-screen w-full max-w-3xl mx-auto items-center py-16 px-8 md:py-32 md:px-16 bg-background md:items-start">
      <header className="mb-8 w-full">
        <h1 className="text-4xl font-bold">선수 목록</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          치레동에 참가하는 선수들을 확인해보세요. 트로피(
          <TrophyIcon className="inline w-4 h-4 align-baseline" />
          )는 팀 우승, 별(
          <StarIcon className="inline w-4 h-4 align-baseline" />
          )은 MVP 또는 그에 준하는 개인 상을 의미합니다.
        </p>
      </header>
      <Tabs defaultValue="tier">
        <TabsList className="ml-auto mb-4">
          <TabsTrigger value="tier">티어 순</TabsTrigger>
          <TabsTrigger value="rating">레이팅 순</TabsTrigger>
          <TabsTrigger value="racingNumber">레이싱 넘버 순</TabsTrigger>
        </TabsList>
        <TabsContent value="tier">
          <div className="grid w-full gap-8 grid-cols-1 md:grid-cols-2">
            {sortByTier(playersWithRating).map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="rating">
          <div className="grid w-full gap-8 grid-cols-1 md:grid-cols-2">
            {sortByRating(playersWithRating).map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="racingNumber">
          <div className="grid w-full gap-8 grid-cols-1 md:grid-cols-2">
            {sortByRacingNumber(playersWithRating).map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}

function sortByTier(players: (Player & Rating)[]) {
  // TODO: Introduce proper tier ordering instead of lexicographical ordering.
  return [...players].sort((a, b) => {
    return (b.tiers?.[currentSeason] ?? "").localeCompare(
      a.tiers?.[currentSeason] ?? "",
    );
  });
}

function sortByRating(players: (Player & Rating)[]) {
  return [...players].sort((a, b) => {
    return (
      (b.value ?? Number.MIN_SAFE_INTEGER) -
      (a.value ?? Number.MIN_SAFE_INTEGER)
    );
  });
}

function sortByRacingNumber(players: (Player & Rating)[]) {
  return [...players].sort((a, b) => {
    return (
      (a.racingNumber ?? Number.MAX_SAFE_INTEGER) -
      (b.racingNumber ?? Number.MAX_SAFE_INTEGER)
    );
  });
}
