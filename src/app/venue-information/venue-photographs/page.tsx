"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Form from "@/components/form/Form";
import Button from "@/components/ui/button/Button";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import ReactDOM from 'react-dom';

// Define image/video type
interface Photo {
  id: string;
  url: string;
  type: 'image' | 'video';
  category?: string;
}

// Define category type
interface Category {
  id: string;
  name: string;
  count: number;
}

function VenuePhotographsGallery() {
  // State management
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      type: "image",
      category: "Interior"
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
      type: "image",
      category: "Food & Drinks"
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae",
      type: "image",
      category: "Exterior"
    }
  ]);

  const [categories] = useState<Category[]>([
    { id: "all", name: "All Photos", count: 24 },
    { id: "interior", name: "Interior", count: 8 },
    { id: "exterior", name: "Exterior", count: 6 },
    { id: "food", name: "Food & Drinks", count: 10 },
    { id: "events", name: "Events", count: 0 }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const imageRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle file upload
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const categoryName = selectedCategory === "all" 
      ? undefined 
      : categories.find(cat => cat.id === selectedCategory)?.name;

    const newPhotos = acceptedFiles.map(file => {
      const url = URL.createObjectURL(file);
      const type: 'image' | 'video' = file.type.startsWith('video') ? 'video' : 'image';
      return {
        id: Math.random().toString(36).substr(2, 9),
        url,
        type,
        category: categoryName
      };
    });
    setPhotos(prev => [...prev, ...newPhotos]);
  }, [selectedCategory, categories]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'video/*': ['.mp4', '.mov']
    },
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  // Delete image/video
  const handleDeletePhoto = (photoId: string) => {
    setPhotos(prev => prev.filter(photo => photo.id !== photoId));
  };

  // Get images/videos of the current category
  const filteredPhotos = selectedCategory === "all" 
    ? photos 
    : photos.filter(photo => photo.category === categories.find(cat => cat.id === selectedCategory)?.name);

  // Update category count
  const getCategoryCount = (categoryId: string) => {
    if (categoryId === "all") {
      return photos.length;
    }
    const categoryName = categories.find(cat => cat.id === categoryId)?.name;
    return photos.filter(photo => photo.category === categoryName).length;
  };

  // Modal navigation handlers
  const openPreview = (idx: number) => setPreviewIndex(idx);
  const closePreview = () => setPreviewIndex(null);
  const showPrev = () => setPreviewIndex(i => (i !== null && i > 0 ? i - 1 : i));
  const showNext = () => setPreviewIndex(i => (i !== null && i < filteredPhotos.length - 1 ? i + 1 : i));

  return (
    <div className="flex w-full gap-6">
      {/* Left sidebar for categories */}
      <div className="w-48 flex-none flex flex-col items-start gap-2 rounded-2xl border border-gray-200 bg-white shadow-sm p-4">
        <span className="text-sm font-semibold mb-2">Categories</span>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`inline-block rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              selectedCategory === category.id
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category.name} ({getCategoryCount(category.id)})
          </button>
        ))}
      </div>

      {/* Right content area */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Top upload area */}
        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-8 py-8 mb-2 transition-colors ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-blue-400 bg-blue-50 hover:bg-blue-100"
          }`}
        >
          <input {...getInputProps()} />
          <img src="/images/icons/upload.svg" alt="Upload" className="w-10 h-10 mb-2" />
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="text-sm text-gray-700 text-center">
              {isDragActive
                ? "Drop the files here..."
                : "Drag photos or videos here or click to upload"}
            </span>
            <span className="text-xs text-gray-500 text-center">
              Maximum 10MB per file • JPG, PNG, MP4, MOV formats
            </span>
            {selectedCategory !== "all" && (
              <span className="text-xs text-blue-600 mt-1">
                Uploading to: {categories.find(cat => cat.id === selectedCategory)?.name}
              </span>
            )}
          </div>
        </div>

        {/* Image/video card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, idx) => (
            <div key={photo.id} className="relative rounded-2xl border border-gray-200 bg-white shadow-sm p-4 flex flex-col items-center">
              {/* Image or video preview */}
              {photo.type === 'image' ? (
                <img
                  className="h-32 w-full object-cover rounded-lg mb-3 cursor-pointer"
                  src={photo.url}
                  alt=""
                  onClick={() => openPreview(idx)}
                />
              ) : (
                playingId === photo.id ? (
                  <div className="relative w-full h-32 mb-3 flex items-center justify-center">
                    <video
                      src={photo.url}
                      controls
                      autoPlay
                      className="h-32 w-full object-cover rounded-lg"
                      onEnded={() => setPlayingId(null)}
                    />
                    {/* Fullscreen icon at bottom-right */}
                    <button
                      type="button"
                      className="absolute bottom-2 right-2 bg-black/60 hover:bg-black/80 rounded-full p-1 text-white"
                      onClick={e => {
                        e.stopPropagation();
                        openPreview(idx);
                      }}
                      title="Fullscreen preview"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 3H5a2 2 0 0 0-2 2v3m0 8v3a2 2 0 0 0 2 2h3m8-18h3a2 2 0 0 1 2 2v3m0 8v3a2 2 0 0 1-2 2h-3" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div
                    className="relative w-full h-32 mb-3 flex items-center justify-center cursor-pointer"
                    onClick={() => setPlayingId(photo.id)}
                  >
                    <video
                      src={photo.url}
                      className="h-32 w-full object-cover rounded-lg"
                      preload="metadata"
                      poster=""
                      muted
                    />
                    <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="inline-flex items-center justify-center w-12 h-12 bg-black bg-opacity-50 rounded-full">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <polygon points="7,5 15,10 7,15" />
                        </svg>
                      </span>
                    </span>
                  </div>
                )
              )}
              <div className="flex items-center justify-between w-full mb-2">
                {photo.category && (
                  <span className="inline-block rounded-full bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1">
                    {photo.category}
                  </span>
                )}
                <button 
                  onClick={() => handleDeletePhoto(photo.id)}
                  className={`ml-2 text-gray-700 hover:text-red-500 transition-colors ${!photo.category ? 'ml-auto' : ''}`}
                >
                  <svg 
                    className="w-3 h-3" 
                    viewBox="0 0 1024 1024" 
                    version="1.1" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M317.44 92.16H307.2c5.632 0 10.24-4.608 10.24-10.24v10.24h389.12V81.92c0 5.632 4.608 10.24 10.24 10.24h-10.24V184.32H798.72V81.92c0-45.17888-36.74112-81.92-81.92-81.92H307.2c-45.17888 0-81.92 36.74112-81.92 81.92v102.4h92.16V92.16zM962.56 184.32H61.44c-22.65088 0-40.96 18.30912-40.96 40.96v40.96c0 5.632 4.608 10.24 10.24 10.24h77.312l31.62112 669.45024A81.98144 81.98144 0 0 0 221.45024 1024h581.09952a81.8176 81.8176 0 0 0 81.79712-78.09024L915.968 276.48H993.28c5.632 0 10.24-4.608 10.24-10.24v-40.96c0-22.65088-18.30912-40.96-40.96-40.96z m-169.86112 747.52H231.30112l-30.98624-655.36H823.7056l-30.98624 655.36z" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Fullscreen preview modal using Portal */}
        {typeof window !== 'undefined' && previewIndex !== null && ReactDOM.createPortal(
          <div className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-black bg-opacity-70">
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-2 text-white"
              onClick={showPrev}
              disabled={previewIndex === 0}
              style={{ opacity: previewIndex === 0 ? 0.3 : 1 }}
              aria-label="Previous"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="relative max-w-3xl w-full mx-4 bg-transparent flex flex-col items-center">
              <button
                className="absolute top-2 right-2 text-white text-3xl z-10"
                onClick={closePreview}
                title="Close"
              >
                &times;
              </button>
              {filteredPhotos[previewIndex]?.type === 'image' ? (
                <div className="relative">
                  <img
                    src={filteredPhotos[previewIndex].url}
                    alt="Preview"
                    className="max-h-[80vh] rounded-xl shadow-lg"
                  />
                </div>
              ) : (
                <div className="relative">
                  <video
                    src={filteredPhotos[previewIndex].url}
                    controls
                    autoPlay
                    className="max-h-[80vh] rounded-xl shadow-lg bg-black"
                  />
                </div>
              )}
              {/* Dot indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {filteredPhotos.map((_, i) => (
                  <button
                    key={i}
                    className={`w-3 h-3 rounded-full ${i === previewIndex ? 'bg-white' : 'bg-gray-400'} transition`}
                    onClick={() => setPreviewIndex(i)}
                    aria-label={`Go to item ${i + 1}`}
                  />
                ))}
              </div>
            </div>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-2 text-white"
              onClick={showNext}
              disabled={previewIndex === filteredPhotos.length - 1}
              style={{ opacity: previewIndex === filteredPhotos.length - 1 ? 0.3 : 1 }}
              aria-label="Next"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>,
          document.body
        )}
      </div>
    </div>
  );
}

export default function VenuePhotographsPage() {
  const router = useRouter();

  return (
    <div>
      <PageBreadcrumb pageTitle="Venue Photographs" />
      <div className="flex justify-center items-start min-h-[60vh] mt-8">
        <div className="w-full max-w-4xl">
          <ComponentCard title="Venue Photographs" className="w-full">
            <Form onSubmit={() => {}}>
              <div className="mb-6">
                <div className="text-sm text-gray-700 font-semibold mb-2">A picture tells a thousand words.</div>
                <div className="text-sm text-gray-700 mb-2">
                  This is where you add as many photos as you wish that will be displayed on your venue's online profile along with a short video (if you have one) that will best illustrate your venue to your customers.
                </div>
                <div className="text-sm text-gray-500 italic">
                  *We suggest adding Exterior and Interior photos (you can update these at any time).
                </div>
              </div>
              <VenuePhotographsGallery />
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => router.push("/venue-information/cuisine-style")}
                >
                  Previous
                </Button>
                <Button
                  className="px-8"
                  onClick={() => router.push("/venue-information/add-your-logo")}
                >
                  Save & Continue
                </Button>
              </div>
            </Form>
          </ComponentCard>
        </div>
      </div>
    </div>
  );
}

