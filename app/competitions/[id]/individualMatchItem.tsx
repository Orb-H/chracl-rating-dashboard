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
import { Player } from "@/types/player";
import { RatingHistory } from "@/types/rating";

export function IndividualMatchItem({
  match,
  players,
  competition,
  histories,
}: {
  match: Match;
  players: Record<string, Player>;
  competition: Competition;
  histories: Record<string, Record<string, RatingHistory>>;
}) {
  return (
    <Table className="border rounded-lg">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">순위</TableHead>
          <TableHead className="text-center">선수</TableHead>
          <TableHead className="text-center">레이팅</TableHead>
          <TableHead className="text-center">기록</TableHead>
          {match.pointsSchemeId && (
            <TableHead className="text-center">포인트</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {match.participants.map((participant) => {
          const history = histories[participant.id]?.[match.entryId];
          const ratingDelta = history
            ? history.rating.value - (history.previousRating?.value ?? 0)
            : 0;

          return (
            <TableRow key={participant.id}>
              <TableCell className="text-center">
                {participant.place ?? "-"}
                {participant.ratedPlace !== undefined && (
                  <>
                    <br />
                    <span className="text-muted-foreground">
                      ({participant.ratedPlace})
                    </span>
                  </>
                )}
              </TableCell>
              <TableCell className="text-center">
                {`${players[participant.id].displayName}`}
              </TableCell>
              <TableCell className="text-center">
                {`${history?.rating.value.toFixed(2) ?? "-"}`}
                <br />
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
              </TableCell>
              <TableCell className="text-center">
                {participant.record.lapTime
                  ? `${participant.record.lapTime}`
                  : participant.record.finishTime
                    ? `${participant.record.finishTime}`
                    : participant.record.status}
                <br />
                <span className="text-muted-foreground">
                  {participant.record.penaltyTime
                    ? `(+${participant.record.penaltyTime})`
                    : ""}
                </span>
              </TableCell>
              {match.pointsSchemeId && (
                <TableCell className="text-center">
                  {competition.pointsSchemes[match.pointsSchemeId]?.[
                    participant.place - 1
                  ] ?? "-"}
                  {participant.bonusPoints !== undefined && (
                    <>
                      <br />
                      <span className="text-green-500">
                        (+{participant.bonusPoints})
                      </span>
                    </>
                  )}
                </TableCell>
              )}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
