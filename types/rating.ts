export type Rating = {
  // The mean (μ) of the rating distribution. Initial value is 50.0.
  mu: number;

  // The standard deviation (σ) of the rating distribution. Initial value is 16.667.
  sigma: number;

  // The conservative rating value, typically calculated as μ - 3σ. Initial value is 0.0.
  value: number;
};

export type RatingHistory = {
  // The entry of which this rating history corresponds to. E.g., "season1-round1-qual"
  entryId: string;

  // The rating of the participant right after the entry.
  rating: Rating;
};
