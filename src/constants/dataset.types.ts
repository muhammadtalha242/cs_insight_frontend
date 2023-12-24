export const PAPERS = 'papers' as const,
  AUTHORS = 'authors' as const,
  VENUES = 'venues' as const;

export type Papers = typeof PAPERS;
export type Authors = typeof AUTHORS;
export type venues = typeof VENUES;

export const DATASET: Array<Papers | Authors | venues> = [
  PAPERS,
  AUTHORS,
  VENUES
];

export type Dataset = (typeof DATASET)[number];
