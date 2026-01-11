import { loadCompetitionById } from "@/lib/loadCompetitions";
import { CompetitionCard } from "./competitionCard";

const competitionIds = ["season1", "season2", "season3"];

export default function Competitions() {
  const competitions = competitionIds.map(loadCompetitionById);

  return (
    <main className="flex flex-col min-h-screen w-full max-w-3xl mx-auto items-center py-16 px-8 md:py-32 md:px-16 bg-white dark:bg-black md:items_start">
      <header className="mb-8 w-full">
        <h1 className="text-4xl font-bold">대회 목록</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          현재까지 진행된 치지직 레이싱 동아리 대회들을 확인하세요.
        </p>
      </header>
      {/* TODO(#14): Add a newest/oldest option on listing competitions */}
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
    </main>
  );
}
