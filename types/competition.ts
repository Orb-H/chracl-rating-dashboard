export type Competition = {
  /**
   * The unique identifier for the competition.
   * E.g., "season1"
   */
  id: string;

  /**
   * The display name of the competition.
   * E.g., "제 1회 치지직 레이싱 동아리: 고속도로 배틀"
   */
  name: string;

  /**
   * The short name of the competition.
   * E.g., "제 1회: 고속도로 배틀"
   */
  shortName?: string;

  /**
   * The sort order of the competition. Lower numbers mean older competitions.
   * E.g., 1
   */
  sortOrder: number;

  /**
   * The IDs of the participants in the competition. E.g., ["hyungdok", "alice", "bob"]
   */
  participants: string[];

  /**
   * The list of teams participating in the competition.
   */
  teams: Team[];

  /**
   * The list of match identifiers in the competition. Should be in order of occurrence.
   * E.g., ["race1", "race2", "race3"]
   */
  matches: string[];

  /**
   * The scoring scheme for the competition. E.g., { "race1": [10, 8, 6, 5, 4, 3, 2, 1], "race2": [15, 12, 10, 8, 6, 4, 2, 1] }
   */
  pointsSchemes: Record<string, number[]>;
};

export type Team = {
  /**
   * The unique identifier for the team.
   * E.g., "season1-team-a"
   */
  id: string;

  /**
   * The display name of the team.
   * E.g., "Team A"
   */
  name: string;

  /**
   * The list of team member names.
   * E.g., ["Alice", "Bob", "Charlie"]
   */
  members: string[];

  /**
   * The color information of the team, which can be used for UI purposes.
   */
  style?: TeamStyle;
};

export type TeamStyle = {
  /**
   * The badge style for the team, which can be a Tailwind CSS class.
   * E.g., "bg-blue-500"
   */
  badge: string;
};
