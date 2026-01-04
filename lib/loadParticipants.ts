import fs from "fs";
import path from "path";
import { Participant } from "@/types/participant";

let participants: Participant[] | undefined = undefined;
let participantsById: Record<string, Participant> | undefined = undefined;

function loadData(): Participant[] {
  const dataPath = path.join(process.cwd(), "data", "participants.json");

  if (!fs.existsSync(dataPath)) {
    throw new Error(`Participants data file not found at path: ${dataPath}`);
  }

  try {
    const jsonData = fs.readFileSync(dataPath, "utf-8");
    const parsed = JSON.parse(jsonData);
    return parsed as Participant[];
  } catch (err) {
    const message =
      err instanceof Error
        ? `Failed to load participants data from ${dataPath}: ${err.message}`
        : `Failed to load participants data from ${dataPath}.`;
    throw new Error(message);
  }
}

export function loadParticipants(): Participant[] {
  if (participants === undefined) participants = loadData();
  return participants;
}

export function loadParticipantsById(): Record<string, Participant> {
  if (participantsById === undefined)
    participantsById = Object.fromEntries(
      loadParticipants().map((participant) => [participant.id, participant]),
    );
  return participantsById;
}

export function loadParticipantById(id: string): Participant {
  return loadParticipantsById()[id];
}
