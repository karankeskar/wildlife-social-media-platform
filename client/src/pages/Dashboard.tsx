import CreatePost from "@/components/dashboard/CreatePost";
import { Feed } from "@/components/feed";

export default function Dashboard() {
  return (
    <div className="container mx-auto max-w-2xl py-6 space-y-6">
      <CreatePost />
      <Feed />
    </div>
  );
}