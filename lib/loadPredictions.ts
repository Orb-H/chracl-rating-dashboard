import fs from "fs";
import path from "path";
import { Prediction } from "@/types/prediction";

let predictions: Prediction[] | undefined = undefined;
let predictionsByMatchId: Record<string, Prediction> | undefined = undefined;

function loadData(): Prediction[] {
  const dataDir = path.join(process.cwd(), "data", "predictions");

  if (!fs.existsSync(dataDir)) {
    throw new Error(`Predictions data directory not found at path: ${dataDir}`);
  }

  let fileNames: string[];
  try {
    fileNames = fs
      .readdirSync(dataDir)
      .filter((file) => file.endsWith(".json"));
  } catch (err) {
    const message =
      err instanceof Error
        ? `Failed to read predictions data directory at ${dataDir}: ${err.message}`
        : `Failed to read predictions data directory at ${dataDir}.`;
    throw new Error(message);
  }

  const predictionsData: Prediction[] = [];
  for (const fileName of fileNames) {
    const filePath = path.join(dataDir, fileName);
    try {
      const jsonData = fs.readFileSync(filePath, "utf-8");
      predictionsData.push(JSON.parse(jsonData) as Prediction);
    } catch (err) {
      const message =
        err instanceof Error
          ? `Failed to load predictions data from file ${filePath}: ${err.message}`
          : `Failed to load predictions data from file ${filePath}.`;
      throw new Error(message);
    }
  }

  return predictionsData;
}

export function loadPredictions(): Prediction[] {
  if (predictions === undefined) predictions = loadData();
  return predictions;
}

export function loadPredictionsById(): Record<string, Prediction> {
  if (predictionsByMatchId === undefined) {
    const ids = loadPredictions().map((prediction) => prediction.matchId);
    if (ids.length !== new Set(ids).size) {
      throw new Error(`Duplicate match IDs found in predictions data.`);
    }

    predictionsByMatchId = Object.fromEntries(
      loadPredictions().map((prediction) => [prediction.matchId, prediction]),
    );
  }
  return predictionsByMatchId;
}

export function loadPredictionByMatchId(matchId: string): Prediction {
  const prediction = loadPredictionsById()[matchId];
  if (!prediction) {
    throw new Error(`Prediction not found for match ID: ${matchId}`);
  }
  return prediction;
}
