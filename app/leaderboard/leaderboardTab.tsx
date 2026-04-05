"use client";

import { useRef, useState } from "react";
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
  initialPlayerRatingsByEntry: Record<string, (Player & Rating)[]>;
};

export function LeaderboardTab({
  competitions,
  entries,
  initialPlayerRatingsByEntry,
}: LeaderboardTabProps) {
  const [selectedEntry, setSelectedEntry] = useState<string>(
    entries.at(-1)!.id,
  );
  const [playerRatingsByEntry, setPlayerRatingsByEntry] = useState<
    Record<string, (Player & Rating)[]>
  >(initialPlayerRatingsByEntry);
  const [loadingEntryId, setLoadingEntryId] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const requestIdRef = useRef(0);

  const selectedEntryRatings = playerRatingsByEntry[selectedEntry] ?? [];
  const isSelectedEntryLoading =
    loadingEntryId === selectedEntry && selectedEntryRatings.length === 0;

  const handleEntryChange = async (entryId: string) => {
    setSelectedEntry(entryId);
    setLoadError(null);

    if (playerRatingsByEntry[entryId]) {
      return;
    }

    const currentRequestId = requestIdRef.current + 1;
    requestIdRef.current = currentRequestId;
    setLoadingEntryId(entryId);

    try {
      const response = await fetch(`/api/leaderboard/entries/${entryId}`, {
        cache: "force-cache",
      });
      if (!response.ok) {
        if (requestIdRef.current === currentRequestId) {
          setLoadError(
            "데이터를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
          );
        }
        return;
      }

      const data = (await response.json()) as { ratings: (Player & Rating)[] };
      if (requestIdRef.current === currentRequestId) {
        setPlayerRatingsByEntry((prev) => ({
          ...prev,
          [entryId]: data.ratings,
        }));
      }
    } finally {
      if (requestIdRef.current === currentRequestId) {
        setLoadingEntryId(null);
      }
    }
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
      {isSelectedEntryLoading && (
        <p className="mb-2 text-sm text-muted-foreground">
          데이터를 불러오는 중...
        </p>
      )}
      {loadError && (
        <p className="mb-2 text-sm text-destructive">{loadError}</p>
      )}
      <TabsContent value="table">
        {isSelectedEntryLoading ? (
          <LeaderboardTableLoading />
        ) : (
          <LeaderboardTable ratingData={selectedEntryRatings} />
        )}
      </TabsContent>
      <TabsContent value="chart">
        {isSelectedEntryLoading ? (
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
    <div className="space-y-3 mt-2">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} className="w-full h-10" />
      ))}
    </div>
  );
}

function LeaderboardChartLoading() {
  return <Skeleton className="w-full min-h-50 aspect-9/16 md:aspect-square" />;
}
