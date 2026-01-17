import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loadCompetitions } from "@/lib/loadCompetitions";
import { CompetitionCard } from "./competitionCard";

export default function Competitions() {
  const competitions = loadCompetitions().sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );

  return (
    <main className="flex flex-col min-h-screen w-full max-w-3xl mx-auto items-center py-16 px-8 md:py-32 md:px-16 bg-background md:items-start">
      <header className="mb-8 w-full">
        <h1 className="text-4xl font-bold">대회 목록</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          현재까지 진행된 치지직 레이싱 동아리 대회들을 확인하세요.
        </p>
      </header>
      <Tabs defaultValue="oldest">
        <TabsList className="ml-auto mb-4">
          <TabsTrigger value="oldest">오래된 순</TabsTrigger>
          <TabsTrigger value="newest">최신 순</TabsTrigger>
        </TabsList>
        <TabsContent value="oldest">
          <div className="grid w-full gap-8 grid-cols-1 md:grid-cols-2">
            {/* TODO(#14): Add a link to each competition*/}
            {competitions.map((competition) => (
              <CompetitionCard
                key={competition.id}
                id={competition.id}
                name={competition.name}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="newest">
          <div className="grid w-full gap-8 grid-cols-1 md:grid-cols-2">
            {/* TODO(#14): Add a link to each competition*/}
            {competitions
              .slice()
              .reverse()
              .map((competition) => (
                <CompetitionCard
                  key={competition.id}
                  id={competition.id}
                  name={competition.name}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
