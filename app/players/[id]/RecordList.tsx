import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Competition } from "@/types/competition";
import { Match } from "@/types/match";
import { Rating, RatingHistory } from "@/types/rating";

export function RecordList({
  id,
  matches,
  competitions,
  histories,
}: {
  id: string;
  matches: Match[];
  competitions: Record<string, Competition>;
  histories: RatingHistory[];
}) {
  const historyMap = Object.fromEntries(
    histories.map((history) => [history.entryId, history]),
  );
  return (
    <>
      {matches && matches.length > 0 ? (
        matches.map((match) => {
          const record = match.participants.find((p) => p.id === id);
          if (!record) return null;

          let time: string | undefined;
          let penaltyTime: string | undefined;
          if (match.type === "QUALIFYING") {
            time = record.record.lapTime;
          } else if (match.type === "MAIN") {
            time = record.record.finishTime;
            if (record.record.penaltyTime) {
              penaltyTime = `(+${record.record.penaltyTime})`;
            }
          }
          if (time === undefined) {
            time = record.record.status;
          }

          const history = historyMap[match.entryId];
          const ratingDelta =
            history && history.previousRating
              ? history.rating.value - history.previousRating.value
              : 0;
          const competition = competitions[match.competitionId];
          const team = competitions[match.competitionId]?.teams.find(
            (team) => team.id === record.teamId,
          );
          const badgeStyle = team?.style?.badge ?? "";

          return (
            <Card
              key={match.competitionId + "-" + match.id}
              className="p-4 mb-4 flex flex-col md:flex-row items-center justify-between gap-4"
            >
              <div className="w-full md:w-[50%] text-center md:text-start">
                <h3 className="text-lg font-semibold">
                  {/* TODO: Introduce more robust field for competition abbreviation */}
                  {competition?.sortOrder && `제 ${competition.sortOrder}회 - `}
                  {match.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  트랙: {match.trackName}
                </p>
                <p>
                  {team?.name ? (
                    <Badge className={badgeStyle}>팀 {team.name}</Badge>
                  ) : (
                    <Badge variant="outline">개인전</Badge>
                  )}
                </p>
              </div>
              <div className="w-full md:w-[50%] grid grid-cols-7 justify-between gap-4 mt-2 md:mt-0 text-center">
                <div className="col-span-2">
                  <p className="text-base font-semibold text-muted-foreground">
                    순위
                  </p>
                  <p>
                    <span className="font-semibold">{record.place}</span> /{" "}
                    {match.participants.length}
                  </p>
                  {record.ratedPlace && match.entryParticipants ? (
                    <p className="text-sm text-muted-foreground">
                      (
                      <span className="font-semibold">{record.ratedPlace}</span>{" "}
                      / {match.entryParticipants})
                    </p>
                  ) : null}
                </div>
                <div className="col-span-2">
                  <p className="font-semibold text-muted-foreground">레이팅</p>
                  {history && history.previousRating ? (
                    <>
                      <p>{history.rating.value.toFixed(2)}</p>
                      <p className="text-sm">
                        <span
                          className={
                            ratingDelta > 0
                              ? "text-blue-500"
                              : ratingDelta < 0
                                ? "text-red-500"
                                : "text-muted-foreground"
                          }
                        >
                          (
                          {ratingDelta > 0
                            ? `+${ratingDelta.toFixed(2)}`
                            : ratingDelta < 0
                              ? ratingDelta.toFixed(2)
                              : "-"}
                          )
                        </span>
                      </p>
                    </>
                  ) : (
                    "-"
                  )}
                </div>
                <div className="col-span-3">
                  <p className="font-semibold text-muted-foreground">기록</p>
                  <p>{time ?? "-"}</p>
                  {penaltyTime && (
                    <p className="text-sm text-muted-foreground">
                      {penaltyTime}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          );
        })
      ) : (
        <span className="text-muted-foreground">
          아직 대회에 참여한 이력이 없습니다.
        </span>
      )}
    </>
  );
}
