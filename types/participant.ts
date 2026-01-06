export type Participant = {
  // Unique identifier for the participant. A format of [a-zA-Z0-9-]+. E.g., "hyungdok"
  id: string;

  // The display name of the participant. E.g., "형독"
  displayName: string;

  // Optional list of aliases for the participant. E.g., ["형 독"]
  aliases?: string[];

  // Map of seasons to tiers for the participant. E.g., { "season1": "4", "season2": "4", "season3": "6" }
  tiers?: Record<string, Tier>;

  // Optional racing number for the participant. E.g., 42
  racingNumber?: number;

  // Optional avatar image URL for the participant. E.g., "/participants/hyungdok.png"
  avatarUrl?: string;

  // The channel ID of Chzzk associated with the participant. A format of [a-f0-9]{32}. E.g., "aeb5b654cad7a2c0a0e6633a6d6de4aa"
  channelId: string;
};

// Season 1 and 2: 4 tiers
//   "1", "2", "3", "4"
// Season 3: 9 tiers
//   "1", "1+", "2", "3", "3+", "4", "4+", "5", "6"
export enum Tier {
  TIER1 = "1",
  TIER1PLUS = "1+",
  TIER2 = "2",
  TIER3 = "3",
  TIER3PLUS = "3+",
  TIER4 = "4",
  TIER4PLUS = "4+",
  TIER5 = "5",
  TIER6 = "6",
}
