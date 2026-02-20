import { SignupForm } from "@/form/signup-form"

export default function SignupPage() {
  return (
    <div
      className="min-h-screen flex"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Similar structure to login page with image on the left hand side */}
      <div className="hidden lg:flex lg:w-[45%] relative flex-col overflow-hidden bg-[#070b06]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/2C1A8398.jpeg')`,
          }}
        />
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-end h-full p-12">
          {/* Temporary stats at the left hand side corner */}
          <div>
            <p
              className="text-[#ffffff] text-xs tracking-[0.2em] uppercase mb-4"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Wildlife · Photography · Conservation
            </p>
            <h2
              className="text-[#ede8df] font-light leading-tight mb-4"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              }}
            >
              Where wildlife
              <br />
              stories are told.
            </h2>
            <p className="text-[#ffffff] text-sm leading-relaxed max-w-xs">
              Join thousands of naturalists, photographers, and conservationists
              documenting the wild.
            </p>

            {/* Stats row */}
            <div className="flex gap-8 mt-8 pt-8 border-t border-white/10">
              {[
                { value: "12K+", label: "Species logged" },
                { value: "4K+", label: "Contributors" },
                { value: "80+", label: "Countries" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    className="text-[#ffffff] text-lg font-semibold"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-[#ffffff] text-xs mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Panel (Form) ── */}
      <div className="flex-1 bg-[#fafaf9] flex flex-col">
        {/* Mobile logo (only shows on small screens) */}
        <div className="lg:hidden px-8 pt-8">
          <span
            className="text-[#070b06] text-xl tracking-[0.2em] font-light"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            NATURE<span className="text-[#c9a96e]">CONNECT</span>
          </span>
        </div>

        {/* Center the form vertically */}
        <div className="flex-1 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-[420px]">
            <SignupForm />
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 pb-8 text-center">
          <p className="text-xs text-[#a09d99]">
            By creating an account you agree to our{" "}
            <a href="#" className="underline underline-offset-2 hover:text-[#070b06] transition-colors">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-2 hover:text-[#070b06] transition-colors">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}