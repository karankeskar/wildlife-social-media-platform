import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Bookmark, MapPin } from "lucide-react";

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

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  if (!post.userId) {
    return null;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center gap-3 pb-3">
        <Avatar className="h-10 w-10 bg-gray-300">
          {post.userId?.profile_picture ? (
            <img src={post.userId.profile_picture} alt={post.userId.fullName} />
          ) : (
            <div className="flex items-center justify-center h-full">
              {post.userId?.fullName?.charAt(0).toUpperCase() || 'U'}
            </div>
          )}
        </Avatar>
        <div className="flex-1">
          <p className="font-semibold">{post.userId?.fullName || 'Unknown User'}</p>
          {post.location && (
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {post.location}, {post.country}
            </p>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full object-cover max-h-[600px]"
        />
      </CardContent>

      <CardFooter className="flex flex-col gap-3 pt-3">
        <div className="flex items-center gap-4 w-full">
          <Button variant="ghost" size="sm" className="gap-2">
            <Heart className="h-5 w-5" />
            {post.like_count || 0}
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <MessageCircle className="h-5 w-5" />
            {post.comment_count || 0}
          </Button>
          <Button variant="ghost" size="sm" className="ml-auto">
            <Bookmark className="h-5 w-5" />
          </Button>
        </div>

        <div className="w-full text-left">
          <p className="font-semibold">{post.title}</p>
          {post.caption && <p className="text-sm mt-1">{post.caption}</p>}
          
          {post.hashtag && post.hashtag.length > 0 && (
            <p className="text-sm text-blue-600 mt-2">
              {post.hashtag.map(tag => `#${tag}`).join(' ')}
            </p>
          )}

          <div className="flex gap-2 mt-2">
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              {post.category}
            </span>
            {post.conservation_status && (
              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                {post.conservation_status}
              </span>
            )}
          </div>

          <p className="text-xs text-gray-500 mt-2">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}