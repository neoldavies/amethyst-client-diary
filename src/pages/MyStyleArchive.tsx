import { useState, useEffect } from "react";
import { Calendar, User, FileText, Save, Trash2 } from "lucide-react";

interface ArchiveEntry {
  id: string;
  date: string;
  technician: string;
  notes: string;
}

const TECHNICIANS = ["Roz", "Lindsay", "Sorcha"];

export default function MyStyleArchive() {
  const [entries, setEntries] = useState<ArchiveEntry[]>([]);
  const [date, setDate] = useState("");
  const [technician, setTechnician] = useState(TECHNICIANS[0]);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("amethyst_style_archive");
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse archive entries", e);
      }
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !notes) return;

    const newEntry: ArchiveEntry = {
      id: crypto.randomUUID(),
      date,
      technician,
      notes,
    };

    const updatedEntries = [newEntry, ...entries].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    setEntries(updatedEntries);
    localStorage.setItem("amethyst_style_archive", JSON.stringify(updatedEntries));
    
    // Reset form
    setDate("");
    setNotes("");
    setTechnician(TECHNICIANS[0]);
  };

  const handleDelete = (id: string) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem("amethyst_style_archive", JSON.stringify(updatedEntries));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl mb-2" style={{ color: 'var(--text-primary)' }}>
          My Style Archive
        </h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Save your favourite looks and treatment notes.
        </p>
      </div>

      <form onSubmit={handleSave} className="glass-card p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <Calendar size={16} style={{ color: 'var(--color-amethyst-600)' }} />
            Service Date
          </label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:border-transparent transition-colors"
            style={{ 
              backgroundColor: 'var(--input-bg)', 
              borderColor: 'var(--card-border)',
              color: 'var(--text-primary)',
              '--tw-ring-color': 'var(--color-amethyst-700)'
            } as React.CSSProperties}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <User size={16} style={{ color: 'var(--color-amethyst-600)' }} />
            Technician
          </label>
          <select
            value={technician}
            onChange={(e) => setTechnician(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:border-transparent transition-colors appearance-none"
            style={{ 
              backgroundColor: 'var(--input-bg)', 
              borderColor: 'var(--card-border)',
              color: 'var(--text-primary)',
              '--tw-ring-color': 'var(--color-amethyst-700)'
            } as React.CSSProperties}
          >
            {TECHNICIANS.map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <FileText size={16} style={{ color: 'var(--color-amethyst-600)' }} />
            Style Notes & Details
          </label>
          <textarea
            required
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g., BIAB with French tip, used 'Marshmallow' base..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:border-transparent transition-colors resize-none"
            style={{ 
              backgroundColor: 'var(--input-bg)', 
              borderColor: 'var(--card-border)',
              color: 'var(--text-primary)',
              '--tw-ring-color': 'var(--color-amethyst-700)'
            } as React.CSSProperties}
          />
        </div>

        <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-3 mt-2">
          <Save size={18} />
          Save to Archive
        </button>
      </form>

      <div className="space-y-4">
        <h3 className="text-xl font-medium px-1" style={{ color: 'var(--text-primary)' }}>
          Previous Styles
        </h3>
        
        {entries.length === 0 ? (
          <div className="text-center py-12 rounded-2xl border border-dashed" style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--card-border)' }}>
            <p className="font-medium" style={{ color: 'var(--text-muted)' }}>
              Your archive is empty.
            </p>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
              Save your first treatment above!
            </p>
          </div>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="glass-card p-5 relative group">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-sm font-medium px-2.5 py-1 rounded-full" style={{ backgroundColor: 'var(--card-border)', color: 'var(--text-primary)' }}>
                    {new Date(entry.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="p-2 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-rose-500/10 text-rose-500"
                  aria-label="Delete entry"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              
              <p className="text-sm mb-3 whitespace-pre-wrap" style={{ color: 'var(--text-secondary)' }}>
                {entry.notes}
              </p>
              
              <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--color-amethyst-600)' }}>
                <User size={14} />
                <span>{entry.technician}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
