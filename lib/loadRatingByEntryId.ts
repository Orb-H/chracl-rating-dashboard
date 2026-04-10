import { Rating } from "@/types/rating";
import { loadEntries, loadEntriesById } from "./loadEntries";
import { loadHistories } from "./loadHistories";
import { loadPlayers } from "./loadPlayers";

let ratingsByEntryId: Record<string, Record<string, Rating>> | undefined =
  undefined;

function loadRatingsByEntryId(): Record<string, Record<string, Rating>> {
  const entriesById = loadEntriesById();
  const players = loadPlayers().filter((player) => !player.isNotPlayer);
  const histories = loadHistories();

  return Object.fromEntries(
    Object.keys(entriesById).map((entryId) => {
      const targetEntry = entriesById[entryId];
      const ratings = Object.fromEntries(
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
          return [
            [player.id, playerHistories[playerHistories.length - 1].rating],
          ];
        }),
      );
      return [entryId, ratings];
    }),
  );
}

export function loadRatingByEntryId(entryId: string): Record<string, Rating> {
  if (ratingsByEntryId === undefined) {
    ratingsByEntryId = loadRatingsByEntryId();
  }

  const ratings = ratingsByEntryId[entryId];
  if (!ratings) {
    throw new Error(`Entry with id "${entryId}" not found`);
  }
  return ratings;
}

export function loadLatestRatingByPlayerId(): Record<string, Rating> {
  const latestEntry = loadEntries().at(-1);
  if (!latestEntry) {
    return {};
  }
  return loadRatingByEntryId(latestEntry.id);
}
