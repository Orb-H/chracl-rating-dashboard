import fs from "fs";
import path from "path";
import { Match } from "@/types/match";

let matches: Match[] | undefined = undefined;
let matchesById: Record<string, Match> | undefined = undefined;

function loadData(): Match[] {
  const dataDir = path.join(process.cwd(), "data", "matches");

  if (!fs.existsSync(dataDir)) {
    throw new Error(`Matches data directory not found at path: ${dataDir}`);
  }

  const fileNames: string[] = [];
  try {
    const dirNames = fs
      .readdirSync(dataDir)
      .filter((file) => fs.lstatSync(path.join(dataDir, file)).isDirectory());
    dirNames.forEach((dirName) => {
      const dirPath = path.join(dataDir, dirName);
      fileNames.push(
        ...fs
          .readdirSync(dirPath)
          .filter((file) => file.endsWith(".json"))
          .map((file) => path.join(dirName, file)),
      );
    });
  } catch (err) {
    const message =
      err instanceof Error
        ? `Failed to read matches data directory at ${dataDir}: ${err.message}`
        : `Failed to read matches data directory at ${dataDir}.`;
    throw new Error(message);
  }

  const matchData: Match[] = [];
  for (const fileName of fileNames) {
    const filePath = path.join(dataDir, fileName);
    try {
      const jsonData = fs.readFileSync(filePath, "utf-8");
      matchData.push(JSON.parse(jsonData) as Match);
    } catch (err) {
      const message =
        err instanceof Error
          ? `Failed to load matches data from file ${filePath}: ${err.message}`
          : `Failed to load matches data from file ${filePath}.`;
      throw new Error(message);
    }
  }

  return matchData;
}

export function loadMatches(): Match[] {
  if (matches === undefined) matches = loadData();
  return matches;
}

export function loadMatchesById(): Record<string, Match> {
  if (matchesById === undefined) {
    const ids = loadMatches().map((match) => match.id);
    if (ids.length !== new Set(ids).size) {
      throw new Error(`Duplicate match IDs found in matches data.`);
    }

    matchesById = Object.fromEntries(
      loadMatches().map((match) => [match.id, match]),
    );
  }
  return matchesById;
}

export function loadMatchById(id: string): Match {
  const match = loadMatchesById()[id];
  if (!match) {
    throw new Error(`Match with id "${id}" not found`);
  }
  return match;
}

export function loadMatchByCompetitionId(competitionId: string): Match[] {
  if (matches === undefined) matches = loadData();
  return matches.filter((match) => match.competitionId === competitionId);
}
