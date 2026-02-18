import { StarIcon, TrophyIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loadCompetitions, loadCompetitionsById } from "@/lib/loadCompetitions";
import { loadCurrentRating } from "@/lib/loadCurrentRating";
import { loadEntriesById } from "@/lib/loadEntries";
import { loadHistoriesById } from "@/lib/loadHistories";
import { loadMatches } from "@/lib/loadMatches";
import { loadPlayerById, loadPlayers } from "@/lib/loadPlayers";
import { isIndividualWin, isTeamWin } from "@/lib/utils";
import { Career } from "@/types/player";
import { RatingHistory } from "@/types/rating";
import { RatingChart } from "./RatingChart";
import { RecordList } from "./RecordList";

export const dynamicParams = false;

export async function generateStaticParams() {
  const players = loadPlayers();

  return players.map((player) => ({
    id: player.id,
  }));
}

export default async function Player({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const player = (() => {
    try {
      return loadPlayerById(id);
    } catch {
      return notFound();
    }
  })();
  const currentRatings = loadCurrentRating();
  const currentRating = currentRatings[id];
  const validRatings = Object.entries(currentRatings).filter(
    ([_, r]) => r.value !== 0,
  );
  const rank = (() => {
    const items = validRatings.slice().sort((a, b) => b[1].value - a[1].value);
    const idx = items.findIndex(([pid]) => pid === id);
    return idx === -1 ? null : idx + 1;
  })();
  const entries = loadEntriesById();
  const histories = loadHistoriesById(id).sort((a, b) => {
    return entries[a.entryId].sortKey - entries[b.entryId].sortKey;
  });
  const competitions = loadCompetitions();
  const competitionsById = loadCompetitionsById();
  const participatedMatches = loadMatches()
    .filter((match) => match.participants.some((p) => p.id === id))
    .sort((a, b) => {
      return entries[a.entryId].sortKey - entries[b.entryId].sortKey;
    });

  const ratingHistoryByMatch = histories.map((history) => {
    const match = participatedMatches.find(
      (match) => match.entryId === history.entryId,
    );
    const competition = match
      ? competitionsById[match.competitionId]
      : undefined;
    return {
      ...history,
      name: match
        ? `${competition?.sortOrder ? `제 ${competition.sortOrder}회 - ` : ""}${match.name}`
        : "",
    };
  });
  const ratingHistoryByCompetition = [...histories]
    .reverse()
    .reduce(
      (acc, history) => {
        const competitionId = entries[history.entryId].competitionId;
        const competition =
          competitionId !== undefined
            ? competitionsById[competitionId]
            : undefined;

        if (acc.length === 0) {
          return [
            {
              ...history,
              name: competition?.shortName ?? competition?.name ?? "",
            },
          ];
        }

        const last = acc.at(-1)!;
        if (last.name !== (competition?.shortName ?? competition?.name ?? "")) {
          acc.push({
            ...history,
            name: competition?.shortName ?? competition?.name ?? "",
          });
        }
        return acc;
      },
      [] as (RatingHistory & { name: string })[],
    )
    .reverse();

  return (
    <main className="flex flex-col min-h-screen w-full max-w-3xl mx-auto items-center py-16 px-8 md:py-32 md:px-16 bg-background md:items-start">
      <h1 className="mb-8 text-4xl font-bold w-full flex justify-center items-center gap-4">
        <Avatar className="w-24 h-24">
          <AvatarImage
            src={player.avatarUrl}
            alt={player.displayName}
            className="object-cover"
          />
          <AvatarFallback>{player.displayName.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="inline">{player.displayName}</span>
      </h1>
      <Tabs defaultValue="profile" className="w-full mb-8">
        <TabsList variant="line">
          <TabsTrigger value="profile">선수 소개</TabsTrigger>
          <TabsTrigger value="graph">레이팅 그래프</TabsTrigger>
          <TabsTrigger value="record">주행 기록</TabsTrigger>
        </TabsList>
        <Separator className="mb-4 -mt-2" />
        <TabsContent value="profile">
          <header className="font-semibold text-lg mb-4">현재 레이팅</header>
          {currentRating?.value && currentRating.value !== 0 ? (
            <div className="mb-4">
              <span className="font-semibold text-2xl">
                {currentRating.value.toFixed(2)}
              </span>
              <span className="ml-2 text-muted-foreground">
                {rank ?? "-"}위 / {validRatings.length}명
              </span>
            </div>
          ) : (
            <span className="font-semibold text-2xl mb-2">정보 없음</span>
          )}
          <Separator className="mb-4" />
          <header className="font-semibold text-lg mb-4">주요 경력</header>
          {player.career ? (
            <CareerList career={player.career} />
          ) : (
            <span className="text-muted-foreground">
              아직 대회에 참여한 이력이 없습니다.
            </span>
          )}
          <Separator className="my-4" />
          <header className="font-semibold text-lg mb-4">티어 변동</header>

          {player.tiers ? (
            <>
              <span className="text-muted-foreground">
                ※ 티어는 대회 이후에 결정되는 값입니다.
              </span>
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>대회</TableHead>
                    <TableHead>티어</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {competitions.map((competition) => {
                    return (
                      player.tiers?.[competition.id] && (
                        <TableRow key={competition.id}>
                          <TableCell>{competition.shortName}</TableCell>
                          <TableCell className="font-semibold">
                            {player.tiers?.[competition.id]}
                          </TableCell>
                        </TableRow>
                      )
                    );
                  })}
                </TableBody>
              </Table>
            </>
          ) : (
            <span className="text-muted-foreground">
              아직 대회에 참여한 이력이 없습니다.
            </span>
          )}
        </TabsContent>
        <TabsContent value="graph">
          <RatingChart
            ratingHistoryByCompetition={ratingHistoryByCompetition}
            ratingHistoryByMatch={ratingHistoryByMatch}
          />
        </TabsContent>
        <TabsContent value="record">
          <RecordList
            id={id}
            matches={participatedMatches}
            competitions={competitionsById}
            histories={histories}
          />
        </TabsContent>
      </Tabs>
    </main>
  );
}

function CareerList({ career }: { career: Career[] }) {
  return (
    <ul className="w-full">
      {career.map((item, index) => (
        <li key={`${item.detail}-${index}`} className="py-1">
          <span
            className={
              item.type === "major"
                ? "font-semibold bg-accent text-accent-foreground px-2 py-1 rounded-md"
                : "px-2 py-1 rounded-md"
            }
          >
            {isTeamWin(item.detail) && (
              <>
                <TrophyIcon
                  className="inline w-4 h-4"
                  aria-label="팀 우승"
                />{" "}
              </>
            )}
            {isIndividualWin(item.detail) && (
              <>
                <StarIcon
                  className="inline w-4 h-4"
                  aria-label="개인 우승"
                />{" "}
              </>
            )}
            {item.detail}
          </span>
        </li>
      ))}
    </ul>
  );
}
