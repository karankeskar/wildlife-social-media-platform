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

// Left border accent color by conservation urgency
function getStatusAccent(status?: string): string {
  const map: Record<string, string> = {
    "Least Concern":          "#4ade80",
    "Near Threatened":        "#2dd4bf",
    "Vulnerable":             "#facc15",
    "Endangered":             "#fb923c",
    "Critically Endangered":  "#f87171",
    "Extinct in Wild":        "#c084fc",
    "Extinct":                "#94a3b8",
  };
  return status ? (map[status] ?? "#e2ddd8") : "#e2ddd8";
}

// Small badge on image
function getStatusBadgeStyle(status: string): string {
  const map: Record<string, string> = {
    "Least Concern":          "bg-green-900/70 text-green-300",
    "Near Threatened":        "bg-teal-900/70 text-teal-300",
    "Vulnerable":             "bg-yellow-900/70 text-yellow-300",
    "Endangered":             "bg-orange-900/70 text-orange-300",
    "Critically Endangered":  "bg-red-900/70 text-red-300",
    "Extinct in Wild":        "bg-purple-900/70 text-purple-300",
    "Extinct":                "bg-zinc-900/70 text-zinc-300",
  };
  return map[status] ?? "bg-black/50 text-white/70";
}

function timeAgo(dateString: string): string {
  const diff = Date.now() - new Date(dateString).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  return `${days}d`;
}

export function PostCard({ post }: { post: Post }) {
  const [spotted, setSpotted] = useState(false);
  const [spotCount, setSpotCount] = useState(post.spot_count || 0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const check = async () => {
      try {
        const result = await checkSpot(post._id);
        setSpotted(result.spotted);
      } catch {}
    };
    check();
  }, [post._id]);

  const handleSpotClick = async () => {
    setLoading(true);
    try {
      const result = await toggleSpotAPI(post._id);
      setSpotted(result.spotted);
      setSpotCount((prev) => (result.spotted ? prev + 1 : prev - 1));
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message || "Failed to spot");
    } finally {
      setLoading(false);
    }
  };

  if (!post.userId) return null;

  const initials = post.userId.fullName?.charAt(0).toUpperCase() || "U";

  return (
    <article
      className="w-full bg-white rounded-xl overflow-hidden shadow-sm border border-[#e8e4df]"
      style={{
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* ── Image block ── */}
      <div className="relative">
        <img
          src={post.image}
          alt={post.title}
          className="w-full object-cover max-h-[520px]"
        />

        {/* Category stamp — top left */}
        <div className="absolute top-3 left-3">
          <span
            className="text-[0.58rem] tracking-[0.18em] uppercase bg-black/50 text-white/90 backdrop-blur-sm px-2 py-0.5 rounded"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            {post.category}
          </span>
        </div>

        {/* Time — top right */}
        <div className="absolute top-3 right-3">
          <span
            className="text-[0.58rem] tracking-[0.1em] text-white/60 bg-black/30 backdrop-blur-sm px-1.5 py-0.5 rounded"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            {timeAgo(post.createdAt)}
          </span>
        </div>

        {/* Conservation status — bottom left on image */}
        {post.conservation_status && (
          <div className="absolute bottom-3 left-3">
            <span
              className={`text-[0.58rem] tracking-[0.12em] uppercase px-2 py-0.5 rounded backdrop-blur-sm font-medium ${getStatusBadgeStyle(post.conservation_status)}`}
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {post.conservation_status}
            </span>
          </div>
        )}
      </div>

      {/* ── Text block ── */}
      <div className="px-5 pt-4 pb-3">
        {/* Title — serif, editorial */}
        <h2
          className="text-[#0f1a0e] leading-snug mb-1.5"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "1.2rem",
            fontWeight: 600,
          }}
        >
          {post.title}
        </h2>

        {/* Location */}
        {(post.location || post.country) && (
          <p className="flex items-center gap-1 text-[#a09d99] text-xs mb-2">
            <MapPin className="w-3 h-3 shrink-0" />
            {[post.location, post.country].filter(Boolean).join(", ")}
          </p>
        )}

        {/* Caption */}
        {post.caption && (
          <p className="text-[#6b6864] text-sm leading-relaxed mb-2">
            {post.caption}
          </p>
        )}

        {/* Hashtags */}
        {post.hashtag && post.hashtag.length > 0 && (
          <p className="text-[#2d6a4f] text-xs mb-3">
            {post.hashtag.map((t) => `#${t}`).join("  ")}
          </p>
        )}
      </div>

      {/* ── Bottom bar: user + actions in one row ── */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-[#f0ece8]">
        {/* User */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#e8f5ee] border border-[#c8e6d4] flex items-center justify-center text-[#2d6a4f] text-[0.65rem] font-semibold overflow-hidden shrink-0">
            {post.userId.profile_picture ? (
              <img
                src={post.userId.profile_picture}
                alt={post.userId.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              initials
            )}
          </div>
          <span className="text-[#6b6864] text-xs font-medium">
            {post.userId.fullName}
          </span>
        </div>

        {/* Actions — compact, right side */}
        <div className="flex items-center gap-3">
          {/* Spot */}
          <button
            onClick={handleSpotClick}
            disabled={loading}
            className={`flex items-center gap-1 transition-colors disabled:opacity-50 ${
              spotted ? "text-[#2d6a4f]" : "text-[#c4bfbb] hover:text-[#6b6864]"
            }`}
          >
            <Eye
              style={{ width: "0.95rem", height: "0.95rem" }}
              className={spotted ? "fill-[#2d6a4f]" : ""}
            />
            <span
              className="text-[0.7rem] font-medium"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {spotCount}
            </span>
          </button>

          {/* Field Notes */}
          <button className="flex items-center gap-1 text-[#c4bfbb] hover:text-[#6b6864] transition-colors">
            <MessageCircle style={{ width: "0.95rem", height: "0.95rem" }} />
            <span
              className="text-[0.7rem] font-medium"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {post.field_notes_count || 0}
            </span>
          </button>

          {/* Divider */}
          <div className="w-px h-3 bg-[#e2ddd8]" />

          {/* Journal */}
          <button className="text-[#c4bfbb] hover:text-[#c9a96e] transition-colors">
            <BookOpen style={{ width: "0.95rem", height: "0.95rem" }} />
          </button>
        </div>
      </div>
    </article>
  );
}