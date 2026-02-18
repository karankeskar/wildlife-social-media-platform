import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
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
import { Upload, X } from "lucide-react"

const postSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  caption: z.string().optional(),
  hashtag: z.string().optional(),
  category: z.enum(
    [
      "Mammals",
      "Birds",
      "Reptiles and Amphibians",
      "Insects and Inverterbes",
      "Landscapes"
    ],
    { message: "Please select a category" }
  ),
  location: z.string().optional(),
  country: z.string().min(2, {
    message: "Country is required.",
  }),
  nationalpark: z.string().optional(),
  camera: z.string().optional(),
  lens: z.string().optional(),
  conservation_status: z.enum([
    "Least Concern",
    "Near Threatened",
    "Vulnerable",
    "Endangered",
    "Critically Endangered",
    "Extinct in Wild",
    "Extinct"
  ]).optional(),
})

type PostFormValues = z.infer<typeof postSchema>

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
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error("Please select an image file")
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB")
        return
      }

      setSelectedFile(file)
      
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
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
      toast.success("Image uploaded successfully!")
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || "Failed to upload image")
      } else {
        toast.error("Failed to upload image")
      }
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
        ? values.hashtag.split(',').map(tag => tag.trim()).filter(tag => tag)
        : []

      const response = await createPost({
        ...values,
        hashtag: hashtagArray,
        image: uploadedImageUrl,
      })

      console.log("Post created successfully", response)
      toast.success("Post created successfully!")

      form.reset()
      handleRemoveImage()
      
      if (onSuccess) {
        onSuccess()
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || "Failed to create post")
      } else {
        toast.error("Failed to create post")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Image Upload Section */}
        <div className="space-y-4">
          <FormLabel>Image *</FormLabel>
          
          {previewUrl ? (
            <div className="relative">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="w-full h-64 object-cover rounded-lg"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4" />
              </Button>
              
              {!uploadedImageUrl && (
                <Button
                  type="button"
                  onClick={handleUploadImage}
                  disabled={uploading}
                  className="mt-2 w-full"
                >
                  {uploading ? "Uploading..." : "Upload Image to Cloudinary"}
                </Button>
              )}
              
              {uploadedImageUrl && (
                <p className="text-sm text-green-600 mt-2">✓ Image uploaded successfully</p>
              )}
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label htmlFor="image-upload" className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    Click to upload image
                  </span>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={loading || uploading}
                  />
                </label>
                <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
              </div>
            </div>
          )}
        </div>

        {/* All your other form fields stay the same */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title *</FormLabel>
              <FormControl>
                <Input placeholder="Amazing Wildlife Shot" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Caption</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about this moment..."
                  className="resize-none"
                  {...field}
                  disabled={loading}
                />
              </FormControl>
              <FormDescription>
                Share the story behind your photo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hashtag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hashtags</FormLabel>
              <FormControl>
                <Input placeholder="wildlife, nature, photography" {...field} disabled={loading} />
              </FormControl>
              <FormDescription>
                Separate hashtags with commas
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loading}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Mammals">Mammals</SelectItem>
                  <SelectItem value="Birds">Birds</SelectItem>
                  <SelectItem value="Reptiles and Amphibians">Reptiles and Amphibians</SelectItem>
                  <SelectItem value="Insects and Inverterbes">Insects and Invertebrates</SelectItem>
                  <SelectItem value="Landscapes">Landscapes</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country *</FormLabel>
              <FormControl>
                <Input placeholder="India" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Ranthambore, Rajasthan" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nationalpark"
          render={({ field }) => (
            <FormItem>
              <FormLabel>National Park</FormLabel>
              <FormControl>
                <Input placeholder="Ranthambore National Park" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="conservation_status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conservation Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loading}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select conservation status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Least Concern">Least Concern</SelectItem>
                  <SelectItem value="Near Threatened">Near Threatened</SelectItem>
                  <SelectItem value="Vulnerable">Vulnerable</SelectItem>
                  <SelectItem value="Endangered">Endangered</SelectItem>
                  <SelectItem value="Critically Endangered">Critically Endangered</SelectItem>
                  <SelectItem value="Extinct in Wild">Extinct in Wild</SelectItem>
                  <SelectItem value="Extinct">Extinct</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                IUCN Red List conservation status
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="camera"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Camera</FormLabel>
              <FormControl>
                <Input placeholder="Canon EOS R5" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lens"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lens</FormLabel>
              <FormControl>
                <Input placeholder="100-400mm f/4.5-5.6" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading || !uploadedImageUrl}>
          {loading ? "Creating Post..." : "Create Post"}
        </Button>
      </form>
    </Form>
  )
}