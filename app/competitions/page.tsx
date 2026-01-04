import { ConstructionIcon } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function Leaderboard() {
  return (
    <main className="min-h-screen w-full max-w-3xl items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
      <Empty>
        <EmptyHeader>
          <EmptyMedia>
            <ConstructionIcon />
          </EmptyMedia>
          <EmptyTitle>준비중입니다.</EmptyTitle>
          <EmptyDescription>
            현재 레이아웃 작업 및 데이터 확보 작업을 진행중입니다.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </main>
  );
}
