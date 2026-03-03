import { StarIcon, TrophyIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TierBadge } from "@/components/TierBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { Competition } from "@/types/competition";
import { Entry } from "@/types/entry";
import { Career, Tier } from "@/types/player";
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
  const validMatches = ratingHistoryByMatch.filter(
    (history) => history.entryId !== "initial",
  );
  const careerHighMatch = validMatches.reduce((best, current) => {
    return current.rating.value > best.rating.value ? current : best;
  }, validMatches[0]);

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
          <header className="font-semibold text-lg mb-4">레이팅</header>
          {currentRating?.value && currentRating.value !== 0 ? (
            <div className="grid w-full gap-8 grid-cols-1 md:grid-cols-2">
              <Card className="mb-4 gap-2">
                <CardHeader>현재 레이팅</CardHeader>
                <CardContent>
                  <span className="font-semibold text-2xl">
                    {currentRating.value.toFixed(2)}
                  </span>
                  <br />
                  <span className="text-muted-foreground">
                    {rank ?? "-"}위 / {validRatings.length}명
                  </span>
                </CardContent>
              </Card>
              <Card className="mb-4 gap-2">
                <CardHeader>최고 레이팅</CardHeader>
                <CardContent>
                  <span className="font-semibold text-2xl">
                    {careerHighMatch.rating.value.toFixed(2)}
                  </span>
                  <br />
                  <span className="text-muted-foreground">
                    {careerHighMatch.name}
                  </span>
                </CardContent>
              </Card>
            </div>
          ) : (
            <span className="text-muted-foreground">
              아직 대회에 참여한 이력이 없습니다.
            </span>
          )}
          <Separator className="my-4" />
          <header className="font-semibold text-lg mb-4">주요 경력</header>
          {player.career ? (
            <CareerList
              competitions={competitions}
              entries={entries}
              tiers={player.tiers}
              histories={histories}
              career={player.career}
            />
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

function CareerList({
  competitions,
  entries,
  tiers,
  histories,
  career,
}: {
  competitions: Competition[];
  entries: Record<string, Entry>;
  tiers?: Record<string, Tier>;
  histories: RatingHistory[];
  career: Career[];
}) {
  const historyByCompetitionId = [histories[0]];
  let lastCompetitionId = entries[histories[0].entryId].competitionId;
  for (const history of histories) {
    const entry = entries[history.entryId];
    const competitionId = entry.competitionId;
    if (competitionId === lastCompetitionId) {
      historyByCompetitionId[historyByCompetitionId.length - 1] = history;
    } else {
      historyByCompetitionId.push(history);
      lastCompetitionId = competitionId;
    }
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>대회</TableHead>
            <TableHead>성적</TableHead>
            <TableHead>티어</TableHead>
            <TableHead>레이팅(변동)</TableHead>
            <TableHead>비고</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {competitions.map((competition) => {
            const careerItems = career.filter(
              (item) => item.competitionId === competition.id,
            );
            if (!careerItems || careerItems.length === 0) {
              return null;
            }
            const individualCareers = careerItems.filter(
              (item) => item.category === "individual",
            );
            const teamCareer = careerItems.find(
              (item) => item.category === "team",
            );

            return (
              <TableRow key={competition.id}>
                <TableCell>
                  <Link
                    href={`/competitions/${competition.id}`}
                    className="underline hover:no-underline"
                  >
                    {competition?.shortName ?? competition.name}
                  </Link>
                </TableCell>
                <TableCell>
                  {teamCareer && (
                    <span
                      className={
                        teamCareer.type === "major"
                          ? "font-semibold bg-accent text-accent-foreground px-2 py-1 rounded-md"
                          : ""
                      }
                    >
                      {isTeamWin(teamCareer.detail) && (
                        <TrophyIcon
                          className="inline w-4 h-4"
                          aria-label="팀 수상"
                        />
                      )}{" "}
                      {teamCareer.detail}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {tiers?.[competition.id] && (
                    <TierBadge tier={tiers?.[competition.id]} />
                  )}
                </TableCell>
                <TableCell>
                  {(() => {
                    let previousRating = 0;
                    const history = historyByCompetitionId.find((h, i) => {
                      if (entries[h.entryId].competitionId === competition.id) {
                        previousRating =
                          i > 0
                            ? historyByCompetitionId[i - 1].rating.value
                            : 0;
                        return true;
                      }
                      return false;
                    });

                    if (!history) {
                      return null;
                    }

                    const ratingDelta = history.rating.value - previousRating;
                    return (
                      <p key={history.entryId}>
                        {history.rating.value.toFixed(2)}{" "}
                        {ratingDelta > 0 ? (
                          <span className="text-blue-500">
                            (+{ratingDelta.toFixed(2)})
                          </span>
                        ) : ratingDelta < 0 ? (
                          <span className="text-red-500">
                            ({ratingDelta.toFixed(2)})
                          </span>
                        ) : (
                          <span className="text-muted-foreground">(-)</span>
                        )}
                      </p>
                    );
                  })()}
                </TableCell>
                <TableCell>
                  {individualCareers &&
                    individualCareers.length > 0 &&
                    individualCareers.map((individualCareer, index) => (
                      <span
                        key={`${individualCareer.competitionId}-${individualCareer.detail}-${index}`}
                        className={
                          individualCareer.type === "major"
                            ? "font-semibold bg-accent text-accent-foreground px-2 py-1 rounded-md mr-2"
                            : "mr-2"
                        }
                      >
                        {isIndividualWin(individualCareer.detail) && (
                          <StarIcon
                            className="inline w-4 h-4"
                            aria-label="개인 수상"
                          />
                        )}{" "}
                        {individualCareer.detail}
                      </span>
                    ))}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
