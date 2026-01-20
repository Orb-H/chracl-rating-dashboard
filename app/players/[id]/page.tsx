import { notFound } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { loadEntriesById } from "@/lib/loadEntries";
import { loadHistoriesById } from "@/lib/loadHistories";
import { loadMatches } from "@/lib/loadMatches";
import { loadPlayerById, loadPlayers } from "@/lib/loadPlayers";
import { Match } from "@/types/match";
import { Career } from "@/types/player";
import { RatingHistory } from "@/types/rating";
import { CollapsibleItem } from "./CollapsibleItem";
import { RatingChart } from "./RatingChart";

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
  const entries = (() => {
    try {
      return loadEntriesById();
    } catch (e) {
      throw new Error(
        "Failed to load entries" + (e instanceof Error ? ": " + e.message : ""),
      );
    }
  })();
  const histories = (() => {
    try {
      return loadHistoriesById(id).sort((a, b) => {
        return entries[a.entryId].sortKey - entries[b.entryId].sortKey;
      });
    } catch (e) {
      throw new Error(
        "Failed to load histories" +
          (e instanceof Error ? ": " + e.message : ""),
      );
    }
  })();
  const participatedMatches = (() => {
    try {
      return loadMatches()
        .filter((match) => match.participants.some((p) => p.id === id))
        .sort((a, b) => {
          return entries[a.entryId].sortKey - entries[b.entryId].sortKey;
        });
    } catch (e) {
      throw new Error(
        "Failed to load matches" + (e instanceof Error ? ": " + e.message : ""),
      );
    }
  })();

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
      <h1 className="mb-8 text-4xl font-bold">{player.displayName}</h1>
      <CollapsibleItem title="선수 프로필" defaultOpen>
        {/* TODO(#11): Add a short content about brief profile */}
        추가 예정입니다.
      </CollapsibleItem>
      <CollapsibleItem title="주요 경력">
        {player.career ? (
          <CareerList career={player.career} />
        ) : (
          <span className="text-muted-foreground">
            아직 대회에 참여한 이력이 없습니다.
          </span>
        )}
      </CollapsibleItem>
      <CollapsibleItem title="레이팅 그래프">
        <RatingChart
          ratingHistoryByCompetition={ratingHistoryByCompetition}
          ratingHistoryByMatch={ratingHistoryByMatch}
        />
      </CollapsibleItem>
      <CollapsibleItem title="주행 기록">
        <RecordItem id={id} matches={participatedMatches} />
      </CollapsibleItem>
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

function RecordItem({ id, matches }: { id: string; matches: Match[] }) {
  return (
    <Table>
      <TableHeader className="bg-muted">
        <TableRow>
          <TableHead className="p-2 leading-8">
            <span>경기</span>
            <br />
            <span>트랙</span>
          </TableHead>
          <TableHead className="p-2 leading-8 text-end">
            <span>기록</span>
            <br />
            <span>순위</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {matches.map((match) => {
          const record = match.participants.find((p) => p.id === id);
          if (!record) return null;

          let time: string | undefined;
          let penaltyTime: string | undefined;
          if (match.type === "QUALIFYING") {
            time = record.record.lapTime;
          } else if (match.type === "MAIN") {
            time = record.record.finishTime ?? "-";
            if (record.record.penaltyTime) {
              penaltyTime = `(+${record.record.penaltyTime})`;
            }
          }

          return (
            <TableRow key={match.id}>
              <TableCell className="leading-8">
                <span>
                  {match.competitionId} {match.name}
                </span>
                <br />
                <span className="text-sm text-muted-foreground">
                  {match.trackName}
                </span>
              </TableCell>
              <TableCell className="leading-8 text-end">
                <span>{time ?? "-"}</span>
                {penaltyTime && (
                  <span className="text-destructive"> {penaltyTime}</span>
                )}
                <br />
                <span className="text-sm text-muted-foreground">
                  {record.place} / {match.participants.length}
                </span>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
