import { useState } from "react";
import { Droplet, Sparkles, Eye, ChevronDown, ChevronUp } from "lucide-react";

export default function TreatmentProfiles() {
  const [openSection, setOpenSection] = useState<string>("BIAB");

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? "" : section);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl mb-2" style={{ color: 'var(--text-primary)' }}>
          Aftercare
        </h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Essential tips to maintain your treatments.
        </p>
      </div>

      <div className="space-y-6">
        <section className="glass-card overflow-hidden">
          <button
            onClick={() => toggleSection("BIAB")}
            className="w-full px-6 py-5 flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full" style={{ backgroundColor: 'var(--color-amethyst-600)', color: 'white' }}>
                <Sparkles size={20} />
              </div>
              <h3 className="text-xl font-medium" style={{ color: 'var(--text-primary)' }}>
                BIAB
              </h3>
            </div>
            {openSection === "BIAB" ? (
              <ChevronUp size={20} style={{ color: 'var(--text-muted)' }} />
            ) : (
              <ChevronDown size={20} style={{ color: 'var(--text-muted)' }} />
            )}
          </button>
          
          {openSection === "BIAB" && (
            <div className="px-6 pb-6 border-t pt-4 animate-in slide-in-from-top-2" style={{ borderColor: 'var(--card-border)' }}>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--color-amethyst-600)' }} />
                  Use cuticle oil daily to keep nails hydrated and flexible.
                </li>
                <li className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--color-amethyst-600)' }} />
                  Wear gloves when cleaning or doing dishes.
                </li>
                <li className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--color-amethyst-600)' }} />
                  Do not use your nails as tools (e.g., opening cans).
                </li>
              </ul>
            </div>
          )}
        </section>

        <section className="glass-card overflow-hidden">
          <button
            onClick={() => toggleSection("Gel Polish")}
            className="w-full px-6 py-5 flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full" style={{ backgroundColor: 'var(--color-amethyst-600)', color: 'white' }}>
                <Droplet size={20} />
              </div>
              <h3 className="text-xl font-medium" style={{ color: 'var(--text-primary)' }}>
                Gel Polish
              </h3>
            </div>
            {openSection === "Gel Polish" ? (
              <ChevronUp size={20} style={{ color: 'var(--text-muted)' }} />
            ) : (
              <ChevronDown size={20} style={{ color: 'var(--text-muted)' }} />
            )}
          </button>
          
          {openSection === "Gel Polish" && (
            <div className="px-6 pb-6 border-t pt-4 animate-in slide-in-from-top-2" style={{ borderColor: 'var(--card-border)' }}>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--color-amethyst-600)' }} />
                  Avoid hot baths, saunas, or steam rooms for the first 24 hours.
                </li>
                <li className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--color-amethyst-600)' }} />
                  Never peel or pick off gel polish to prevent nail damage.
                </li>
                <li className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--color-amethyst-600)' }} />
                  Book a professional removal when you're ready for a change.
                </li>
              </ul>
            </div>
          )}
        </section>

        <section className="glass-card overflow-hidden">
          <button
            onClick={() => toggleSection("Lashes")}
            className="w-full px-6 py-5 flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full" style={{ backgroundColor: 'var(--color-amethyst-600)', color: 'white' }}>
                <Eye size={20} />
              </div>
              <h3 className="text-xl font-medium" style={{ color: 'var(--text-primary)' }}>
                Lashes
              </h3>
            </div>
            {openSection === "Lashes" ? (
              <ChevronUp size={20} style={{ color: 'var(--text-muted)' }} />
            ) : (
              <ChevronDown size={20} style={{ color: 'var(--text-muted)' }} />
            )}
          </button>
          
          {openSection === "Lashes" && (
            <div className="px-6 pb-6 border-t pt-4 animate-in slide-in-from-top-2" style={{ borderColor: 'var(--card-border)' }}>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--color-amethyst-600)' }} />
                  Keep lashes dry for the first 24-48 hours.
                </li>
                <li className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--color-amethyst-600)' }} />
                  Avoid oil-based makeup removers or cleansers around the eyes.
                </li>
                <li className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--color-amethyst-600)' }} />
                  Brush your lashes daily with a clean spoolie wand.
                </li>
              </ul>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
