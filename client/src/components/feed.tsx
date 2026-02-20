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
  spot_count: number;
  field_notes_count: number;
  conservation_status?: string;
  createdAt: string;
}

export function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    try {
      const response = await getPosts();
      setPosts(response.posts);
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message || "Failed to load posts");
      else toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-4 mt-4">
        {[1, 2].map((i) => (
          <div key={i} className="w-full rounded-xl bg-white border-l-4 border-l-[#e2ddd8] border border-[#e8e4df] overflow-hidden animate-pulse">
            <div className="w-full h-72 bg-[#ede9e4]" />
            <div className="p-5 space-y-3">
              <div className="w-48 h-4 rounded bg-[#e8e4df]" />
              <div className="w-72 h-3 rounded bg-[#ede9e4]" />
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#e8e4df]" />
                  <div className="w-24 h-3 rounded bg-[#ede9e4]" />
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-3 rounded bg-[#ede9e4]" />
                  <div className="w-10 h-3 rounded bg-[#ede9e4]" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p
          className="text-[#0f1a0e] text-2xl font-light mb-2"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          No sightings yet
        </p>
        <p className="text-[#a09d99] text-sm">Be the first to document wildlife</p>
      </div>
    );
  }

  // Group posts by date for date separators
  const groupedPosts: { date: string; posts: Post[] }[] = [];
  posts.forEach((post) => {
    const date = new Date(post.createdAt).toLocaleDateString("en-US", {
      weekday: "long", month: "long", day: "numeric",
    });
    const last = groupedPosts[groupedPosts.length - 1];
    if (last && last.date === date) {
      last.posts.push(post);
    } else {
      groupedPosts.push({ date, posts: [post] });
    }
  });

  return (
    <div className="mt-4 space-y-1">
      {groupedPosts.map(({ date, posts: datePosts }) => (
        <div key={date}>
          {/* Date separator */}
          <div className="flex items-center gap-3 py-4">
            <div className="flex-1 h-px bg-[#ddd8d2]" />
            <span
              className="text-[0.6rem] text-[#b0ab a5] tracking-[0.2em] uppercase text-[#b0a898]"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {date}
            </span>
            <div className="flex-1 h-px bg-[#ddd8d2]" />
          </div>
          <div className="space-y-4">
            {datePosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}