"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Competition } from "@/types/competition";
import { Entry } from "@/types/entry";
import { Player } from "@/types/player";
import { Rating } from "@/types/rating";
import { LeaderboardChart } from "./leaderboardChart";
import { LeaderboardTable } from "./leaderboardTable";

export type LeaderboardTabProps = {
  competitions: Competition[];
  entries: Entry[];
  selectedEntryId: string;
  selectedEntryRatings: (Player & Rating)[];
};

export function LeaderboardTab({
  competitions,
  entries,
  selectedEntryId,
  selectedEntryRatings,
}: LeaderboardTabProps) {
  const router = useRouter();
  const [selectedEntry, setSelectedEntry] = useState(selectedEntryId);
  const [isPending, startTransition] = useTransition();

  const handleEntryChange = (entryId: string) => {
    if (entryId === selectedEntry) {
      return;
    }

    setSelectedEntry(entryId);
    startTransition(() => {
      router.push(`/leaderboard/${entryId}`);
    });
  };

  return (
    <Tabs defaultValue="table" className="w-full mb-8">
      <div className="w-full flex md:flex-row flex-col justify-end items-end gap-4">
        <Select value={selectedEntry} onValueChange={handleEntryChange}>
          <SelectTrigger>
            <SelectValue placeholder="시점 선택..." />
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
                      .filter((entry) => entry.competitionId === competition.id)
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
        <TabsList>
          <TabsTrigger value="table">표로 보기</TabsTrigger>
          <TabsTrigger value="chart">그래프로 보기</TabsTrigger>
        </TabsList>
      </div>
      {isPending && (
        <p className="mb-2 text-sm text-muted-foreground">
          데이터를 불러오는 중...
        </p>
      )}
      <TabsContent value="table">
        {isPending ? (
          <LeaderboardTableLoading />
        ) : (
          <LeaderboardTable ratingData={selectedEntryRatings} />
        )}
      </TabsContent>
      <TabsContent value="chart">
        {isPending ? (
          <LeaderboardChartLoading />
        ) : (
          <LeaderboardChart ratingData={selectedEntryRatings} />
        )}
      </TabsContent>
    </Tabs>
  );
}

function LeaderboardTableLoading() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">순위</TableHead>
          <TableHead className="pl-12">선수</TableHead>
          <TableHead className="text-center">티어</TableHead>
          <TableHead className="text-center">레이팅</TableHead>
          <TableHead className="text-center">μ값</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 8 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell className="text-center">
              <Skeleton className="h-4 w-6 mx-auto" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-8 w-full" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-4 w-8 mx-auto" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-4 w-16 mx-auto" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-4 w-16 mx-auto" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableCaption>현재 기준 레이팅 순위</TableCaption>
    </Table>
  );
}

function LeaderboardChartLoading() {
  return <Skeleton className="w-full min-h-50 aspect-9/16 md:aspect-square" />;
}
