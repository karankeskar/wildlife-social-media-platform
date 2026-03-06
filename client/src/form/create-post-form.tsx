import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createPost, uploadImage } from "@/services/authServices"
import { toast } from "sonner"
import { useState } from "react"
import { Upload, X, CheckCircle2, Camera, MapPin, Leaf } from "lucide-react"

const postSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  caption: z.string().optional(),
  hashtag: z.string().optional(),
  category: z.enum(
    ["Mammals", "Birds", "Reptiles and Amphibians", "Insects and Inverterbes", "Landscapes"],
    { message: "Please select a category" }
  ),
  location: z.string().optional(),
  country: z.string().min(2, { message: "Country is required." }),
  nationalpark: z.string().optional(),
  camera: z.string().optional(),
  lens: z.string().optional(),
  conservation_status: z
    .enum([
      "Least Concern",
      "Near Threatened",
      "Vulnerable",
      "Endangered",
      "Critically Endangered",
      "Extinct in Wild",
      "Extinct",
    ])
    .optional(),
})

type PostFormValues = z.infer<typeof postSchema>

function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <label className="block text-xs font-medium text-[#6b6864] mb-1.5 tracking-wide">
      {children}
      {required && <span className="text-[#c9a96e] ml-0.5">*</span>}
    </label>
  )
}

