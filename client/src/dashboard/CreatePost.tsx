import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreatePostForm } from "@/form/create-post-form";
import { useState } from "react";
import { Camera, MapPin, PenLine } from "lucide-react";

export default function CreatePost() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div
        className="bg-white rounded-xl border border-[#e8e4df] shadow-sm overflow-hidden mb-4"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Top prompt — feels like opening a journal */}
        <DialogTrigger asChild>
          <button className="w-full text-left px-5 py-4 group">
            <p
              className="text-[#c4bfbb] group-hover:text-[#a09d99] transition-colors text-sm italic"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1rem" }}
            >
              What did you spot today?
            </p>
          </button>
        </DialogTrigger>

        {/* Divider */}
        <div className="h-px bg-[#f0ece8] mx-5" />

        {/* Quick action row */}
        <div className="flex items-center justify-between px-4 py-2.5">
          <div className="flex gap-0.5">
            <DialogTrigger asChild>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[#a09d99] hover:text-[#0f1a0e] hover:bg-[#f5f3f0] transition-colors text-xs">
                <Camera className="w-3.5 h-3.5" />
                Photo
              </button>
            </DialogTrigger>
            <DialogTrigger asChild>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[#a09d99] hover:text-[#0f1a0e] hover:bg-[#f5f3f0] transition-colors text-xs">
                <MapPin className="w-3.5 h-3.5" />
                Location
              </button>
            </DialogTrigger>
          </div>

          <DialogTrigger asChild>
            <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#2d6a4f] hover:bg-[#245c43] text-white text-xs font-medium transition-colors">
              <PenLine className="w-3.5 h-3.5" />
              New entry
            </button>
          </DialogTrigger>
        </div>
      </div>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-[#e8e4df]">
        <CreatePostForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}