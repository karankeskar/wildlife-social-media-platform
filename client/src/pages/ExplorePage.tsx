import { useNavigate } from "react-router-dom";
import { Eye, MapPin, Lock } from "lucide-react";

// JSON Objects of static Images of mine, with title and raw sample data which is not accruate
const SHOWCASE_POSTS = [
  {
    id: 1,
    title: "Bengal Tiger",
    location: "Kabini, India",
    category: "Mammals",
    conservation_status: "Endangered",
    spot_count: 284,
    image: "/2C1A1227.jpeg",
  },
  {
    id: 2,
    title: "Indian Wild Dog",
    location: "Kabini, India",
    category: "Mammals",
    conservation_status: "Vulnerable",
    spot_count: 142,
    image: "/2C1A2630.jpeg",
  },
  {
    id: 3,
    title: "Black Panther",
    location: "Kabini, India",
    category: "Mammals",
    conservation_status: "Vulnerable",
    spot_count: 501,
    image: "/2C1A2898.jpeg",
  },
  {
    id: 4,
    title: "Parakeet",
    location: "Jim Corbett, India",
    category: "Birds",
    conservation_status: "Critically Endangered",
    spot_count: 89,
    image: "/2C1A2947.jpeg",
  },
  {
    id: 5,
    title: "White Breasted Kingfisher",
    location: "Bandipur, India",
    category: "Birds",
    conservation_status: "Least Concern",
    spot_count: 176,
    image: "/2C1A5548.jpeg",
  },
  {
    id: 6,
    title: "Common Myna on an Elephant",
    location: "Kabini, India",
    category: "Birds",
    conservation_status: undefined,
    spot_count: 318,
    image: "/2C1A6370.jpeg",
  },
];

const STATS = [
  { value: "12K+", label: "Species logged" },
  { value: "4K+", label: "Contributors" },
  { value: "80+", label: "Countries" },
  { value: "340+", label: "Critically endangered sightings" },
];

// Static colors depicting the vulnerability status of each animal, again not important
const STATUS_COLORS: Record<string, string> = {
  "Least Concern": "bg-green-900/70 text-green-300",
  "Near Threatened": "bg-teal-900/70 text-teal-300",
  Vulnerable: "bg-yellow-900/70 text-yellow-300",
  Endangered: "bg-orange-900/70 text-orange-300",
  "Critically Endangered": "bg-red-900/70 text-red-300",
  "Extinct in Wild": "bg-purple-900/70 text-purple-300",
  Extinct: "bg-zinc-900/70 text-zinc-300",
};

export default function ExplorePage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-[#f0ece6]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />

      <div className="container mx-auto max-w-[680px] pt-24 pb-20 px-4">
        <div className="mb-10 text-center">
          <p
            className="text-[#c9a96e] text-xs tracking-[0.25em] uppercase mb-3"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Wildlife · Photography · Conservation
          </p>
          <h1
            className="text-[#0f1a0e] font-light leading-tight mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2rem, 6vw, 2.8rem)",
            }}
          >
            Every sighting
            <br />
            tells a story.
          </h1>
          <p className="text-[#6b6864] text-sm leading-relaxed max-w-sm mx-auto mb-7">
            NatureConnect is where wildlife photographers, naturalists, and
            conservationists document the wild. Join thousands already logging
            sightings from across the globe.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => navigate("/signup")}
              className="px-5 py-2.5 rounded-lg bg-[#2d6a4f] hover:bg-[#245c43] text-white text-sm font-medium transition-colors"
            >
              Join for free
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2.5 rounded-lg bg-white border border-[#e2ddd8] hover:bg-[#fafaf9] text-[#0f1a0e] text-sm font-medium transition-colors"
            >
              Sign in
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3 mb-10">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-[#e8e4df] p-4 text-center"
            >
              <p
                className="text-[#2d6a4f] font-semibold mb-0.5"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "1.4rem",
                }}
              >
                {stat.value}
              </p>
              <p className="text-[#a09d99] text-[0.65rem] leading-tight">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-5">
            <span
              className="text-[0.6rem] text-[#b0a898] tracking-[0.2em] uppercase"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Recent sightings
            </span>
            <div className="flex-1 h-px bg-[#ddd8d2]" />
          </div>

          <div className="space-y-4">
            {SHOWCASE_POSTS.map((post, i) => (
              <div
                key={post.id}
                className="w-full bg-white rounded-xl border border-[#e8e4df] overflow-hidden shadow-sm"
              >
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full object-cover max-h-[420px]"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className="text-[0.58rem] tracking-[0.18em] uppercase bg-black/50 text-white/90 backdrop-blur-sm px-2 py-0.5 rounded"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {post.category}
                    </span>
                  </div>
                  {post.conservation_status && (
                    <div className="absolute bottom-3 left-3">
                      <span
                        className={`text-[0.58rem] tracking-[0.12em] uppercase px-2 py-0.5 rounded backdrop-blur-sm font-medium ${STATUS_COLORS[post.conservation_status] ?? "bg-black/50 text-white/70"}`}
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        {post.conservation_status}
                      </span>
                    </div>
                  )}
                  {i % 2 !== 0 && (
                    <div className="absolute inset-0 bg-gradient-to-top from-[#f0ece6]/95 via-[#f0ece6]/20 to-transparent flex items-end">
                      <div className="w-full p-5 text-center pb-6">
                        <div className="inline-flex items-center gap-1.5 bg-white border border-[#e2ddd8] rounded-full px-3 py-1.5 shadow-sm mb-2">
                          <Lock className="w-3 h-3 text-[#a09d99]" />
                          <span className="text-xs text-[#6b6864] font-medium">
                            Sign up to see the full sighting
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="px-5 pt-4 pb-3">
                  <h2
                    className="text-[#0f1a0e] mb-1"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "1.15rem",
                      fontWeight: 600,
                    }}
                  >
                    {post.title}
                  </h2>

                  <div className="flex items-center justify-between">
                    <p className="flex items-center gap-1 text-[#a09d99] text-xs">
                      <MapPin className="w-3 h-3" />
                      {post.location}
                    </p>

                    <div className="flex items-center gap-1 text-[#c4bfbb]">
                      <Eye style={{ width: "0.85rem", height: "0.85rem" }} />
                      <span
                        className="text-[0.7rem] font-medium"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        {post.spot_count}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#e8e4df] p-8 text-center shadow-sm">
          <p
            className="text-[#0f1a0e] font-light mb-2"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "1.5rem",
            }}
          >
            Start documenting the wild.
          </p>
          <p className="text-[#a09d99] text-sm mb-5">
            Free to join. Every sighting contributes to conservation awareness.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-2.5 rounded-lg bg-[#2d6a4f] hover:bg-[#245c43] text-white text-sm font-medium transition-colors"
          >
            Create your account
          </button>
        </div>
      </div>
    </div>
  );
}
