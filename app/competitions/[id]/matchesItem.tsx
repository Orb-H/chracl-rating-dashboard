import { AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { loadCompetitionById } from "@/lib/loadCompetitions";
import { loadHistoriesById } from "@/lib/loadHistories";
import { loadPlayersById } from "@/lib/loadPlayers";
import { Match } from "@/types/match";

export function MatchesItem({ match }: { match: Match }) {
  const players = loadPlayersById();
  const competition = loadCompetitionById(match.competitionId);
  const histories = Object.fromEntries(
    match.participants.map((participant) => [
      participant.id,
      Object.fromEntries(
        loadHistoriesById(participant.id).map((history) => [
          history.entryId,
          history,
        ]),
      ),
    ]),
  );

  return (
    <>
      <AccordionTrigger className="text-lg font-semibold">
        {match.name}
      </AccordionTrigger>
      <AccordionContent className="w-full">
        트랙: {match.trackName}
        {match.participants.length === 0 ? (
          <p className="text-muted-foreground">
            아직 경기가 진행되지 않았습니다.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">순위</TableHead>
                <TableHead className="text-center">선수</TableHead>
                {/* TODO: Introduce another field in match to indicate if individual match or team match */}
                {match.participants[0].teamId && (
                  <TableHead className="text-center">팀</TableHead>
                )}
                <TableHead className="text-center">레이팅</TableHead>
                <TableHead>기록</TableHead>
                {match.pointsSchemeId && (
                  <TableHead className="text-center">포인트</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {match.participants.map((participant) => {
                const team = competition.teams?.find(
                  (t) => t.id === participant.teamId,
                );
                const badgeStyle = team?.style?.badge ?? "";
                const history = histories[participant.id]?.[match.entryId];
                const ratingDelta =
                  history?.rating.value - (history?.previousRating?.value ?? 0);

                return (
                  <TableRow key={participant.id}>
                    <TableCell className="text-center">
                      {participant.place ?? "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      {`${players[participant.id].displayName}`}
                    </TableCell>
                    {participant.teamId && (
                      <TableCell className="text-center">
                        {team?.name && (
                          <Badge className={badgeStyle}>팀 {team.name}</Badge>
                        )}
                      </TableCell>
                    )}
                    <TableCell className="text-center">
                      {`${history?.rating.value.toFixed(2) ?? "-"}`}{" "}
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
                    <TableCell>
                      {participant.record.lapTime
                        ? `${participant.record.lapTime}`
                        : participant.record.finishTime
                          ? `${participant.record.finishTime}`
                          : participant.record.status}{" "}
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
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
            {/* TODO: Attach point calculation and display here when team/individual separation is introduced */}
          </Table>
        )}
      </AccordionContent>
    </>
  );
}
