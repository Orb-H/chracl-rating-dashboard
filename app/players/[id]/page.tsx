import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
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
import { loadCompetitionsById } from "@/lib/loadCompetitions";
import { loadEntriesById } from "@/lib/loadEntries";
import { loadHistoriesById } from "@/lib/loadHistories";
import { loadMatches } from "@/lib/loadMatches";
import { loadPlayerById, loadPlayers } from "@/lib/loadPlayers";
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
  const entries = loadEntriesById();
  const histories = loadHistoriesById(id).sort((a, b) => {
    return entries[a.entryId].sortKey - entries[b.entryId].sortKey;
  });
  const competitions = loadCompetitionsById();
  const participatedMatches = loadMatches()
    .filter((match) => match.participants.some((p) => p.id === id))
    .sort((a, b) => {
      return entries[a.entryId].sortKey - entries[b.entryId].sortKey;
    });

  const ratingHistoryByMatch = histories.map((history) => {
    const match = participatedMatches.find(
      (match) => match.entryId === history.entryId,
    );
    return {
      ...history,
      name: match ? match.competitionId + " " + match.name : "",
    };
  });
  const ratingHistoryByCompetition = [...histories]
    .reverse()
    .reduce(
      (acc, history) => {
        if (acc.length === 0) {
          return [
            { ...history, name: entries[history.entryId].competitionId ?? "" },
          ];
        }

        const last = acc.at(-1)!;
        if (last.name !== (entries[history.entryId].competitionId ?? "")) {
          acc.push({
            ...history,
            name: entries[history.entryId].competitionId ?? "",
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
          <TabsTrigger value="profile">선수 프로필</TabsTrigger>
          <TabsTrigger value="graph">레이팅 그래프</TabsTrigger>
          <TabsTrigger value="record">주행 기록</TabsTrigger>
        </TabsList>
        <Separator className="mb-4 -mt-2" />
        <TabsContent value="profile">
          <span className="font-semibold text-lg">티어 변동</span>
          {player.tiers ? (
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>시즌</TableHead>
                  <TableHead>티어</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(player.tiers).map(([season, tier]) => (
                  <TableRow key={season}>
                    <TableCell>
                      {competitions[season]?.name ?? season}
                    </TableCell>
                    <TableCell className="font-semibold">{tier}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <span className="text-muted-foreground">
              아직 대회에 참여한 이력이 없습니다.
            </span>
          )}
        </TabsContent>
        <TabsContent value="career">
          <span className="font-semibold text-lg">주요 경력</span>
          {player.career ? (
            <CareerList career={player.career} />
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
          <RecordList id={id} matches={participatedMatches} />
        </TabsContent>
      </Tabs>
    </main>
  );
}

function CareerList({ career }: { career: Career[] }) {
  return (
    <ul className="list-disc list-inside">
      {career.map((item, index) => (
        <li key={`${item.detail}-${index}`} className="mb-2">
          <span
            className={
              item.type === "major"
                ? "font-semibold bg-accent text-accent-foreground px-2 py-1 rounded-md"
                : "px-2 py-1 rounded-md"
            }
          >
            {item.detail}
          </span>
        </li>
      ))}
    </ul>
  );
}
