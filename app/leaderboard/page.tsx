import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { loadCurrentRating } from "@/lib/loadCurrentRating";
import { loadPlayersById } from "@/lib/loadPlayers";

// TODO: Set current season as a global constant.
const currentSeason = "season3";

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
      {/* TODO(#40): Add a popup component to describe about what "티어", "레이팅", and "μ값" is */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">순위</TableHead>
            <TableHead className="pl-12">선수</TableHead>
            <TableHead className="text-center">티어</TableHead>
            <TableHead>레이팅</TableHead>
            <TableHead>μ값</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* TODO(#40): Make each row to direct to player detail page */}
          {/* TODO(#40): Change color palette of the row by tier value */}
          {playersWithCurrentRating.map((player, i) => (
            <TableRow
              key={player.id}
              className={player.mu ? styleByRank(i + 1) : ""}
            >
              <TableCell className="font-mono text-center">
                {player.mu ? i + 1 : "-"}
              </TableCell>
              <TableCell>
                <Avatar className="inline-block align-middle">
                  <AvatarImage
                    src={player.avatarUrl}
                    alt={player.displayName}
                    className="object-cover"
                  />
                  <AvatarFallback>
                    {player.displayName?.[0] || ""}
                  </AvatarFallback>
                </Avatar>
                <span className="ml-2 inline-block align-middle">
                  {player.displayName}
                </span>
              </TableCell>
              <TableCell className="text-center">
                {player.tiers ? player.tiers[currentSeason] : "-"}
              </TableCell>
              <TableCell className="font-mono">
                {player.mu ? roundToTwoDecimals(player.value) : "-"}
              </TableCell>
              <TableCell className="font-mono">
                {player.mu ? roundToTwoDecimals(player.mu) : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableCaption>현재 기준 레이팅 순위</TableCaption>
      </Table>
    </main>
  );
}

function roundToTwoDecimals(num: number): string {
  return (Math.round(num * 100) / 100).toFixed(2);
}

function styleByRank(rank: number): string {
  switch (rank) {
    case 1:
      return "font-semibold bg-yellow-500/20 dark:bg-yellow-500/30";
    case 2:
      return "font-semibold bg-gray-500/20 dark:bg-gray-500/30";
    case 3:
      return "font-semibold bg-amber-700/20 dark:bg-amber-700/30";
    default:
      return "";
  }
}
