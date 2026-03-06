import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useState, useRef, useEffect } from "react"
import { login } from "@/services/authServices"

declare global {
  interface Window {
    turnstile?: any
  }
}

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const turnstileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (
      window.turnstile &&
      turnstileRef.current &&
      !turnstileRef.current.hasChildNodes()
    ) {
      window.turnstile.render(turnstileRef.current, {
        sitekey: "1x00000000000000000000AA",
        theme: "light",
      })
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await login(email, password)
      console.log("Login successful", response)
      toast.success("Welcome back!", { description: "Login successful." })
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 2000)
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || "Login unsuccessful")
      } else {
        toast.error("Login unsuccessful")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Heading */}
      <div className="mb-8">
        <h1
          className="text-[#0f1a0e] font-semibold mb-1.5 tracking-tight"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "1.75rem",
          }}
        >
          Welcome back
        </h1>
        <p className="text-[#6b6864] text-sm">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-[#2d6a4f] font-medium hover:underline underline-offset-4 transition-colors"
          >
            Sign up free
          </a>
        </p>
      </div>

      {/* Google Button */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg border border-[#e2ddd8] bg-white hover:bg-[#f5f3f0] text-[#0f1a0e] text-sm font-medium transition-colors mb-6"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continue with Google
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-[#e2ddd8]" />
        <span className="text-[#a09d99] text-xs">or</span>
        <div className="flex-1 h-px bg-[#e2ddd8]" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="text-xs font-medium text-[#3d3a37] block"
          >
            Email address
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="bg-white border-[#e2ddd8] text-[#0f1a0e] placeholder:text-[#c4bfbb] focus-visible:ring-1 focus-visible:ring-[#2d6a4f] focus-visible:border-[#2d6a4f] h-10 text-sm transition-colors"
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-xs font-medium text-[#3d3a37] block"
            >
              Password
            </label>
            <a
              href="#"
              className="text-xs text-[#2d6a4f] hover:underline underline-offset-4 transition-colors"
            >
              Forgot password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
            className="bg-white border-[#e2ddd8] text-[#0f1a0e] placeholder:text-[#c4bfbb] focus-visible:ring-1 focus-visible:ring-[#2d6a4f] focus-visible:border-[#2d6a4f] h-10 text-sm transition-colors"
          />
        </div>

        {/* Turnstile */}
        <div ref={turnstileRef} className="flex justify-start" />

        {/* Submit */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-10 bg-[#2d6a4f] hover:bg-[#245c43] text-white text-sm font-medium tracking-wide transition-colors disabled:opacity-50 mt-2"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Signing in…
            </span>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
    </div>
  )
}