export type Match = {
  /**
   * The unique identifier for the match.
   * E.g., `round1-qual`
   */
  id: string;

  /**
   * The competition identifier the match belongs to.
   * E.g., `season1`
   */
  competitionId: string;

  /**
   * The entry identifier associated with the match.
   * It indicates the single unit of which the rating changes are calculated.
   * E.g., `season1-round1-qual`
   */
  entryId: string;

  /**
   * The display name of the match.
   * E.g., `라운드 1 퀄리파잉`
   */
  name: string;

  /**
   * The date when the match took place, in YYYY-MM-DD format.
   * E.g., `2025-04-27`
   */
  date: string;

  /**
   * The type of the match.
   */
  type: "QUALIFYING" | "MAIN";

  /**
   * The track name where the match was held.
   * E.g., `그랜드 밸리 하이웨이`
   */
  trackName: string;

  /**
   * The identifier of the points scheme used for this match.
   * E.g., `standard`
   */
  pointsSchemeId?: string;

  /**
   * The list of participants participated in this match.
   */
  participants: Participant[];
};

export type Participant = {
  /**
   * The unique identifier for the participant.
   * E.g., `namgung-hyuk`
   */
  id: string;

  /**
   * The team identifier the participant belongs to.
   * E.g., `season1-team-namgung-hyuk`
   */
  teamId?: string;

  /**
   * The place the participant achieved in the match.
   * E.g., 1
   */
  place: number;

  /**
   * The place value which is used for rating calculation.
   * It is equivalent to the total place in a single entry with multiple matches.
   * If undefined, it means the entry contains only this match, and thus it is okay to use `place` instead.
   * E.g., 1
   */
  ratedPlace?: number;

  /**
   * The record of the participant in the match.
   */
  record: MatchRecord;
};

export type MatchRecord = {
  /**
   * The status of the participant in the match.
   * E.g., `FINISHED`
   */
  status: "FINISHED" | "DNF";

  /**
   * The lap time of the participant recorded in qualification stage, in [HH:M]M:SS.mmm format.
   * E.g., `00:02:15.345`
   */
  lapTime?: string;

  /**
   * The finish time of the participant recorded in main stage, in [HH:M]M:SS.mmm format.
   * E.g., `00:15:30.123`
   */
  finishTime?: string;

  /**
   * The total penalty time added to the participant's finish time, in [HH:M]M:SS.mmm format.
   * E.g., `00:00:05.000`
   */
  penaltyTime?: string;
};
