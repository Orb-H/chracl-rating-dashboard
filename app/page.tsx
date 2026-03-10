import { HeartIcon, TrafficConeIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { loadCompetitions } from "@/lib/loadCompetitions";
import { CompetitionCard } from "./competitionCard";
import { LeaderboardCard } from "./leaderboardCard";

export default function Home() {
  const recentCompetitions = [...loadCompetitions()]
    .sort((a, b) => b.sortOrder - a.sortOrder)
    .slice(0, 3);

  return (
    <main className="flex flex-col min-h-screen w-full max-w-3xl mx-auto items-center justify-between py-16 px-8 md:py-32 md:px-16 bg-background md:items-start">
      <header className="mb-8 w-full">
        <h1 className="text-4xl font-bold">치레동 레이팅 대시보드 β</h1>
        <blockquote className="p-4 my-4 border-s-4 bg-muted font-semibold">
          🚨 아직 개발중인 사이트이므로 많은 기능이 작동하지 않을 수 있습니다.
        </blockquote>
        <p className="mt-2 text-lg text-muted-foreground">
          치레동 레이팅 대시보드에 오신 것을 환영합니다! 아래 카드나 좌측의
          사이드바를 통해 레이팅과 대회 관련 정보를 확인해보세요.
        </p>
      </header>
      <div className="grid w-full gap-8 grid-cols-1 md:grid-cols-2">
        <LeaderboardCard />
        <CompetitionCard competitions={recentCompetitions} />
        <Card>
          <CardHeader className="text-2xl font-bold">
            어느 팀이 이길까
          </CardHeader>
          {/* TODO(#70): Add relevant information when prediction page is ready */}
          <CardContent>준비중입니다.</CardContent>
        </Card>
        <Card>
          <CardHeader className="text-2xl font-bold">레이팅 소개</CardHeader>
          <CardContent>
            <div className="border rounded-lg p-2">
              <TrafficConeIcon className="w-4 h-4 inline" />{" "}
              <HeartIcon className="w-4 h-4 inline" />{" "}
              <span className="text-cyan-500 font-semibold">OrbitHv</span>: 티어
              지수랑 랭킹 지수는 뭔지 아는데 그래서 레이팅이 대체 뭐임?
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="ml-auto">
              <Link href="/rating-intro">레이팅 소개 페이지 보러가기 →</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
