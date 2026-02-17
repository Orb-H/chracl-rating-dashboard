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
  const changeHistories: Record<string, RatingHistory & { delta?: Rating }> =
    Object.fromEntries(
      histories.map((h, i) => {
        if (i === 0) return [h.entryId, h];
        return [
          h.entryId,
          {
            ...h,
            delta: {
              value: h.rating.value - histories[i - 1].rating.value,
              mu: h.rating.mu - histories[i - 1].rating.mu,
              sigma: h.rating.sigma - histories[i - 1].rating.sigma,
            },
          },
        ];
      }),
    );

  return (
    <>
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
        const changeHistory = changeHistories[match.entryId];
        const teamName = competitions[match.competitionId]?.teams.find(
          (team) => team.id === record.teamId,
        )?.name;

        return (
          <Card
            key={match.competitionId + "-" + match.id}
            className="p-4 mb-4 flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="w-full md:w-[50%] text-center md:text-start">
              <h3 className="text-lg font-semibold">
                {match.competitionId} {match.name}
              </h3>
              {/* TODO(#11): Show team name as a colored label with symbol color */}
              {teamName && <p>팀: {teamName}</p>}
              <p className="text-sm text-muted-foreground">
                트랙: {match.trackName}
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
                    (<span className="font-semibold">{record.ratedPlace}</span>{" "}
                    / {match.entryParticipants})
                  </p>
                ) : null}
              </div>
              <div className="col-span-2">
                <p className="font-semibold text-muted-foreground">레이팅</p>
                {changeHistory && changeHistory.delta ? (
                  <>
                    <p>{changeHistory.rating.value.toFixed(2)}</p>
                    {changeHistory.delta.value ? (
                      <p className="text-sm">
                        {" "}
                        <span
                          className={
                            changeHistory.delta.value > 0
                              ? "text-blue-500"
                              : "text-red-500"
                          }
                        >
                          ({changeHistory.delta.value > 0 ? "+" : ""}
                          {changeHistory.delta.value.toFixed(2)})
                        </span>
                      </p>
                    ) : null}
                  </>
                ) : (
                  "-"
                )}
              </div>
              <div className="col-span-3">
                <p className="font-semibold text-muted-foreground">기록</p>
                <p>{time ?? "-"}</p>
                {penaltyTime && (
                  <p className="text-sm text-muted-foreground">{penaltyTime}</p>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </>
  );
}
