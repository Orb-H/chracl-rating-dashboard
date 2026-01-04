export type Rating = {
  // The mean (μ) of the rating distribution. Initial value is 50.0.
  mu: number;

  // The standard deviation (σ) of the rating distribution. Initial value is 16.667.
  sigma: number;

  // The conservative rating value, typically calculated as μ - 3σ. Initial value is 0.0.
  value: number;
};
