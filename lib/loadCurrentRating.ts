import { Rating } from "@/types/rating";
import { loadHistoriesById } from "./loadHistories";
import { loadPlayers } from "./loadPlayers";

let currentRating: Record<string, Rating> | undefined = undefined;

function loadData(): Record<string, Rating> {
  try {
    const data: Record<string, Rating> = {};
    const players = loadPlayers();

    players.forEach((player) => {
      const histories = loadHistoriesById(player.id);
      if (histories.length > 1) {
        // Ignores players with no history or only one history entry (i.e., no rating changes yet)
        const latestHistory = histories[histories.length - 1];
        data[player.id] = latestHistory.rating;
      }
    });

    return data;
  } catch (err) {
    const message =
      err instanceof Error
        ? `Failed to load current rating data: ${err.message}`
        : `Failed to load current rating data.`;
    throw new Error(message);
  }
}

export function loadCurrentRating(): Record<string, Rating> {
  if (currentRating === undefined) currentRating = loadData();
  return currentRating;
}

export function loadCurrentRatingById(id: string): Rating {
  const rating = loadCurrentRating()[id];
  if (!rating) {
    throw new Error(`Rating with id "${id}" not found`);
  }
  return rating;
}
