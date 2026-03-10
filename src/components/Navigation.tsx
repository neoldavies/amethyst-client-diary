import { NavLink } from "react-router-dom";
import { Home, List, BookOpen, Image as ImageIcon, Sparkles } from "lucide-react";

export default function Navigation() {
  const navItems = [
    { to: "/", icon: Home, label: "Diary" },
    { to: "/prices", icon: List, label: "Prices" },
    { to: "/archive", icon: Sparkles, label: "Archive" },
    { to: "/aftercare", icon: BookOpen, label: "Aftercare" },
    { to: "/gallery", icon: ImageIcon, label: "Gallery" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 pb-safe" style={{ backgroundColor: 'var(--nav-bg)', borderTop: '1px solid var(--nav-border)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? "active-nav-item" : "inactive-nav-item"
              }`
            }
            style={({ isActive }) => ({
              color: isActive ? 'var(--nav-text-active)' : 'var(--nav-text)'
            })}
          >
            {({ isActive }) => (
              <>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium uppercase tracking-wider">
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
