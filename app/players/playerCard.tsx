import { StarIcon, TrophyIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Player } from "@/types/player";
import { Rating } from "@/types/rating";

// TODO: Set current season as a global constant.
const currentSeason = "season3";

export function PlayerCard({ player }: { player: Player & Rating }) {
  let teamWinCount = 0;
  let individualWinCount = 0;

  if (player.career) {
    for (const career of player.career) {
      if (career.detail.includes("우승")) {
        teamWinCount += 1;
      }
      if (
        career.detail.includes("MVP") ||
        career.detail.includes("챔피언") ||
        career.detail.includes("1위")
      ) {
        individualWinCount += 1;
      }
    }
  }

  return (
    <Card className={`${gradientByTier(player.tiers?.[currentSeason] ?? "")}`}>
      {/* TODO(#14): Add a link to each player*/}
      <CardContent className="flex flex-row gap-4">
        <div className="flex flex-col items-center gap-4 w-auto">
          <Avatar className="inline-block h-16 w-16 border-2">
            <AvatarImage
              src={player.avatarUrl}
              alt={player.displayName}
              className="object-cover"
              style={{ imageRendering: "smooth" }}
            />
            <AvatarFallback>{player.displayName?.[0] || ""}</AvatarFallback>
          </Avatar>
          <div className="text-center font-extrabold text-4xl -skew-x-15">
            {player.racingNumber !== undefined
              ? twoDigits(player.racingNumber)
              : "-"}
          </div>
        </div>
        <div className="w-full gap-2 flex flex-col">
          <div className="font-semibold text-2xl">{player.displayName}</div>
          <hr className="border-foreground" />
          <Table className="table-fixed">
            <TableBody>
              <TableRow className="border-b-0">
                <TableCell className="font-semibold p-1">티어</TableCell>
                <TableCell className="p-1">
                  {player.tiers?.[currentSeason] ?? "-"}
                </TableCell>
              </TableRow>
              <TableRow className="border-b-0">
                <TableCell className="font-semibold p-1">레이팅</TableCell>
                <TableCell className="p-1">
                  {player.value !== undefined ? player.value.toFixed(2) : "-"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold p-1">수상 내역</TableCell>
                <TableCell className="p-1">
                  <div className="flex flex-row">
                    {teamWinCount > 0 &&
                      Array.from({ length: teamWinCount }).map((_, i) => (
                        <TrophyIcon
                          key={`team-win-${i}`}
                          className="w-4 h-4"
                          aria-label="팀 우승"
                        />
                      ))}
                    {individualWinCount > 0 &&
                      Array.from({ length: individualWinCount }).map((_, i) => (
                        <StarIcon
                          key={`individual-win-${i}`}
                          className="w-4 h-4"
                          aria-label="개인 우승"
                        />
                      ))}
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function gradientByTier(tier: string) {
  switch (tier) {
    case "1":
      return "bg-linear-60 from-amber-800/50 to-(--card)/50";
    case "1+":
      return "bg-linear-60 from-amber-800/50 via-80% via-(--card)/50 to-amber-800/50";
    case "2":
      return "bg-linear-60 from-slate-500/50 to-(--card)/50";
    case "2+":
      return "bg-linear-60 from-slate-500/50 via-80% via-(--card)/50 to-slate-500/50";
    case "3":
      return "bg-linear-60 from-yellow-500/50 to-(--card)/50";
    case "3+":
      return "bg-linear-60 from-yellow-500/50 via-80% via-(--card)/50 to-yellow-500/50";
    case "4":
      return "bg-linear-60 from-blue-500/50 to-(--card)/50";
    case "4+":
      return "bg-linear-60 from-blue-500/50 via-80% via-(--card)/50 to-blue-500/50";
    case "5":
      return "bg-linear-60 from-rose-500/50 to-(--card)/50";
    case "5+":
      return "bg-linear-60 from-rose-500/50 via-80% via-(--card)/50 to-rose-500/50";
    case "6":
      return "bg-linear-60 from-emerald-500/50 to-(--card)/50";
    case "6+":
      return "bg-linear-60 from-emerald-500/50 via-80% via-(--card)/50 to-emerald-500/50";
    default:
      return "";
  }
}

function twoDigits(num: number) {
  return num.toString().padStart(2, "0");
}
