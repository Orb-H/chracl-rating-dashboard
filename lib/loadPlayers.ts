import fs from "fs";
import path from "path";
import { Player } from "@/types/player";

let players: Player[] | undefined = undefined;
let playersById: Record<string, Player> | undefined = undefined;

function loadData(): Player[] {
  const dataPath = path.join(process.cwd(), "data", "players.json");

  if (!fs.existsSync(dataPath)) {
    throw new Error(`Players data file not found at path: ${dataPath}`);
  }

  try {
    const jsonData = fs.readFileSync(dataPath, "utf-8");
    const parsed = JSON.parse(jsonData);
    return parsed as Player[];
  } catch (err) {
    const message =
      err instanceof Error
        ? `Failed to load players data from ${dataPath}: ${err.message}`
        : `Failed to load players data from ${dataPath}.`;
    throw new Error(message);
  }
}

export function loadPlayers(): Player[] {
  if (players === undefined) players = loadData();
  return players;
}

export function loadPlayersById(): Record<string, Player> {
  if (playersById === undefined)
    playersById = Object.fromEntries(
      loadPlayers().map((player) => [player.id, player]),
    );
  return playersById;
}

export function loadPlayerById(id: string): Player {
  const player = loadPlayersById()[id];
  if (!player) {
    throw new Error(`Player with id "${id}" not found`);
  }
  return player;
}
