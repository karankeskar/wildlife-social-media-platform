import { useEffect, useState, useRef } from "react";
import { getFieldNotes, addFieldNotes, deleteFieldNote } from "@/services/authServices";
import { toast } from "sonner";
import { Trash2, Send } from "lucide-react";

interface FieldNote {
  _id: string;
  content: string;
  createdAt: string;
  userId: {
    _id: string;
    fullName: string;
    profile_picture?: string;
  };
}

interface FieldNotesProps {
  postId: string;
  currentUserId?: string;
  onCountChange: (delta: number) => void;
}

function timeAgo(dateString: string): string {
  const diff = Date.now() - new Date(dateString).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  return `${Math.floor(hrs / 24)}d`;
}

export function FieldNotes({ postId, currentUserId, onCountChange }: FieldNotesProps) {
  const [notes, setNotes] = useState<FieldNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchNotes();
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [postId]);

  const fetchNotes = async () => {
    try {
      const res = await getFieldNotes(postId);
      setNotes(res.notes);
    } catch {
      toast.error("Failed to load field notes");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);
    try {
      const res = await addFieldNotes(postId, content.trim());
      setNotes((prev) => [res.note, ...prev]);
      setContent("");
      onCountChange(1);
    } catch {
      toast.error("Failed to add field note");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (noteId: string) => {
    try {
      await deleteFieldNote(noteId);
      setNotes((prev) => prev.filter((n) => n._id !== noteId));
      onCountChange(-1);
    } catch {
      toast.error("Failed to delete note");
    }
  };

  return (
    <div
      className="border-t border-[#f0ece8] bg-[#fafaf9]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 border-b border-[#f0ece8]">
        <input
          ref={inputRef}
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a field note…"
          maxLength={500}
          disabled={submitting}
          className="flex-1 bg-transparent text-[#0f1a0e] placeholder:text-[#c4bfbb] text-sm outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={submitting || !content.trim()}
          className="p-1.5 rounded-lg text-[#2d6a4f] hover:bg-[#e8f5ee] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <Send style={{ width: "0.9rem", height: "0.9rem" }} />
        </button>
      </form>

      <div className="max-h-64 overflow-y-auto">
        {loading ? (
          <div className="px-4 py-3 space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-2 animate-pulse">
                <div className="w-6 h-6 rounded-full bg-[#e8e4df] shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="w-24 h-2.5 rounded bg-[#e8e4df]" />
                  <div className="w-48 h-2.5 rounded bg-[#ede9e4]" />
                </div>
              </div>
            ))}
          </div>
        ) : notes.length === 0 ? (
          <div className="px-4 py-5 text-center">
            <p className="text-[#c4bfbb] text-xs">
              No field notes yet — be the first to observe.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#f0ece8]">
            {notes.map((note) => {
              const initials = note.userId.fullName?.charAt(0).toUpperCase() || "U";
              const isOwner = note.userId._id === currentUserId;

              return (
                <div key={note._id} className="flex items-start gap-2.5 px-4 py-3 group">
                  <div className="w-6 h-6 rounded-full bg-[#e8f5ee] border border-[#c8e6d4] flex items-center justify-center text-[#2d6a4f] text-[0.6rem] font-semibold overflow-hidden shrink-0 mt-0.5">
                    {note.userId.profile_picture ? (
                      <img
                        src={note.userId.profile_picture}
                        alt={note.userId.fullName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      initials
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span className="text-[#0f1a0e] text-xs font-semibold">
                        {note.userId.fullName}
                      </span>
                      <span
                        className="text-[#c4bfbb] text-[0.6rem]"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        {timeAgo(note.createdAt)}
                      </span>
                    </div>
                    <p className="text-[#6b6864] text-xs leading-relaxed mt-0.5 wrap-break-words">
                      {note.content}
                    </p>
                  </div>

                  {isOwner && (
                    <button
                      onClick={() => handleDelete(note._id)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded text-[#c4bfbb] hover:text-red-400 hover:bg-red-50 transition-all shrink-0"
                    >
                      <Trash2 style={{ width: "0.75rem", height: "0.75rem" }} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}