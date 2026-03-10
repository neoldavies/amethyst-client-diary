import { useState, useEffect } from "react";
import { Phone, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";

const DEFAULT_CATEGORIES = [
  {
    title: "BIAB & Gel",
    services: [
      {
        name: "BIAB Overlay",
        price: "£35",
        description: "Builder gel on natural nails for strength.",
      },
      {
        name: "BIAB Infill",
        price: "£30",
        description: "Maintenance for your BIAB overlay.",
      },
      {
        name: "Gel Polish (Hands or Toes)",
        price: "£25",
        description: "Long-lasting gel colour.",
      },
      {
        name: "Gel Removal & Reapply",
        price: "£30",
        description: "Safe removal and fresh gel application.",
      },
    ],
  },
  {
    title: "Lashes & Brows",
    services: [
      {
        name: "Lash Lift & Tint",
        price: "£40",
        description: "Enhance your natural lashes.",
      },
      {
        name: "Classic Lash Extensions",
        price: "£50",
        description: "Individual lashes for a natural look.",
      },
      {
        name: "Hybrid Lash Extensions",
        price: "£60",
        description: "A mix of classic and volume lashes.",
      },
      {
        name: "Brow Lamination",
        price: "£35",
        description: "Fuller, fluffier brows.",
      },
      {
        name: "Brow Wax & Tint",
        price: "£15",
        description: "Shape and define your brows.",
      },
    ],
  },
  {
    title: "Waxing",
    services: [
      {
        name: "Lip or Chin Wax",
        price: "£8",
        description: "Quick and gentle hair removal.",
      },
      {
        name: "Underarm Wax",
        price: "£12",
        description: "Smooth underarms.",
      },
      {
        name: "Half Leg Wax",
        price: "£20",
        description: "Hair removal from knee down.",
      },
      {
        name: "Full Leg Wax",
        price: "£30",
        description: "Complete leg hair removal.",
      },
    ],
  },
];

export default function PriceList() {
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [isFetching, setIsFetching] = useState(false);
  const [openCategory, setOpenCategory] = useState<string>(DEFAULT_CATEGORIES[0].title);

  useEffect(() => {
    let shouldFetch = true;
    const cached = localStorage.getItem("amethyst_prices");

    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        
        // Handle new cache format with timestamp
        if (parsed && !Array.isArray(parsed) && parsed.data && parsed.timestamp) {
          setCategories(parsed.data);
          
          // Check if cache is less than 24 hours old
          const isFresh = Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000;
          if (isFresh) {
            shouldFetch = false;
          }
        } 
        // Handle old cache format (just array)
        else if (Array.isArray(parsed)) {
          setCategories(parsed);
          // Will still fetch to update to the new format with timestamp
        }
      } catch (e) {
        console.error("Failed to parse cached prices", e);
      }
    }
    
    if (shouldFetch) {
      fetchPrices();
    }
  }, []);

  const fetchPrices = async () => {
    setIsFetching(true);
    try {
      // Note: Direct scraping often hits CORS limits. In a production environment,
      // it is recommended to use a backend proxy or serverless function to fetch this data.
      const response = await fetch("https://www.amethystnails.co.uk/index.html");
      if (!response.ok) throw new Error("Network response was not ok");
      
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      
      const newCategories: typeof DEFAULT_CATEGORIES = [];
      
      // Generic scraping logic based on common price list structures
      const sections = doc.querySelectorAll('.price-section, .treatment-category, .services-list');
      if (sections.length > 0) {
        sections.forEach(section => {
          const title = section.querySelector('h2, h3')?.textContent?.trim() || "Treatments";
          const services: any[] = [];
          
          const items = section.querySelectorAll('.service-item, .treatment, li');
          items.forEach(item => {
            const name = item.querySelector('.name, .title, h4')?.textContent?.trim();
            const price = item.querySelector('.price, .cost, span')?.textContent?.trim();
            const description = item.querySelector('.description, .desc, p')?.textContent?.trim() || "";
            
            if (name && price && price.includes('£')) {
              services.push({ name, price, description });
            }
          });
          
          if (services.length > 0) {
            newCategories.push({ title, services });
          }
        });
      }
      
      if (newCategories.length > 0) {
        setCategories(newCategories);
        localStorage.setItem("amethyst_prices", JSON.stringify({
          data: newCategories,
          timestamp: Date.now()
        }));
      } else {
        throw new Error("Could not parse pricing structure from live site");
      }
    } catch (error) {
      console.warn("Using fallback prices due to fetch error or CORS:", error);
      // Silently reverts to DEFAULT_CATEGORIES (or stale cache) without a permanent spinner
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl mb-2" style={{ color: 'var(--text-primary)' }}>
          Price List
        </h2>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Premium treatments tailored for you.
        </p>
        <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-amethyst-600)' }}>
          Expert Technicians: Roz, Lindsay & Sorcha
        </p>
        {isFetching && (
          <div className="flex items-center justify-center mt-3 text-xs" style={{ color: 'var(--text-muted)' }}>
            <RefreshCw size={12} className="animate-spin mr-1.5" /> Updating prices...
          </div>
        )}
      </div>

      {categories.map((category) => (
        <section key={category.title} className="glass-card overflow-hidden">
          <button
            onClick={() => setOpenCategory(openCategory === category.title ? "" : category.title)}
            className="w-full px-6 py-5 flex justify-between items-center transition-colors"
          >
            <h3 className="text-2xl" style={{ color: 'var(--text-primary)' }}>
              {category.title}
            </h3>
            {openCategory === category.title ? (
              <ChevronUp size={24} style={{ color: 'var(--text-muted)' }} />
            ) : (
              <ChevronDown size={24} style={{ color: 'var(--text-muted)' }} />
            )}
          </button>

          {openCategory === category.title && (
            <div className="px-6 pb-6 border-t pt-5 animate-in slide-in-from-top-2" style={{ borderColor: 'var(--card-border)' }}>
              <div className="space-y-6">
                {category.services.map((service) => (
                  <div
                    key={service.name}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 last:border-0 last:pb-0"
                    style={{ borderColor: 'var(--card-border)' }}
                  >
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-medium text-lg" style={{ color: 'var(--text-primary)' }}>
                          {service.name}
                        </h4>
                        <span className="font-serif text-xl ml-4" style={{ color: 'var(--text-secondary)' }}>
                          {service.price}
                        </span>
                      </div>
                      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                        {service.description}
                      </p>
                    </div>

                    <a
                      href="tel:01427617211"
                      className="btn-primary shadow-md shrink-0"
                    >
                      <Phone size={16} className="mr-2" />
                      Book
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
