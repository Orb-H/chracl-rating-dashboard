import { notFound } from "next/navigation";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loadCompetitionById, loadCompetitions } from "@/lib/loadCompetitions";
import { loadMatchesByCompetitionId } from "@/lib/loadMatches";
import { MatchesItem } from "./matchesItem";

export const dynamicParams = false;

export async function generateStaticParams() {
  const competitions = loadCompetitions();

  return competitions.map((competition) => ({
    id: competition.id,
  }));
}

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
        <TabsContent value="overview" className="mt-8 w-full">
          {/* TODO(#15): Add competition metadata and render it here. */}
          <p>대회 정보 페이지는 현재 준비 중입니다.</p>
        </TabsContent>
        <TabsContent value="matches" className="mt-8 w-full">
          <Accordion type="multiple" className="w-full border rounded-lg">
            {competition.matches.length === 0 ? (
              <p className="text-muted-foreground">
                아직 진행된 경기가 없습니다.
              </p>
            ) : (
              competition.matches.map((match) => {
                const targetMatch = matches.find((m) => m.id === match);
                if (!targetMatch) {
                  return null;
                }

                return (
                  <AccordionItem
                    key={match}
                    value={match}
                    className="px-4 border-b last:border-b-0"
                  >
                    <MatchesItem match={targetMatch} />
                  </AccordionItem>
                );
              })
            )}
          </Accordion>
        </TabsContent>
        <TabsContent value="results" className="mt-8 w-full">
          {/* TODO(#15): Add results data of this competition and render it here. */}
          <p>대회 결과 페이지는 현재 준비 중입니다.</p>
        </TabsContent>
      </Tabs>
    </main>
  );
}
