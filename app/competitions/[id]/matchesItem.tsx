import { AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { Match } from "@/types/match";
import { IndividualMatchItem } from "./individualMatchItem";
import { TeamMatchItem } from "./teamMatchItem";

export function MatchesItem({ match }: { match: Match }) {
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
        ) : match.kind === "INDIVIDUAL" ? (
          <IndividualMatchItem match={match} />
        ) : match.kind === "TEAM" ? (
          <TeamMatchItem match={match} />
        ) : null}
      </AccordionContent>
    </>
  );
}
