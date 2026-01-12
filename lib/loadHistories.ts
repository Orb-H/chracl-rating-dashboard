import fs from "fs";
import path from "path";
import { RatingHistory } from "@/types/rating";
import { loadPlayers } from "./loadPlayers";

let histories: Record<string, RatingHistory[]> | undefined = undefined;

function loadData(): Record<string, RatingHistory[]> {
  const dataDir = path.join(process.cwd(), "data", "histories");

  if (!fs.existsSync(dataDir)) {
    throw new Error(`Histories data directory not found at path: ${dataDir}`);
  }

  const players = loadPlayers();

  const historiesData: Record<string, RatingHistory[]> = {};
  for (const player of players) {
    const filePath = path.join(dataDir, player.id + ".json");
    try {
      const jsonData = fs.readFileSync(filePath, "utf-8");
      historiesData[player.id] = JSON.parse(jsonData) as RatingHistory[];
    } catch (err) {
      const message =
        err instanceof Error
          ? `Failed to load histories data from file ${filePath}: ${err.message}`
          : `Failed to load histories data from file ${filePath}.`;
      throw new Error(message);
    }
  }

  return historiesData;
}

export function loadHistories(): Record<string, RatingHistory[]> {
  if (histories === undefined) histories = loadData();
  return histories;
}

export function loadHistoryById(id: string): RatingHistory[] {
  const history = loadHistories()[id];
  if (!history) {
    throw new Error(`History for player id "${id}" not found`);
  }
  return history;
}
