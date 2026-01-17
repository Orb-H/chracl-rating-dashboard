import fs from "fs";
import path from "path";
import { Competition } from "@/types/competition";

let competitions: Competition[] | undefined = undefined;
let competitionsById: Record<string, Competition> | undefined = undefined;

function loadData(): Competition[] {
  const dataDir = path.join(process.cwd(), "data", "competitions");

  if (!fs.existsSync(dataDir)) {
    throw new Error(
      `Competitions data directory not found at path: ${dataDir}`,
    );
  }

  let fileNames: string[];
  try {
    fileNames = fs
      .readdirSync(dataDir)
      .filter((file) => file.endsWith(".json"));
  } catch (err) {
    const message =
      err instanceof Error
        ? `Failed to read competitions data directory at ${dataDir}: ${err.message}`
        : `Failed to read competitions data directory at ${dataDir}.`;
    throw new Error(message);
  }

  const competitionsData: Competition[] = [];
  for (const fileName of fileNames) {
    const filePath = path.join(dataDir, fileName);
    try {
      const jsonData = fs.readFileSync(filePath, "utf-8");
      competitionsData.push(JSON.parse(jsonData) as Competition);
    } catch (err) {
      const message =
        err instanceof Error
          ? `Failed to load competitions data from file ${filePath}: ${err.message}`
          : `Failed to load competitions data from file ${filePath}.`;
      throw new Error(message);
    }
  }

  return competitionsData;
}

/**
 * @returns sorted Competition objects, based on `sortOrder` field, in ascending order.
 */
export function loadCompetitions(): Competition[] {
  if (competitions === undefined)
    competitions = loadData().sort((a, b) => a.sortOrder - b.sortOrder);
  return competitions;
}

export function loadCompetitionsById(): Record<string, Competition> {
  if (competitionsById === undefined) {
    const ids = loadCompetitions().map((competition) => competition.id);
    if (ids.length !== new Set(ids).size) {
      throw new Error(`Duplicate competition IDs found in competitions data.`);
    }

    competitionsById = Object.fromEntries(
      loadCompetitions().map((competition) => [competition.id, competition]),
    );
  }
  return competitionsById;
}

export function loadCompetitionById(id: string): Competition {
  const competition = loadCompetitionsById()[id];
  if (!competition) {
    throw new Error(`Competition with id "${id}" not found`);
  }
  return competition;
}
