import CreatePost from "@/dashboard/CreatePost";
import { Feed } from "@/components/feed";

export default function Dashboard() {
  return (
    <div
      className="min-h-screen bg-[#f0ece6]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Subtle paper texture via gradient */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />
      <div className="container mx-auto max-w-[620px] pt-24 pb-16 px-4">
        <CreatePost />
        <Feed />
      </div>
    </div>
  );
}