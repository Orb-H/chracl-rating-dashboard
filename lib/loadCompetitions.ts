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

  try {
    const fileNames = fs
      .readdirSync(dataDir)
      .filter((file) => file.endsWith(".json"));
    const competitionsData: Competition[] = fileNames.map((fileName) => {
      const filePath = path.join(dataDir, fileName);
      const jsonData = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(jsonData) as Competition;
    });
    return competitionsData;
  } catch (err) {
    const message =
      err instanceof Error
        ? `Failed to load competitions data from ${dataDir}: ${err.message}`
        : `Failed to load competitions data from ${dataDir}.`;
    throw new Error(message);
  }
}

export function loadCompetitions(): Competition[] {
  if (competitions === undefined) competitions = loadData();
  return competitions;
}

export function loadCompetitionsById(): Record<string, Competition> {
  if (competitionsById === undefined)
    competitionsById = Object.fromEntries(
      loadCompetitions().map((competition) => [competition.id, competition]),
    );
  return competitionsById;
}

export function loadCompetitionById(id: string): Competition {
  const competition = loadCompetitionsById()[id];
  if (!competition) {
    throw new Error(`Competition with id "${id}" not found`);
  }
  return competition;
}
