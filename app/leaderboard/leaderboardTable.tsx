import Link from "next/link";
import { TierBadge } from "@/components/TierBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currentSeason } from "@/lib/constants";
import { roundToTwoDecimals } from "@/lib/utils";
import { Player } from "@/types/player";
import { Rating } from "@/types/rating";

type LeaderboardTableProps = {
  ratingData: (Player & Rating)[];
};

export function LeaderboardTable({ ratingData }: LeaderboardTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">순위</TableHead>
          <TableHead className="pl-12">선수</TableHead>
          <TableHead className="text-center">
            <Popover>
              <PopoverTrigger className="underline cursor-help">
                티어
              </PopoverTrigger>
              <PopoverContent side="top">
                대회 종료 후 관계자 회의를 통해서 결정되는 값입니다. 3회 대회
                종료 기준으로 총 6티어 체계입니다. 높을수록 상위 등급에
                해당합니다.
              </PopoverContent>
            </Popover>
          </TableHead>
          <TableHead className="text-center">
            <Popover>
              <PopoverTrigger className="underline cursor-help">
                레이팅
              </PopoverTrigger>
              {/* TODO(#13): Add link to rating introduction page when ready */}
              <PopoverContent side="top">
                대회에서의 경기 결과를 바탕으로 산출되는 값으로, 시스템이
                판단하는 선수 경기력의 저점입니다. 자세한 내용은 레이팅 소개
                페이지를 확인해주세요.
              </PopoverContent>
            </Popover>
          </TableHead>
          <TableHead className="text-center">
            <Popover>
              <PopoverTrigger className="underline cursor-help">
                μ값
              </PopoverTrigger>
              {/* TODO(#13): Add link to rating introduction page when ready */}
              <PopoverContent side="top">
                대회에서의 경기 결과를 바탕으로 산출되는 값으로, 레이팅 시스템이
                판단하는 선수 실력의 평균입니다. 자세한 내용은 레이팅 소개
                페이지를 확인해주세요.
              </PopoverContent>
            </Popover>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ratingData.map((player, i) => (
          <TableRow
            key={player.id}
            className={player.mu ? styleByRank(i + 1) : ""}
          >
            <TableCell className="text-center">
              {player.mu ? i + 1 : "-"}
            </TableCell>
            <TableCell>
              <Link
                href={`/players/${player.id}`}
                className="flex underline hover:no-underline items-center"
              >
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
              </Link>
            </TableCell>
            <TableCell className="text-center">
              {player.tiers?.[currentSeason] ? (
                <TierBadge tier={player.tiers?.[currentSeason]} />
              ) : (
                "-"
              )}
            </TableCell>
            <TableCell className="text-center">
              {player.mu ? roundToTwoDecimals(player.value) : "-"}
            </TableCell>
            <TableCell className="text-center">
              {player.mu ? roundToTwoDecimals(player.mu) : "-"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableCaption>현재 기준 레이팅 순위</TableCaption>
    </Table>
  );
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
