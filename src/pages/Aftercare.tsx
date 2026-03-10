import { useState } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

export default function Aftercare() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const aftercareData = [
    {
      id: "biab",
      title: "BIAB Aftercare",
      content: [
        "Use cuticle oil daily to keep your nails hydrated and flexible.",
        "Wear gloves when cleaning or doing dishes to protect the builder gel.",
        "Do not use your nails as tools (e.g., opening cans).",
        "If lifting occurs, do not pick or peel. Book a repair immediately.",
        "Attend infill appointments every 3-4 weeks to maintain structure.",
      ],
    },
    {
      id: "gel",
      title: "Gel Polish Aftercare",
      content: [
        "Avoid hot baths, saunas, or steam rooms for the first 24 hours.",
        "Apply cuticle oil daily to nourish the nail bed.",
        "Wear gloves when using harsh chemicals or gardening.",
        "Never peel or pick off gel polish, as this damages the natural nail.",
        "Book a professional removal when you're ready for a change.",
      ],
    },
    {
      id: "lashes",
      title: "Lash Extensions Aftercare",
      content: [
        "Keep lashes dry for the first 24-48 hours.",
        "Avoid oil-based makeup removers or cleansers around the eyes.",
        "Do not rub your eyes or pull on the extensions.",
        "Brush your lashes daily with a clean spoolie wand.",
        "Sleep on your back if possible to avoid crushing the lashes.",
        "Book infills every 2-3 weeks to keep them looking full.",
      ],
    },
    {
      id: "brows",
      title: "Brow Lamination Aftercare",
      content: [
        "Keep brows completely dry for the first 24 hours.",
        "Avoid touching or rubbing the brow area.",
        "Do not apply makeup to the brows for 24 hours.",
        "Brush brows daily into your desired shape.",
        "Apply a nourishing brow serum or castor oil daily after 48 hours to keep hairs hydrated.",
      ],
    },
  ];

  const filteredData = aftercareData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.some((point) =>
        point.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl mb-2" style={{ color: 'var(--text-primary)' }}>
          Aftercare
        </h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Keep your treatments looking perfect.
        </p>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5" style={{ color: 'var(--text-muted)' }} />
        </div>
        <input
          type="text"
          placeholder="Search aftercare advice..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:border-transparent shadow-sm"
          style={{ 
            backgroundColor: 'var(--input-bg)', 
            borderColor: 'var(--card-border)',
            color: 'var(--text-primary)',
            '--tw-ring-color': 'var(--color-amethyst-700)'
          } as React.CSSProperties}
        />
      </div>

      <div className="space-y-4">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div key={item.id} className="glass-card overflow-hidden">
              <button
                onClick={() => toggleExpand(item.id)}
                className="w-full px-6 py-4 flex justify-between items-center bg-transparent transition-colors"
                style={{ backgroundColor: expanded === item.id ? 'var(--card-border)' : 'transparent' }}
              >
                <h3 className="text-xl" style={{ color: 'var(--text-primary)' }}>
                  {item.title}
                </h3>
                {expanded === item.id ? (
                  <ChevronUp size={20} style={{ color: 'var(--text-muted)' }} />
                ) : (
                  <ChevronDown size={20} style={{ color: 'var(--text-muted)' }} />
                )}
              </button>

              {expanded === item.id && (
                <div className="px-6 pb-5 pt-2 border-t animate-in slide-in-from-top-2" style={{ borderColor: 'var(--card-border)' }}>
                  <ul className="space-y-3">
                    {item.content.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full mt-2 mr-3 shrink-0" style={{ backgroundColor: 'var(--color-amethyst-700)' }}></span>
                        <span className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12 rounded-2xl border border-dashed" style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--card-border)' }}>
            <p className="font-medium" style={{ color: 'var(--text-secondary)' }}>
              No results found for "{searchTerm}"
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-2 text-sm underline underline-offset-4"
              style={{ color: 'var(--text-muted)' }}
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
