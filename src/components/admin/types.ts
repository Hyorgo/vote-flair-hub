export type VoteStatistic = {
  nominee_id: string;
  nominee_name: string;
  category_id: string;
  category_name: string;
  vote_count: number;
};

export type CategoryStats = Record<string, VoteStatistic[]>;