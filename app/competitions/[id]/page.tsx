import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loadCompetitionById, loadCompetitions } from "@/lib/loadCompetitions";

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
          {/* TODO(#15): Add matches data of this competition. */}
          <p>경기 목록 페이지는 현재 준비 중입니다.</p>
        </TabsContent>
        <TabsContent value="results" className="mt-8 w-full">
          {/* TODO(#15): Add results data of this competition and render it here. */}
          <p>대회 결과 페이지는 현재 준비 중입니다.</p>
        </TabsContent>
      </Tabs>
    </main>
  );
}
