import fs from "fs";
import path from "path";
import { Participant } from "@/types/participant";

let participants: Participant[] | undefined = undefined;
let participantsById: Record<string, Participant> | undefined = undefined;

function loadData(): Participant[] {
  const dataPath = path.join(process.cwd(), "data", "participants.json");
  const jsonData = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(jsonData) as Participant[];
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
