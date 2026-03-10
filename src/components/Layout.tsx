import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";

export default function Layout() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <header className="p-4 shadow-md sticky top-0 z-10 flex justify-between items-center" style={{ backgroundColor: 'var(--header-bg)', color: 'var(--header-text)' }}>
        <div className="w-8"></div> {/* Spacer for centering */}
        <div>
          <h1 className="text-2xl text-center font-serif tracking-wide">
            Amethyst
          </h1>
          <p className="text-center text-xs uppercase tracking-widest mt-1 opacity-80">
            Nails & Beauty
          </p>
        </div>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      <main className="flex-1 w-full max-w-md mx-auto p-4">
        <Outlet />
      </main>

      <footer className="text-center p-6 pb-24 text-sm" style={{ backgroundColor: 'var(--header-bg)', color: 'var(--header-text)' }}>
        <p className="font-serif text-lg mb-2">
          Amethyst Nails & Beauty
        </p>
        <p className="opacity-80">98 Trinity Street</p>
        <p className="opacity-80">Gainsborough</p>
        <p className="mt-2">
          <a
            href="tel:01427617211"
            className="font-medium underline underline-offset-4"
          >
            01427 617211
          </a>
        </p>
      </footer>

      <Navigation />
    </div>
  );
}
