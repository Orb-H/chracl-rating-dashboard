import fs from "fs";
import path from "path";
import { Rating } from "@/types/rating";

let currentRating: Record<string, Rating> | undefined = undefined;

function loadData(): Record<string, Rating> {
  const dataPath = path.join(process.cwd(), "data", "currentRating.json");

  if (!fs.existsSync(dataPath)) {
    throw new Error(`Current rating data file not found at path: ${dataPath}`);
  }

  try {
    const jsonData = fs.readFileSync(dataPath, "utf-8");
    const parsed = JSON.parse(jsonData);
    return parsed as Record<string, Rating>;
  } catch (err) {
    const message =
      err instanceof Error
        ? `Failed to load participants data from ${dataPath}: ${err.message}`
        : `Failed to load participants data from ${dataPath}.`;
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
