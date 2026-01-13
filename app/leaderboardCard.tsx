import { CrownIcon, MoveRightIcon } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { loadCurrentRating } from "@/lib/loadCurrentRating";
import { loadPlayerById } from "@/lib/loadPlayers";

export function LeaderboardCard() {
  const currentRating = loadCurrentRating();
  const top3 = Object.entries(currentRating)
    .sort((a, b) => b[1].value - a[1].value)
    .slice(0, 3)
    .map((playerIdToRating) => playerIdToRating[0]);

  return (
    <Card>
      <CardHeader className="text-2xl font-bold">현재 레이팅 순위</CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">순위</TableHead>
              <TableHead colSpan={2} className="text-center">
                선수
              </TableHead>
              <TableHead className="text-center">레이팅</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {top3.map((playerId, index) => {
              const player = loadPlayerById(playerId);
              const rating = currentRating[playerId].value;
              return (
                <TableRow
                  key={playerId}
                  className={index === 0 ? "font-semibold" : ""}
                >
                  <TableCell className="text-center">
                    {index === 0 ? (
                      <CrownIcon className="inline w-4 h-4 text-yellow-500" />
                    ) : (
                      index + 1
                    )}
                  </TableCell>
                  <TableCell>
                    <Avatar className="ml-auto">
                      <AvatarImage
                        src={player.avatarUrl}
                        alt={player.displayName}
                        className="object-cover"
                      />
                      <AvatarFallback>
                        {player.displayName?.[0] || ""}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{player.displayName}</TableCell>
                  <TableCell className="text-center">
                    {(Math.round(rating * 100) / 100).toFixed(2)}
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow />
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Button asChild className="ml-auto">
          <Link href="/leaderboard">
            리더보드 보러가기 <MoveRightIcon className="inline" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
