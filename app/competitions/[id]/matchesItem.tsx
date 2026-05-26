import { AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { loadCompetitionById } from "@/lib/loadCompetitions";
import { loadHistoriesById } from "@/lib/loadHistories";
import { loadPlayersById } from "@/lib/loadPlayers";
import { Match } from "@/types/match";
import { IndividualMatchItem } from "./individualMatchItem";
import { TeamMatchItem } from "./teamMatchItem";

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
      <AccordionTrigger className="text-2xl font-bold">
        {match.name}
      </AccordionTrigger>
      <AccordionContent className="w-full">
        <ul className="list-disc list-inside mb-4 text-sm text-muted-foreground">
          <li>일자: {match.date}</li>
          <li>트랙: {match.trackName}</li>
        </ul>
        {match.participants.length === 0 ? (
          <p className="text-muted-foreground">
            아직 경기가 진행되지 않았습니다.
          </p>
        ) : match.kind === "INDIVIDUAL" ? (
          <IndividualMatchItem
            match={match}
            players={players}
            competition={competition}
            histories={histories}
          />
        ) : match.kind === "TEAM" ? (
          <TeamMatchItem
            match={match}
            players={players}
            competition={competition}
            histories={histories}
          />
        ) : null}
      </AccordionContent>
    </>
  );
}