function SectionHeading({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-[#2d6a4f]">{icon}</span>
      <span
        className="text-[0.65rem] text-[#a09d99] tracking-[0.15em] uppercase"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        {label}
      </span>
      <div className="flex-1 h-px bg-[#f0ece8]" />
    </div>
  )
}

// ── Light theme shared classes ──
const inputCls =
  "bg-[#fafaf9] border-[#e2ddd8] text-[#0f1a0e] placeholder:text-[#c4bfbb] " +
  "focus-visible:ring-1 focus-visible:ring-[#2d6a4f]/40 focus-visible:border-[#2d6a4f]/50 " +
  "h-10 text-sm transition-colors rounded-lg"

const selectTriggerCls =
  "bg-[#fafaf9] border-[#e2ddd8] text-[#0f1a0e] " +
  "focus:ring-1 focus:ring-[#2d6a4f]/40 focus:border-[#2d6a4f]/50 " +
  "h-10 text-sm rounded-lg"

export function CreatePostForm({ onSuccess }: { onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("")

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      caption: "",
      hashtag: "",
      category: undefined,
      location: "",
      country: "",
      nationalpark: "",
      camera: "",
      lens: "",
      conservation_status: undefined,
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file")
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB")
      return
    }
    setSelectedFile(file)
    const reader = new FileReader()
    reader.onloadend = () => setPreviewUrl(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setUploadedImageUrl("")
  }

  const handleUploadImage = async () => {
    if (!selectedFile) {
      toast.error("Please select an image first")
      return
    }
    setUploading(true)
    try {
      const response = await uploadImage(selectedFile)
      setUploadedImageUrl(response.url)
      toast.success("Image uploaded!")
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message || "Failed to upload image")
      else toast.error("Failed to upload image")
    } finally {
      setUploading(false)
    }
  }

  async function onSubmit(values: PostFormValues) {
    if (!uploadedImageUrl) {
      toast.error("Please upload an image first")
      return
    }
    setLoading(true)
    try {
      const hashtagArray = values.hashtag
        ? values.hashtag.split(",").map((t) => t.trim()).filter(Boolean)
        : []
      await createPost({ ...values, hashtag: hashtagArray, image: uploadedImageUrl })
      toast.success("Sighting logged!", { description: "Your post is now live." })
      form.reset()
      handleRemoveImage()
      onSuccess?.()
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message || "Failed to create post")
      else toast.error("Failed to create post")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* ── Image Upload ── */}
        <div>
          {previewUrl ? (
            <div className="relative rounded-xl overflow-hidden border border-[#e2ddd8]">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full max-h-72 object-cover"
              />

              {/* Remove */}
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors backdrop-blur-sm"
              >
                <X className="w-3.5 h-3.5 text-white" />
              </button>

              {/* Upload bar */}
              {!uploadedImageUrl ? (
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                  <button
                    type="button"
                    onClick={handleUploadImage}
                    disabled={uploading}
                    className="w-full h-9 rounded-lg bg-[#2d6a4f] hover:bg-[#245c43] disabled:opacity-60 text-white text-xs font-medium tracking-wide transition-colors flex items-center justify-center gap-2"
                  >
                    {uploading ? (
                      <>
                        <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Uploading…
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5" />
                        Confirm upload
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="absolute bottom-2.5 left-2.5">
                  <span className="flex items-center gap-1.5 text-xs text-emerald-700 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" />
                    Uploaded
                  </span>
                </div>
              )}
            </div>
          ) : (
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center gap-3 w-full h-48 rounded-xl border border-dashed border-[#e2ddd8] bg-[#fafaf9] hover:border-[#2d6a4f]/40 hover:bg-[#f5f3f0] transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full bg-white border border-[#e2ddd8] group-hover:border-[#2d6a4f]/30 group-hover:bg-[#e8f5ee] flex items-center justify-center transition-colors">
                <Upload
                  className="text-[#c4bfbb] group-hover:text-[#2d6a4f] transition-colors"
                  style={{ width: "1.1rem", height: "1.1rem" }}
                />
              </div>
              <div className="text-center">
                <p className="text-[#6b6864] text-sm">
                  <span className="text-[#2d6a4f] font-medium">Click to upload</span> your photo
                </p>
                <p className="text-[#c4bfbb] text-xs mt-0.5">PNG, JPG up to 5MB</p>
              </div>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={loading || uploading}
              />
            </label>
          )}
        </div>

        {/* ── Sighting Details ── */}
        <div>
          <SectionHeading icon={<Leaf size={13} />} label="Sighting Details" />
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel required>Title</FieldLabel>
                  <FormControl>
                    <Input
                      placeholder="Bengal Tiger, Ranthambore"
                      {...field}
                      disabled={loading}
                      className={inputCls}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="caption"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel>Caption</FieldLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about this moment…"
                      className={`${inputCls} h-auto min-h-[80px] resize-none py-2.5`}
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs mt-1" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FieldLabel required>Category</FieldLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loading}>
                      <FormControl>
                        <SelectTrigger className={selectTriggerCls}>
                          <SelectValue placeholder="Select…" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white border-[#e2ddd8] text-[#0f1a0e]">
                        {["Mammals", "Birds", "Reptiles and Amphibians", "Insects and Inverterbes", "Landscapes"].map((c) => (
                          <SelectItem
                            key={c}
                            value={c}
                            className="focus:bg-[#f5f3f0] focus:text-[#0f1a0e] text-sm"
                          >
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="conservation_status"
                render={({ field }) => (
                  <FormItem>
                    <FieldLabel>IUCN Status</FieldLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loading}>
                      <FormControl>
                        <SelectTrigger className={selectTriggerCls}>
                          <SelectValue placeholder="Select…" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white border-[#e2ddd8] text-[#0f1a0e]">
                        {[
                          "Least Concern",
                          "Near Threatened",
                          "Vulnerable",
                          "Endangered",
                          "Critically Endangered",
                          "Extinct in Wild",
                          "Extinct",
                        ].map((s) => (
                          <SelectItem
                            key={s}
                            value={s}
                            className="focus:bg-[#f5f3f0] focus:text-[#0f1a0e] text-sm"
                          >
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="hashtag"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel>Hashtags</FieldLabel>
                  <FormControl>
                    <Input
                      placeholder="wildlife, tiger, bigcats"
                      {...field}
                      disabled={loading}
                      className={inputCls}
                    />
                  </FormControl>
                  <p className="text-[#c4bfbb] text-xs mt-1">Separate with commas</p>
                  <FormMessage className="text-red-500 text-xs mt-1" />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* ── Location ── */}
        <div>
          <SectionHeading icon={<MapPin size={13} />} label="Location" />
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FieldLabel required>Country</FieldLabel>
                    <FormControl>
                      <Input placeholder="India" {...field} disabled={loading} className={inputCls} />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FieldLabel>Specific Location</FieldLabel>
                    <FormControl>
                      <Input placeholder="Ranthambore, Rajasthan" {...field} disabled={loading} className={inputCls} />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="nationalpark"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel>National Park / Reserve</FieldLabel>
                  <FormControl>
                    <Input placeholder="Ranthambore National Park" {...field} disabled={loading} className={inputCls} />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs mt-1" />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* ── Gear ── */}
        <div>
          <SectionHeading icon={<Camera size={13} />} label="Gear" />
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="camera"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel>Camera</FieldLabel>
                  <FormControl>
                    <Input placeholder="Canon EOS R5" {...field} disabled={loading} className={inputCls} />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs mt-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lens"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel>Lens</FieldLabel>
                  <FormControl>
                    <Input placeholder="100-400mm f/4.5" {...field} disabled={loading} className={inputCls} />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs mt-1" />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* ── Submit ── */}
        <div className="pt-2 border-t border-[#f0ece8]">
          <button
            type="submit"
            disabled={loading || !uploadedImageUrl}
            className="w-full h-10 rounded-lg bg-[#2d6a4f] hover:bg-[#245c43] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium tracking-wide transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Logging entry…
              </>
            ) : (
              "Log sighting"
            )}
          </button>
          {!uploadedImageUrl && (
            <p className="text-center text-[#c4bfbb] text-xs mt-2">
              Upload a photo to continue
            </p>
          )}
        </div>
      </form>
    </Form>
  )
}