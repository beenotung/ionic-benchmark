type Bool = true | undefined;
export type VoteType = 'up' | 'down';
type MyVoteType = VoteType | undefined;
export type VoteViewType = {
  up_vote: number;
  down_vote: number;
  my_vote: MyVoteType;
};
export type Author = {
  user_id: string;
  nickname?: string;
  avatar?: string;
};
export type PostType = {
  post_id: string;
  title: string;
  timestamp: number; // deprecated
  create_time: number;
  last_time?: number;
  comments: number;
  has_my_comment: Bool;
  own: Bool;
  author?: Author;
  tags: string[];
} & VoteViewType;
export type DisplayOrder = 'hot' | 'latest_post' | 'latest_comment';
