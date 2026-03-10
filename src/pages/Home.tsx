import { useState, useEffect } from "react";
import { parseAppointmentText } from "@/src/lib/dateParser";
import { Calendar, Clock, CheckCircle2, AlertCircle, PlusCircle } from "lucide-react";
import PriorityAccess from "../components/PriorityAccess";

export default function Home() {
  const [appointment, setAppointment] = useState<{
    dateStr: string;
    timeStr: string;
  } | null>(null);
  const [pasteText, setPasteText] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [clipboardPrompt, setClipboardPrompt] = useState<{
    text: string;
    parsed: { dateStr: string; timeStr: string };
  } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("amethyst_appointment");
    if (saved) {
      try {
        setAppointment(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved appointment", e);
      }
    }
  }, []);

  useEffect(() => {
    const handleFocus = async () => {
      try {
        const text = await navigator.clipboard.readText();
        if (text && text.toLowerCase().includes("amethyst")) {
          const parsed = parseAppointmentText(text);
          if (
            parsed &&
            (parsed.dateStr !== "Unknown Date" || parsed.timeStr !== "Unknown Time")
          ) {
            // Check if it's already saved to avoid annoying the user
            const currentSaved = localStorage.getItem("amethyst_appointment");
            if (currentSaved) {
              const currentParsed = JSON.parse(currentSaved);
              if (currentParsed.dateStr === parsed.dateStr && currentParsed.timeStr === parsed.timeStr) {
                return;
              }
            }
            setClipboardPrompt({ text, parsed });
          }
        }
      } catch (err) {
        // Ignore clipboard read errors (e.g., permissions denied)
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const handleParse = () => {
    if (!pasteText.trim()) return;

    const parsed = parseAppointmentText(pasteText);
    if (
      parsed &&
      (parsed.dateStr !== "Unknown Date" || parsed.timeStr !== "Unknown Time")
    ) {
      setAppointment(parsed);
      localStorage.setItem("amethyst_appointment", JSON.stringify(parsed));
      setStatus("success");
      setPasteText("");
      setTimeout(() => setStatus("idle"), 3000);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const handleSaveFromClipboard = () => {
    if (clipboardPrompt) {
      setAppointment(clipboardPrompt.parsed);
      localStorage.setItem("amethyst_appointment", JSON.stringify(clipboardPrompt.parsed));
      setStatus("success");
      setClipboardPrompt(null);
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const handleClear = () => {
    setAppointment(null);
    localStorage.removeItem("amethyst_appointment");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <section className="glass-card p-6">
        <h2 className="text-2xl mb-4" style={{ color: 'var(--text-primary)' }}>
          Your Next Appointment
        </h2>

        {appointment ? (
          <div className="rounded-xl p-5 border" style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--card-border)' }}>
            <div className="flex items-center space-x-3 mb-3">
              <Calendar size={20} style={{ color: 'var(--text-muted)' }} />
              <span className="text-lg font-medium capitalize" style={{ color: 'var(--text-primary)' }}>
                {appointment.dateStr || "Date TBC"}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock size={20} style={{ color: 'var(--text-muted)' }} />
              <span className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
                {appointment.timeStr || "Time TBC"}
              </span>
            </div>

            <button
              onClick={handleClear}
              className="mt-5 text-sm underline underline-offset-4 transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              Clear Appointment
            </button>
          </div>
        ) : (
          <div className="text-center py-8 rounded-xl border border-dashed" style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--card-border)' }}>
            <p className="font-medium" style={{ color: 'var(--text-secondary)' }}>
              No upcoming appointments
            </p>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
              Paste your confirmation below to save it.
            </p>
          </div>
        )}
      </section>

      <PriorityAccess />

      <section className="glass-card p-6">
        <h3 className="text-xl mb-3" style={{ color: 'var(--text-primary)' }}>
          Save Confirmation
        </h3>
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
          Paste your text or WhatsApp message from Amethyst to automatically
          save the date and time.
        </p>

        {clipboardPrompt && (
          <div className="mb-4 p-3 rounded-xl border flex items-center justify-between animate-in slide-in-from-bottom-2" style={{ backgroundColor: 'var(--color-amethyst-600)', borderColor: 'var(--color-amethyst-700)', color: 'white' }}>
            <div className="text-sm font-medium">
              Found a new appointment!
            </div>
            <button
              onClick={handleSaveFromClipboard}
              className="flex items-center gap-1.5 text-xs font-semibold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors"
            >
              <PlusCircle size={14} />
              Click to save
            </button>
          </div>
        )}

        <textarea
          value={pasteText}
          onChange={(e) => setPasteText(e.target.value)}
          placeholder="e.g. 'See you on Tuesday at 2pm for your BIAB infill!'"
          className="w-full h-28 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:border-transparent resize-none text-sm"
          style={{ 
            backgroundColor: 'var(--input-bg)', 
            borderColor: 'var(--card-border)',
            color: 'var(--text-primary)',
            '--tw-ring-color': 'var(--color-amethyst-700)'
          } as React.CSSProperties}
        />

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={handleParse}
            disabled={!pasteText.trim()}
            className="btn-primary shadow-md"
          >
            Save Details
          </button>

          {status === "success" && (
            <span className="flex items-center text-emerald-500 text-sm font-medium animate-in slide-in-from-right-2">
              <CheckCircle2 size={16} className="mr-1" /> Saved
            </span>
          )}
          {status === "error" && (
            <span className="flex items-center text-rose-500 text-sm font-medium animate-in slide-in-from-right-2">
              <AlertCircle size={16} className="mr-1" /> Couldn't find date
            </span>
          )}
        </div>
      </section>
    </div>
  );
}
