import { notFound } from "next/navigation";
import { Fragment } from "react/jsx-runtime";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loadCompetitionById, loadCompetitions } from "@/lib/loadCompetitions";
import { loadMatchesByCompetitionId } from "@/lib/loadMatches";
import { loadPlayersById } from "@/lib/loadPlayers";
import { Match } from "@/types/match";
import { MatchesItem } from "./matchesItem";
import Season1Result from "./season1Result";
import Season2Result from "./season2Result";

export const dynamicParams = false;

export async function generateStaticParams() {
  const competitions = loadCompetitions();

  return competitions.map((competition) => ({
    id: competition.id,
  }));
}

const results: Record<string, React.ComponentType> = {
  season1: Season1Result,
  season2: Season2Result,
};

export default async function CompetitionDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const competition = (() => {
    try {
      return loadCompetitionById(id);
    } catch {
      return notFound();
    }
  })();
  const matches = loadMatchesByCompetitionId(id);
  const matchesById: Record<string, Match | undefined> = Object.fromEntries(
    matches.map((match) => [match.id, match]),
  );
  const players = loadPlayersById();
  const ResultComponent = results[id];

  return (
    <main className="flex flex-col min-h-screen w-full max-w-3xl mx-auto items-center py-16 px-8 md:py-32 md:px-16 bg-background md:items-start">
      <header className="mb-12 w-full">
        <h1 className="text-4xl font-bold">{competition.name}</h1>
      </header>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList variant="line">
          <TabsTrigger value="overview">대회 정보</TabsTrigger>
          <TabsTrigger value="matches">경기 목록</TabsTrigger>
          <TabsTrigger value="results">대회 결과</TabsTrigger>
        </TabsList>
        <Separator className="mb-4 -mt-2" />
        <TabsContent value="overview" className="w-full">
          <header className="font-semibold text-lg mb-4">참가자 목록</header>
          <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-2">
            {competition.participants.length !== 0 ? (
              competition.participants.map((participant) => (
                <Card key={participant} className="p-2">
                  <CardContent className="px-0">
                    <PlayerAvatar player={players[participant]} />
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-muted-foreground">
                아직 참가자가 확정되지 않았습니다.
              </p>
            )}
          </div>
          <Separator className="my-4" />
          <header className="font-semibold text-lg mb-4">팀 구성</header>
          {competition.teams.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">팀</TableHead>
                  <TableHead
                    className="text-center"
                    colSpan={Math.min(
                      3,
                      Math.max(
                        ...competition.teams.map((team) => team.members.length),
                      ),
                    )}
                  >
                    팀원
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {competition.teams.map(function (team) {
                  const memberCells = team.members
                    .filter((memberId) => players[memberId] !== undefined)
                    .map((memberId) => (
                      <TableCell key={memberId} className="text-center">
                        <PlayerAvatar
                          player={players[memberId]}
                          className="px-2"
                        />
                      </TableCell>
                    ));
                  return (
                    <Fragment key={team.id}>
                      <TableRow>
                        <TableCell
                          className="text-center"
                          rowSpan={Math.ceil(team.members.length / 3)}
                        >
                          <Badge className={team.style?.badge}>
                            {team.name}
                          </Badge>
                        </TableCell>
                        {memberCells.slice(0, 3)}
                      </TableRow>
                      {memberCells.length > 3 &&
                        Array.from({
                          length: Math.ceil(memberCells.length / 3) - 1,
                        }).map((_, index) => (
                          <TableRow key={`${team.id}-extra-${index}`}>
                            {memberCells.slice(
                              (index + 1) * 3,
                              (index + 2) * 3,
                            )}
                          </TableRow>
                        ))}
                    </Fragment>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground">
              아직 팀이 구성되지 않았습니다.
            </p>
          )}
        </TabsContent>
        <TabsContent value="matches" className="w-full">
          <Accordion type="multiple" className="w-full">
            {competition.matches.length === 0 ? (
              <p className="text-muted-foreground">
                아직 진행된 경기가 없습니다.
              </p>
            ) : (
              competition.matches.map((match) => {
                const targetMatch = matchesById[match];
                if (!targetMatch) {
                  return null;
                }

                return (
                  <AccordionItem key={match} value={match}>
                    <MatchesItem match={targetMatch} />
                  </AccordionItem>
                );
              })
            )}
          </Accordion>
        </TabsContent>
        <TabsContent value="results" className="w-full">
          {ResultComponent ? (
            <ResultComponent />
          ) : (
            <p>대회 결과 페이지는 현재 준비 중입니다.</p>
          )}
        </TabsContent>
      </Tabs>
    </main>
  );
}
