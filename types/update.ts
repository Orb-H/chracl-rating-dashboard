export type Update = {
  /**
   * The date when the update was made, formatted as "YYYY-MM-DD".
   * E.g., "2024-06-01"
   */
  date: string;

  /**
   * The content of the update, which may include information about changes, improvements, or announcements related to the platform or service.
   * May contain markdown formatting for better readability.
   * E.g., "We have improved the matchmaking algorithm to provide better matches for players."
   */
  content: string[];
};
