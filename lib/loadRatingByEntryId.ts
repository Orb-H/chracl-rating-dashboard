import { Rating } from "@/types/rating";
import { loadEntries, loadEntriesById } from "./loadEntries";
import { loadHistories } from "./loadHistories";
import { loadPlayers } from "./loadPlayers";

const ratingsByEntryId: Record<string, Record<string, Rating>> = {};

function loadRatingForEntryId(entryId: string): Record<string, Rating> {
  const entriesById = loadEntriesById();
  const targetEntry = entriesById[entryId];
  if (!targetEntry) {
    throw new Error(`Entry with id "${entryId}" not found`);
  }

  const players = loadPlayers().filter((player) => !player.isNotPlayer);
  const histories = loadHistories();

  return Object.fromEntries(
    players.flatMap((player) => {
      const playerHistories = (histories[player.id] ?? []).filter(
        (history) =>
          history.entryId !== "initial" &&
          entriesById[history.entryId] !== undefined &&
          entriesById[history.entryId].sortKey <= targetEntry.sortKey,
      );
      if (playerHistories.length === 0) {
        return [];
      }
      return [[player.id, playerHistories[playerHistories.length - 1].rating]];
    }),
  );
}

export function loadRatingByEntryId(entryId: string): Record<string, Rating> {
  if (ratingsByEntryId[entryId] === undefined) {
    ratingsByEntryId[entryId] = loadRatingForEntryId(entryId);
  }

  return ratingsByEntryId[entryId];
}

export function loadLatestRatingByPlayerId(): Record<string, Rating> {
  const latestEntry = loadEntries().at(-1);
  if (!latestEntry) {
    return {};
  }
  return loadRatingByEntryId(latestEntry.id);
}
