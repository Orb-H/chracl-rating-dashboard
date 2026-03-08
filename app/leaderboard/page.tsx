import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loadCompetitions } from "@/lib/loadCompetitions";
import { loadCurrentRating } from "@/lib/loadCurrentRating";
import { loadEntries } from "@/lib/loadEntries";
import { loadPlayersById } from "@/lib/loadPlayers";
import { LeaderboardChart } from "./leaderboardChart";
import { LeaderboardTable } from "./leaderboardTable";

export default function Leaderboard() {
  const currentRating = loadCurrentRating();
  const players = loadPlayersById();
  const competitions = loadCompetitions();
  const entries = loadEntries();

  const playersWithCurrentRating = Object.entries(players)
    .filter(([key]) => currentRating[key] !== undefined)
    .map(([key, player]) => {
      return {
        ...player,
        ...currentRating[key],
      };
    })
    .slice()
    .sort((a, b) => b.value - a.value);

  return (
    <main className="flex flex-col min-h-screen w-full max-w-3xl mx-auto items-center py-16 px-8 md:py-32 md:px-16 bg-background md:items-start">
      <header className="mb-8 w-full">
        <h1 className="text-4xl font-bold">레이팅 리더보드</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          치레동 선수들의 현재 레이팅 순위를 확인하세요.
        </p>
      </header>
      <Tabs defaultValue="table" className="w-full mb-8">
        <div className="w-full flex md:flex-row flex-col justify-end items-end gap-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="최신 / 시점 선택..." />
            </SelectTrigger>
            <SelectContent>
              {[...competitions]
                .reverse()
                .map((competition, competitionIndex) => (
                  <div key={competition.id}>
                    {competitionIndex !== 0 && <SelectSeparator />}
                    <SelectGroup>
                      <SelectLabel>
                        {competition.shortName ?? competition.name}
                      </SelectLabel>
                      {entries
                        .filter(
                          (entry) => entry.competitionId === competition.id,
                        )
                        .reverse()
                        .map((entry, entryIndex) => (
                          <SelectItem key={entry.id} value={entry.id}>
                            {entry.note || entry.id}
                            {competitionIndex === 0 &&
                              entryIndex === 0 &&
                              " (최신)"}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </div>
                ))}
            </SelectContent>
          </Select>
          <TabsList className="inline">
            <TabsTrigger value="table">표로 보기</TabsTrigger>
            <TabsTrigger value="chart">그래프로 보기</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="table">
          <LeaderboardTable ratingData={playersWithCurrentRating} />
        </TabsContent>
        <TabsContent value="chart">
          <LeaderboardChart ratingData={playersWithCurrentRating} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
