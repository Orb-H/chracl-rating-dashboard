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
  playerRatingsByEntry: Record<string, (Player & Rating)[]>;
};

export function LeaderboardTab({
  competitions,
  entries,
  playerRatingsByEntry,
}: LeaderboardTabProps) {
  const [selectedEntry, setSelectedEntry] = useState<string>(
    entries.at(-1)!.id,
  );

  return (
    <Tabs defaultValue="table" className="w-full mb-8">
      <div className="w-full flex md:flex-row flex-col justify-end items-end gap-4">
        <Select
          value={selectedEntry}
          onValueChange={(value) => setSelectedEntry(value)}
        >
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
        <TabsList className="inline">
          <TabsTrigger value="table">표로 보기</TabsTrigger>
          <TabsTrigger value="chart">그래프로 보기</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="table">
        <LeaderboardTable ratingData={playerRatingsByEntry[selectedEntry]} />
      </TabsContent>
      <TabsContent value="chart">
        <LeaderboardChart ratingData={playerRatingsByEntry[selectedEntry]} />
      </TabsContent>
    </Tabs>
  );
}
