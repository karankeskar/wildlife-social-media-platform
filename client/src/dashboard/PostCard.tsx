import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Eye, MessageCircle, BookOpen, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { toggleSpot as toggleSpotAPI, checkSpot } from "@/services/authServices";
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

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [spotted, setSpotted] = useState(false);
  const [spotCount, setSpotCount] = useState(post.spot_count || 0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkIfSpotted = async () => {
      try {
        const result = await checkSpot(post._id);
        setSpotted(result.spotted);
      } catch (error) {
        console.error('Error checking spot:', error);
      }
    };
    checkIfSpotted();
  }, [post._id]);

  const handleSpotClick = async () => {
    setLoading(true);
    try {
      const result = await toggleSpotAPI(post._id);
      setSpotted(result.spotted);
      setSpotCount(prev => result.spotted ? prev + 1 : prev - 1);
      toast.success(result.spotted ? 'Spotted!' : 'Spot removed');
    } catch (err: unknown) {
      console.error('Error in handleSpotClick:', err);
      if (err instanceof Error) {
        toast.error(err.message || 'Failed to spot');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!post.userId) {
    return null;
  }

  return (
    <div 
      className="bg-[#0c1109] border border-white/[0.06] rounded-sm overflow-hidden hover:border-[#c9a96e]/20 transition-all duration-300"
      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
    >
      {/* Header - User Info */}
      <div className="flex items-center gap-3 px-6 pt-6 pb-4">
        <Avatar className="h-10 w-10 bg-[#1a1f16] border border-white/10">
          {post.userId?.profile_picture ? (
            <img src={post.userId.profile_picture} alt={post.userId.fullName} />
          ) : (
            <div className="flex items-center justify-center h-full text-[#c9a96e]">
              {post.userId?.fullName?.charAt(0).toUpperCase() || 'U'}
            </div>
          )}
        </Avatar>
        <div className="flex-1">
          <p 
            className="font-normal text-[#ede8df]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {post.userId?.fullName || 'Unknown Naturalist'}
          </p>
          {post.location && (
            <p 
              className="text-xs text-[#7a7670] flex items-center gap-1 italic"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <MapPin className="h-3 w-3" />
              {post.location}, {post.country}
            </p>
          )}
        </div>
      </div>

      {/* Image */}
      <div className="relative group">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full object-cover max-h-[600px] brightness-[0.9] saturate-[0.8] group-hover:brightness-100 group-hover:saturate-100 transition-all duration-500"
        />
      </div>

      {/* Actions */}
      <div className="px-6 pt-4 pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-6">
          {/* Spot Button */}
          <button 
            onClick={handleSpotClick}
            disabled={loading}
            className="flex items-center gap-2 text-[#7a7670] hover:text-[#c9a96e] transition-colors cursor-none group"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            <Eye className={`h-5 w-5 ${spotted ? 'fill-current text-[#c9a96e]' : ''}`} />
            <span className="text-xs tracking-wider">{spotCount} SPOTS</span>
          </button>

          {/* Field Notes Button */}
          <button 
            className="flex items-center gap-2 text-[#7a7670] hover:text-[#c9a96e] transition-colors cursor-none"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-xs tracking-wider">{post.field_notes_count || 0} NOTES</span>
          </button>

          {/* Journal Button */}
          <button 
            className="ml-auto text-[#7a7670] hover:text-[#c9a96e] transition-colors cursor-none"
          >
            <BookOpen className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-4">
        <h3 
          className="font-normal text-xl mb-2 leading-tight"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {post.title}
        </h3>
        
        {post.caption && (
          <p 
            className="text-sm text-[#7a7670] leading-relaxed mb-3 italic"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {post.caption}
          </p>
        )}

        {/* Hashtags */}
        {post.hashtag && post.hashtag.length > 0 && (
          <p 
            className="text-xs text-[#c9a96e] mb-3"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            {post.hashtag.map(tag => `#${tag}`).join('  ')}
          </p>
        )}

        {/* Category & Conservation Status */}
        <div className="flex gap-2 mb-3 flex-wrap">
          <span 
            className="text-[0.65rem] tracking-[0.15em] uppercase px-2.5 py-1 bg-white/[0.04] border border-white/10 text-[#ede8df] rounded-sm"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            {post.category}
          </span>
          
          {post.conservation_status && (
            <span 
              className={`text-[0.65rem] tracking-[0.15em] uppercase px-2.5 py-1 border rounded-sm ${
                post.conservation_status === 'Critically Endangered' || post.conservation_status === 'Endangered'
                  ? 'bg-[rgba(180,60,60,0.15)] text-[#c06060] border-[rgba(180,60,60,0.25)]'
                  : post.conservation_status === 'Vulnerable'
                  ? 'bg-[rgba(180,120,40,0.15)] text-[#c0903a] border-[rgba(180,120,40,0.25)]'
                  : 'bg-[rgba(60,140,80,0.12)] text-[#5aaa72] border-[rgba(60,140,80,0.2)]'
              }`}
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {post.conservation_status === 'Critically Endangered' ? 'CR' :
               post.conservation_status === 'Endangered' ? 'EN' :
               post.conservation_status === 'Vulnerable' ? 'VU' :
               post.conservation_status === 'Near Threatened' ? 'NT' : 'LC'}
            </span>
          )}
        </div>

        {/* Date */}
        <p 
          className="text-[0.65rem] text-[#3e3d3a] tracking-widest"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          {new Date(post.createdAt).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          }).toUpperCase()}
        </p>
      </div>
    </div>
  );
}