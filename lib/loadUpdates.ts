import fs from "fs";
import path from "path";
import { Update } from "@/types/update";

let updates: Update[] | undefined = undefined;

function loadData(): Update[] {
  const dataPath = path.join(process.cwd(), "data", "updates.json");

  if (!fs.existsSync(dataPath)) {
    throw new Error(`Updates data file not found at path: ${dataPath}`);
  }

  try {
    const jsonData = fs.readFileSync(dataPath, "utf-8");
    const parsed = JSON.parse(jsonData);
    return parsed as Update[];
  } catch (err) {
    const message =
      err instanceof Error
        ? `Failed to load updates data from ${dataPath}: ${err.message}`
        : `Failed to load updates data from ${dataPath}.`;
    throw new Error(message);
  }
}

export function loadUpdates(): Update[] {
  if (updates === undefined) updates = loadData();
  return updates;
}
