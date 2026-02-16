import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Competition } from "@/types/competition";
import { Match } from "@/types/match";

export function RecordList({
  id,
  matches,
  competitions,
}: {
  id: string;
  matches: Match[];
  competitions: Record<string, Competition>;
}) {
  return (
    <Table>
      <TableHeader className="bg-muted">
        <TableRow>
          <TableHead className="p-2 leading-8">
            <span>경기</span>
            <br />
            <span className="text-muted-foreground">트랙</span>
            <br />
            <span>소속 팀</span>
          </TableHead>
          <TableHead className="p-2 leading-8 text-end">
            <span>기록</span>
            <br />
            <span className="text-muted-foreground">
              레이스 순위 ┃ 전체 순위
            </span>
            <br />
            <span>레이팅 변동</span>
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
            <TableRow key={match.competitionId + "-" + match.id}>
              <TableCell className="leading-8">
                <span>
                  {match.competitionId} {match.name}
                </span>
                <br />
                <span className="text-sm text-muted-foreground">
                  {match.trackName}
                </span>
                <br />
                <span>
                  {competitions[match.competitionId].teams.find(
                    (team) => team.id === record.teamId,
                  )?.name ?? "-"}
                </span>
              </TableCell>
              <TableCell className="leading-8 text-end">
                <span>{time ?? "-"}</span>
                {penaltyTime && (
                  <span className="text-destructive"> {penaltyTime}</span>
                )}
                <br />
                <span className="text-sm text-muted-foreground">
                  <span className="font-bold">{record.place}</span>/
                  {match.participants.length}
                  {record.ratedPlace && match.entryParticipants && (
                    <>
                      {` ┃ `}
                      <span className="font-bold">{record.ratedPlace}</span>/
                      {match.entryParticipants}
                    </>
                  )}
                </span>
                <br />
                <span></span>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
