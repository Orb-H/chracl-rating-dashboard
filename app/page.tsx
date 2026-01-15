import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LeaderboardCard } from "./leaderboardCard";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full max-w-3xl mx-auto items-center justify-between py-16 px-8 md:py-32 md:px-16 bg-background md:items-start">
      <div className="grid w-full gap-8 grid-cols-1 md:grid-cols-2">
        <LeaderboardCard />
        <Card>
          <CardHeader className="text-2xl font-bold">최근 대회 목록</CardHeader>
          {/* TODO(#70): Add relevant information when competitions page is ready */}
          <CardContent>준비중입니다.</CardContent>
        </Card>
        <Card>
          <CardHeader className="text-2xl font-bold">
            어느 팀이 이길까
          </CardHeader>
          {/* TODO(#70): Add relevant information when prediction page is ready */}
          <CardContent>준비중입니다.</CardContent>
        </Card>
        <Card>
          <CardHeader className="text-2xl font-bold">레이팅 소개</CardHeader>
          {/* TODO(#70): Add relevant information when rating introduction page is ready */}
          <CardContent>준비중입니다.</CardContent>
        </Card>
      </div>
    </main>
  );
}
