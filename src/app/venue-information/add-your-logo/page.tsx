"use client";
import React, { useState, useCallback } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Form from "@/components/form/Form";
import Button from "@/components/ui/button/Button";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import Image from 'next/image';

export default function AddYourLogoPage() {
  const router = useRouter();
  const [logo, setLogo] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setLogo(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/svg+xml': []
    },
    maxFiles: 1, 
    
    maxSize: 5 * 1024 * 1024 // 5MB
  });

  return (
    <div>
      <PageBreadcrumb pageTitle="Add Your Logo" />
      <div className="flex justify-center items-start min-h-[60vh] mt-8">
        <div className="w-full max-w-4xl">
          <ComponentCard title="Add Your Logo" className="w-full">
            <Form onSubmit={() => {}}>
              <div className="mb-6">
                <div className="text-sm text-gray-700 font-semibold mb-2">
                  If your venue has a logo, please add it here.
                </div>
                <div className="text-sm text-gray-700 mb-4">
                  You can update your logo at any time. Your logo will be used on your venue&apos;s profile page, menu, search engines, maps and your marketing messages.
                </div>
              </div>
              <div className="flex justify-center w-full mb-2">
                {logo ? (
                  <div className="relative rounded-2xl border border-gray-200 bg-white shadow-sm p-4 flex items-center w-full gap-6">
                    <div className="flex h-24 w-24 items-center justify-center rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        className="h-20 w-20 object-contain rounded-lg cursor-pointer"
                        src={logo}
                        alt="Logo Preview"
                        width={80}
                        height={80}
                        onClick={() => setShowPreview(true)}
                      />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="flex flex-col mb-1">
                        <span className="text-base font-semibold text-gray-800 mb-2">Logo Preview</span>
                        <span className="text-xs text-gray-500 mb-2">
                          PNG, JPG, SVG up to 5MB • Recommended size 400×400px
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            title="Change Logo"
                            onClick={() => {
                              const input = document.querySelector('input[type="file"]') as HTMLInputElement | null;
                              if (input) input.click();
                            }}
                            className="flex items-center justify-center h-7 w-7 rounded-lg text-gray-700 hover:text-blue-600 transition-colors"
                          >
                            <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path d="M12 20h9" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                          <button
                            type="button"
                            title="Remove Logo"
                            onClick={e => {
                              e.stopPropagation();
                              setLogo(null);
                            }}
                            className="flex items-center justify-center h-7 w-7 rounded-lg text-gray-700 hover:text-blue-600 transition-colors"
                          >
                            <svg 
                              className="w-4 h-4" 
                              viewBox="0 0 1024 1024" 
                              version="1.1" 
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M317.44 92.16H307.2c5.632 0 10.24-4.608 10.24-10.24v10.24h389.12V81.92c0 5.632 4.608 10.24 10.24 10.24h-10.24V184.32H798.72V81.92c0-45.17888-36.74112-81.92-81.92-81.92H307.2c-45.17888 0-81.92 36.74112-81.92 81.92v102.4h92.16V92.16zM962.56 184.32H61.44c-22.65088 0-40.96 18.30912-40.96 40.96v40.96c0 5.632 4.608 10.24 10.24 10.24h77.312l31.62112 669.45024A81.98144 81.98144 0 0 0 221.45024 1024h581.09952a81.8176 81.8176 0 0 0 81.79712-78.09024L915.968 276.48H993.28c5.632 0 10.24-4.608 10.24-10.24v-40.96c0-22.65088-18.30912-40.96-40.96-40.96z m-169.86112 747.52H231.30112l-30.98624-655.36H823.7056l-30.98624 655.36z" fill="currentColor" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <input {...getInputProps()} className="hidden" />
                    </div>
                  </div>
                ) : (
                  <div
                    {...getRootProps()}
                    className={`flex flex-col items-center justify-center gap-2 w-full p-4 rounded-2xl border-2 border-dashed border-blue-400 bg-blue-50 cursor-pointer transition-colors mb-2 ${
                      isDragActive ? "bg-blue-100" : "hover:bg-blue-100"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <Image
                      src="/images/icons/upload.svg"
                      alt="Upload"
                      className="w-10 h-10 mb-2"
                      width={40}
                      height={40}
                    />
                    <span className="text-sm text-gray-700 text-center">
                      Drag your logo here or click to upload
                    </span>
                    <span className="text-xs text-gray-500 text-center">
                      JPG, PNG, SVG up to 5MB • Recommended size 400×400px
                    </span>
                  </div>
                )}
              </div>
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => router.push("/venue-information/venue-photographs")}
                >
                  Previous
                </Button>
                <Button
                  className="px-8"
                  onClick={() => router.push("/venue-information/hours-of-operation")}
                >
                  Save & Continue
                </Button>
              </div>
            </Form>
          </ComponentCard>
        </div>
      </div>
      {showPreview && logo && (
        <div className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-black/70" onClick={() => setShowPreview(false)}>
          <div className="relative" onClick={e => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 text-white text-2xl z-10"
              onClick={() => setShowPreview(false)}
              title="Close"
            >
              &times;
            </button>
            <Image src={logo} alt="Logo Preview Large" className="max-w-[90vw] max-h-[80vh] rounded-2xl shadow-2xl bg-white" width={400} height={400} />
          </div>
        </div>
      )}
    </div>
  );
}
