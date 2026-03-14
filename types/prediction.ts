export type Prediction = {
  /**
   * The reference to the match this prediction is for.
   */
  reference: PredictionReference;

  /**
   * The prediction results for individual players participated in this match.
   */
  individual: Record<string, IndividualPredictionResult>;

  /**
   * The prediction results for teams participated in this match. This field exists only when the match kind is "TEAM".
   */
  team?: Record<string, TeamPredictionResult>;
};

// TODO(#211): Introduce reference for custom setups.
export type PredictionReference = ExistingReference;

export type ExistingReference = {
  /**
   * The id of the competition, where this prediction is for.
   * E.g., `season1`
   */
  competitionId: string;

  /**
   * The id of the match, where this prediction is for.
   * E.g., `season1-round1-qual`
   */
  matchId: string;
};

export type IndividualPredictionResult = {
  /**
   * The probability of the player achieving each rank, in percentage.
   * E.g., [50, 30, 20] means 50% chance for 1st place, 30% chance for 2nd place, and 20% chance for 3rd place.
   */
  prob: number[];

  /**
   * The expected rank of the player, calculated as the weighted average of ranks using the probabilities.
   * E.g., 1.7 means the expected rank is between 1st and 2nd place, closer to 2nd place.
   */
  rank: number;

  /**
   * The expected points the player would earn from the match, calculated as the weighted average of points using the probabilities.
   * This value exists only if the points scheme for the match is defined.
   * E.g., 8.5
   */
  point?: number;
};

export type TeamPredictionResult = {
  /**
   * The probability of the team achieving each rank, in percentage.
   * E.g., [60, 25, 15] means 60% chance for 1st place, 25% chance for 2nd place, and 15% chance for 3rd place.
   */
  prob: number[];
};
