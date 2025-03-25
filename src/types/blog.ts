export type BlogType = {
  uuid: string;
  title: string;
  content: string;
  image: string;
  youtube_videos: string[];
  status: "published" | "draft" | "archived"; // Add other possible statuses if needed
  published_at: string; // ISO timestamp
  views: number;
  likes: number;
  created_at: string;
  updated_at: string;
  tags: string[];
  is_bookmarked: boolean;
  is_deleted: number;
  user: {
    uuid: string;
    name: string;
    email: string;
    avatar: string | null;
  };
};
