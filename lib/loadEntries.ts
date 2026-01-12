import fs from "fs";
import path from "path";
import { Entry } from "@/types/entry";

let entries: Entry[] | undefined = undefined;
let entriesById: Record<string, Entry> | undefined = undefined;

function loadData(): Entry[] {
  const dataPath = path.join(process.cwd(), "data", "entries.json");

  if (!fs.existsSync(dataPath)) {
    throw new Error(`Entries data file not found at path: ${dataPath}`);
  }

  try {
    const jsonData = fs.readFileSync(dataPath, "utf-8");
    const parsed = JSON.parse(jsonData);
    return (parsed as Entry[]).sort((a, b) => a.sortKey - b.sortKey);
  } catch (err) {
    const message =
      err instanceof Error
        ? `Failed to read entries data from ${dataPath}: ${err.message}`
        : `Failed to read entries data from ${dataPath}.`;
    throw new Error(message);
  }
}

export function loadEntries(): Entry[] {
  if (entries === undefined) entries = loadData();
  return entries;
}

export function loadEntriesById(): Record<string, Entry> {
  if (entriesById === undefined) {
    const entries = loadEntries();
    const ids = entries.map((entry) => entry.id);
    if (ids.length !== new Set(ids).size) {
      throw new Error(`Duplicate entry IDs found in entries data.`);
    }
    entriesById = Object.fromEntries(entries.map((entry) => [entry.id, entry]));
  }
  return entriesById;
}
