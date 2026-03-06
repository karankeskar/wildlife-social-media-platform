import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { Home, Compass, MapPin, Users, Bell, Plus, User, LogOut } from "lucide-react"

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isLoggedIn, logout } = useAuth()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-[#fafaf9]/95 backdrop-blur-md border-b border-[#e2ddd8]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <button
            onClick={() => navigate(isLoggedIn ? "/dashboard" : "/")}
            className="shrink-0"
          >
            <span
              className="text-[#0f1a0e] text-xl font-light tracking-[0.15em]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              NATURE<span className="text-[#c9a96e]">CONNECT</span>
            </span>
          </button>

          {isLoggedIn ? (
            <>
              {/* ── Center nav ── */}
              <div className="hidden md:flex items-center gap-1">
                {[
                  { label: "Feed",      icon: Home,    path: "/dashboard"  },
                  { label: "Explore",   icon: Compass, path: "/explore"    },
                  { label: "Sightings", icon: MapPin,  path: "/sightings"  },
                  { label: "Community", icon: Users,   path: "/community"  },
                ].map(({ label, icon: Icon, path }) => {
                  const active = isActive(path)
                  return (
                    <button
                      key={path}
                      onClick={() => navigate(path)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm transition-colors ${
                        active
                          ? "text-[#2d6a4f] bg-[#e8f5ee]"
                          : "text-[#6b6864] hover:text-[#0f1a0e] hover:bg-[#f5f3f0]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{label}</span>
                    </button>
                  )
                })}
              </div>

              {/* ── Right actions ── */}
              <div className="flex items-center gap-1">
                {/* New entry */}
                <button
                  onClick={() => navigate("/dashboard")}
                  className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#2d6a4f] hover:bg-[#245c43] text-white text-sm font-medium transition-colors mr-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  New entry
                </button>

                {/* Notifications */}
                <button
                  onClick={() => navigate("/notifications")}
                  className="relative p-2 rounded-lg text-[#a09d99] hover:text-[#0f1a0e] hover:bg-[#f5f3f0] transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-4.5 h-4.5" style={{ width: "1.1rem", height: "1.1rem" }} />
                  {/* Badge */}
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#c9a96e] rounded-full" />
                </button>

                {/* Profile */}
                <button
                  onClick={() => navigate("/profile")}
                  className="p-2 rounded-lg text-[#a09d99] hover:text-[#0f1a0e] hover:bg-[#f5f3f0] transition-colors"
                  aria-label="Profile"
                >
                  <User style={{ width: "1.1rem", height: "1.1rem" }} />
                </button>

                {/* Divider */}
                <div className="w-px h-5 bg-[#e2ddd8] mx-1" />

                {/* Logout */}
                <button
                  onClick={logout}
                  className="p-2 rounded-lg text-[#a09d99] hover:text-red-500 hover:bg-red-50 transition-colors"
                  aria-label="Logout"
                >
                  <LogOut style={{ width: "1.1rem", height: "1.1rem" }} />
                </button>
              </div>
            </>
          ) : (
            /* ── Logged out ── */
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/")}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive("/explore")
                    ? "text-[#2d6a4f] bg-[#e8f5ee]"
                    : "text-[#6b6864] hover:text-[#0f1a0e] hover:bg-[#f5f3f0]"
                }`}
              >
                Explore
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#6b6864] hover:text-[#0f1a0e] hover:bg-[#f5f3f0] transition-colors"
              >
                Sign up
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-3.5 py-2 rounded-lg bg-[#2d6a4f] hover:bg-[#245c43] text-white text-sm font-medium transition-colors"
              >
                Sign in
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}