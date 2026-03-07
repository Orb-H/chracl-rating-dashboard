import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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

export function TeamMatchItem({
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
  const { sortedTeams, totalPointsByTeamId } = sortedTeamWithPoints({
    match,
    competition,
  });

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">순위</TableHead>
            <TableHead className="text-center">선수</TableHead>
            <TableHead className="text-center">팀</TableHead>
            <TableHead className="text-center">
              레이팅
              <br />
              (변동)
            </TableHead>
            <TableHead className="text-center">
              기록
              <br />
              (페널티)
            </TableHead>
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
                  {team?.name && (
                    <Badge className={badgeStyle}>팀 {team.name}</Badge>
                  )}
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
      {match.pointsSchemeId && (
        <>
          <Separator className="my-4" />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">팀</TableHead>
                <TableHead className="text-center">총점</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTeams.map((team) => {
                const badgeStyle = team?.style?.badge ?? "";

                return (
                  <TableRow key={team.id}>
                    <TableCell className="text-center">
                      {team?.name && (
                        <Badge className={badgeStyle}>팀 {team.name}</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {totalPointsByTeamId[team.id] ?? "-"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </>
      )}
    </>
  );
}

function sortedTeamWithPoints({
  match,
  competition,
}: {
  match: Match;
  competition: Competition;
}) {
  if (!match.pointsSchemeId) {
    return {
      sortedTeams: competition.teams,
      totalPointsByTeamId: Object.fromEntries(
        competition.teams.map((team) => [team.id, 0]),
      ),
    };
  }

  const totalPointsByTeamId = Object.fromEntries(
    competition.teams.map((team) => {
      const teamParticipants = match.participants.filter(
        (participant) => participant.teamId === team.id,
      );
      const teamPoints = teamParticipants.reduce((sum, participant) => {
        const points =
          competition.pointsSchemes[match.pointsSchemeId!]?.[
            participant.place - 1
          ] ?? 0 + (participant.bonusPoints ?? 0);
        return sum + points;
      }, 0);
      return [team.id, teamPoints];
    }),
  );
  const sortedTeams = [...competition.teams]
    .filter((team) =>
      match.participants.some((participant) => participant.teamId === team.id),
    )
    .sort((a, b) => {
      const pointsA = totalPointsByTeamId[a.id] ?? Number.MIN_SAFE_INTEGER;
      const pointsB = totalPointsByTeamId[b.id] ?? Number.MIN_SAFE_INTEGER;

      if (pointsA === pointsB) {
        const bestPlaceA = Math.min(
          ...match.participants
            .filter((participant) => participant.teamId === a.id)
            .map((participant) => participant.place ?? Number.MAX_SAFE_INTEGER),
        );
        const bestPlaceB = Math.min(
          ...match.participants
            .filter((participant) => participant.teamId === b.id)
            .map((participant) => participant.place ?? Number.MAX_SAFE_INTEGER),
        );
        return bestPlaceA - bestPlaceB;
      }
      return pointsB - pointsA;
    });

  return { sortedTeams, totalPointsByTeamId };
}
