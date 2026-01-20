import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Match } from "@/types/match";

export function RecordList({ id, matches }: { id: string; matches: Match[] }) {
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
