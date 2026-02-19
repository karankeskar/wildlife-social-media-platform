import { useEffect, useState } from "react";
import { getPosts } from "@/services/authServices";
import { PostCard } from "./post-card";
import { toast } from "sonner";

interface Post {
  _id: string;
  userId: {
    _id: string;
    fullName: string;
    profile_picture?: string;
  };
  title: string;
  caption?: string;
  image: string;
  location?: string;
  country: string;
  category: string;
  hashtag?: string[];
  like_count: number;
  comment_count: number;
  conservation_status?: string;
  createdAt: string;
}

export function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await getPosts();
      setPosts(response.posts);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || "Failed to load posts");
      } else {
        toast.error("Failed to load posts");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <p>Loading posts...</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex justify-center items-center py-8">
        <p className="text-gray-500">No posts yet. Be the first to share!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
