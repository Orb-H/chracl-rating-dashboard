"use client";

import { useState } from "react";
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
  const [isLoading, setIsLoading] = useState(false);

  const selectedEntryRatings = playerRatingsByEntry[selectedEntry] ?? [];

  const handleEntryChange = async (entryId: string) => {
    setSelectedEntry(entryId);

    if (playerRatingsByEntry[entryId]) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/leaderboard/entries/${entryId}`);
      if (!response.ok) {
        return;
      }

      const data = (await response.json()) as { ratings: (Player & Rating)[] };
      setPlayerRatingsByEntry((prev) => ({
        ...prev,
        [entryId]: data.ratings,
      }));
    } finally {
      setIsLoading(false);
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
      {isLoading && (
        <p className="mb-2 text-sm text-muted-foreground">
          데이터를 불러오는 중...
        </p>
      )}
      <TabsContent value="table">
        <LeaderboardTable ratingData={selectedEntryRatings} />
      </TabsContent>
      <TabsContent value="chart">
        <LeaderboardChart ratingData={selectedEntryRatings} />
      </TabsContent>
    </Tabs>
  );
}
