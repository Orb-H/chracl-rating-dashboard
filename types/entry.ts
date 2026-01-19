export type Entry = {
  /**
   *  The unique identifier for the entry.
   * E.g., "season1-round1-qual"
   */
  id: string;

  /**
   * The competition ID this entry belongs to.
   * This value is empty only if the entry is the initial state.
   * E.g., "season1"
   */
  competitionId?: string;

  /**
   * The arbitrary number for sorting entries.
   * E.g., 1010100
   */
  sortKey: number;

  /**
   * Additional note about the entry.
   * E.g., "This is the qualifying round for Season 1, Round 1."
   */
  note: string;
};
