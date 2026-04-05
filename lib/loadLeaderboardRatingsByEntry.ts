import { Entry } from "@/types/entry";
import { Player } from "@/types/player";
import { Rating } from "@/types/rating";
import { loadEntriesById } from "./loadEntries";
import { loadHistories } from "./loadHistories";
import { loadPlayers } from "./loadPlayers";

export function loadLeaderboardRatingsByEntry(
  entryId: string,
): (Player & Rating)[] {
  const entriesById = loadEntriesById();
  const targetEntry = entriesById[entryId];
  if (!targetEntry) {
    throw new Error(`Entry with id "${entryId}" not found`);
  }

  const players = loadPlayers().filter((player) => !player.isNotPlayer);
  const histories = loadHistories();

  return players
    .flatMap((player) => {
      const playerHistories = (histories[player.id] ?? []).filter((history) =>
        isHistoryIncluded(history.entryId, entriesById, targetEntry),
      );

      return playerHistories.length > 0
        ? [{ ...player, ...playerHistories[playerHistories.length - 1].rating }]
        : [];
    })
    .sort((a, b) => b.value - a.value);
}

function isHistoryIncluded(
  historyEntryId: string,
  entriesById: Record<string, Entry>,
  targetEntry: Entry,
): boolean {
  return (
    historyEntryId !== "initial" &&
    entriesById[historyEntryId] !== undefined &&
    entriesById[historyEntryId].sortKey <= targetEntry.sortKey
  );
}
