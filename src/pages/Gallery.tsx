import { useState, useEffect, useRef, ChangeEvent } from "react";
import { Upload, Trash2, ImagePlus } from "lucide-react";

interface GalleryImage {
  id: string;
  dataUrl: string;
  date: string;
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("amethyst_gallery");
    if (saved) {
      try {
        setImages(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse gallery", e);
      }
    }
  }, []);

  const saveImages = (newImages: GalleryImage[]) => {
    setImages(newImages);
    try {
      localStorage.setItem("amethyst_gallery", JSON.stringify(newImages));
    } catch (e) {
      alert("Storage full! Please delete some older photos.");
    }
  };

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.7));
        };
        img.onerror = (error) => reject(error);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const file = files[0];
      const compressedDataUrl = await compressImage(file);

      const newImage: GalleryImage = {
        id: Date.now().toString(),
        dataUrl: compressedDataUrl,
        date: new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      };

      saveImages([newImage, ...images]);
    } catch (error) {
      console.error("Error processing image", error);
      alert("Failed to process image.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this photo?")) {
      saveImages(images.filter((img) => img.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl mb-2" style={{ color: 'var(--text-primary)' }}>
          Private Gallery
        </h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Track your nail growth or save design ideas.
        </p>
      </div>

      <div className="glass-card p-6 text-center">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileUpload}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="w-full py-12 border-2 border-dashed rounded-xl transition-colors flex flex-col items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ borderColor: 'var(--card-border-hover)', backgroundColor: 'var(--input-bg)' }}
        >
          <div className="p-3 rounded-full" style={{ backgroundColor: 'var(--card-border)', color: 'var(--color-amethyst-700)' }}>
            <ImagePlus size={24} />
          </div>
          <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
            {isUploading ? "Processing..." : "Tap to upload a photo"}
          </span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Saved locally on your device only
          </span>
        </button>
      </div>

      {images.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative group rounded-2xl overflow-hidden shadow-sm border aspect-square"
              style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--input-bg)' }}
            >
              <img
                src={img.dataUrl}
                alt="Nail progress"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                <div className="flex justify-between items-center">
                  <span className="text-white text-xs font-medium drop-shadow-md">
                    {img.date}
                  </span>
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="p-1.5 bg-white/20 hover:bg-rose-500/80 rounded-full text-white backdrop-blur-sm transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              {/* Mobile always-visible date badge */}
              <div className="absolute bottom-2 left-2 md:hidden">
                <span className="bg-black/40 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full font-medium">
                  {img.date}
                </span>
              </div>
              <button
                onClick={() => handleDelete(img.id)}
                className="absolute top-2 right-2 p-1.5 bg-black/40 backdrop-blur-sm rounded-full text-white md:hidden"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="font-medium" style={{ color: 'var(--text-muted)' }}>
            Your gallery is empty.
          </p>
        </div>
      )}
    </div>
  );
}
