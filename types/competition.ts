export type Competition = {
  // The unique identifier for the competition. E.g., "season1"
  id: string;

  // The display name of the competition. E.g., "제 1회 치지직 레이싱 동아리: 고속도로 배틀"
  name: string;

  // The sort order of the competition. Lower numbers mean older competitions. E.g., 1
  sortOrder: number;

  // The list of teams participating in the competition.
  teams: Team[];

  // The scoring scheme for the competition. E.g., { "race1": [10, 8, 6, 5, 4, 3, 2, 1], "race2": [15, 12, 10, 8, 6, 4, 2, 1] }
  pointsSchemes: Record<string, number[]>;
};

export type Team = {
  // The unique identifier for the team. E.g., "team-a"
  id: string;

  // The display name of the team. E.g., "Team A"
  name: string;

  // The list of team member names. E.g., ["Alice", "Bob", "Charlie"]
  members: string[];
};
