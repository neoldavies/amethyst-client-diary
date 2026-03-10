import { MessageCircle } from "lucide-react";

export default function PriorityAccess() {
  const handleWhatsApp = () => {
    const phoneNumber = "441427617211"; // UK format without the leading 0
    const message = encodeURIComponent("Hi Amethyst, checking for any Priority Access gaps this week!");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="glass-card p-6 text-center space-y-4">
      <div className="flex justify-center mb-2">
        <div className="p-3 rounded-full" style={{ backgroundColor: 'var(--color-amethyst-600)', color: 'white' }}>
          <MessageCircle size={28} />
        </div>
      </div>
      
      <h3 className="text-xl font-medium" style={{ color: 'var(--text-primary)' }}>
        Priority Access
      </h3>
      
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        Looking for a last-minute appointment? Message us directly to check for any cancellations or priority gaps this week.
      </p>
      
      <button
        onClick={handleWhatsApp}
        className="w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98]"
        style={{ 
          backgroundColor: '#25D366', // WhatsApp brand color
          color: 'white',
          boxShadow: '0 4px 14px 0 rgba(37, 211, 102, 0.39)'
        }}
      >
        <MessageCircle size={18} />
        Message on WhatsApp
      </button>
    </div>
  );
}
