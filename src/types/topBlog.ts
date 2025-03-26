export type TopBlogType = {
  uuid: string;
  title: string;
  content: string;
  image: string;
  views: number;
  likes: number;
  author: {
    uuid: string;
    name: string;
    avatar: string | null;
  };
  tags: [];
  published_at: string;
  is_awarded: boolean;
  award_type: string;
  award_rank: string;
};
