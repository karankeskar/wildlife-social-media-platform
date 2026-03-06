import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getPosts } from "@/services/authServices";
import { MapPin } from "lucide-react";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const greenIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface Post {
  _id: string;
  userId: { _id: string; fullName: string };
  title: string;
  image: string;
  location?: string;
  country: string;
  category: string;
  conservation_status?: string;
  latitude?: number;
  longitude?: number;
  spot_count: number;
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  "Least Concern":          "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Near Threatened":        "bg-teal-50 text-teal-700 border-teal-200",
  "Vulnerable":             "bg-yellow-50 text-yellow-700 border-yellow-200",
  "Endangered":             "bg-orange-50 text-orange-700 border-orange-200",
  "Critically Endangered":  "bg-red-50 text-red-700 border-red-200",
  "Extinct in Wild":        "bg-purple-50 text-purple-700 border-purple-200",
  "Extinct":                "bg-zinc-100 text-zinc-500 border-zinc-200",
};

export default function SightingsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getPosts();
        setPosts(res.posts);
      } catch {} finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const mappablePosts = posts.filter(
    (p) => p.latitude != null && p.longitude != null
  );

  return (
    <div
      className="min-h-screen bg-[#f0ece6]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="container mx-auto max-w-[1100px] pt-24 pb-4 px-4">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <MapPin className="w-4 h-4 text-[#2d6a4f]" />
            <h1
              className="text-[#0f1a0e] font-light"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.8rem",
              }}
            >
              Sightings Map
            </h1>
          </div>
          <p className="text-[#a09d99] text-sm ml-7">
            {loading
              ? "Loading sightings…"
              : `${mappablePosts.length} sighting${mappablePosts.length !== 1 ? "s" : ""} mapped across ${new Set(mappablePosts.map((p) => p.country)).size} countries`}
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-[1100px] px-4 pb-16">
        <div className="rounded-xl overflow-hidden border border-[#e8e4df] shadow-sm">
          {loading ? (
            <div className="w-full h-[600px] bg-white animate-pulse flex items-center justify-center">
              <p className="text-[#c4bfbb] text-sm">Loading map…</p>
            </div>
          ) : (
            <MapContainer
              center={[20, 78]}
              zoom={4}
              style={{ height: "600px", width: "100%" }}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {mappablePosts.map((post) => (
                <Marker
                  key={post._id}
                  position={[post.latitude!, post.longitude!]}
                  icon={greenIcon}
                >
                  <Popup maxWidth={240}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      <img
                        src={post.image}
                        alt={post.title}
                        style={{
                          width: "100%",
                          height: "130px",
                          objectFit: "cover",
                          borderRadius: "6px",
                          marginBottom: "8px",
                        }}
                      />

                      <p
                        style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          fontSize: "1rem",
                          fontWeight: 600,
                          color: "#0f1a0e",
                          marginBottom: "4px",
                          lineHeight: 1.3,
                        }}
                      >
                        {post.title}
                      </p>

                      <p
                        style={{
                          fontSize: "0.7rem",
                          color: "#a09d99",
                          marginBottom: "6px",
                          display: "flex",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        📍 {[post.location, post.country].filter(Boolean).join(", ")}
                      </p>

                      {post.conservation_status && (
                        <span
                          style={{
                            fontSize: "0.58rem",
                            padding: "2px 8px",
                            borderRadius: "999px",
                            border: "1px solid",
                            display: "inline-block",
                            marginBottom: "6px",
                            fontFamily: "'DM Mono', monospace",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                          }}
                          className={STATUS_COLORS[post.conservation_status] ?? ""}
                        >
                          {post.conservation_status}
                        </span>
                      )}

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: "6px",
                          paddingTop: "6px",
                          borderTop: "1px solid #f0ece8",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.65rem",
                            color: "#6b6864",
                            fontFamily: "'DM Mono', monospace",
                          }}
                        >
                          {post.category}
                        </span>
                        <span
                          style={{
                            fontSize: "0.65rem",
                            color: "#2d6a4f",
                            fontFamily: "'DM Mono', monospace",
                          }}
                        >
                          👁 {post.spot_count}
                        </span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>

        {!loading && mappablePosts.length === 0 && (
          <div className="text-center py-12">
            <p
              className="text-[#0f1a0e] text-xl font-light mb-2"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              No mapped sightings yet
            </p>
            <p className="text-[#a09d99] text-sm">
              New posts with a location will appear here automatically
            </p>
          </div>
        )}
      </div>
    </div>
  );
}