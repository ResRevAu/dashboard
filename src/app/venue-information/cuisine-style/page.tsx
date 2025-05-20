"use client";
import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CuisineCard from "@/components/cards/card-with-image/CuisineCard";
import ComponentCard from "@/components/common/ComponentCard";
import Form from "@/components/form/Form";
import Button from "@/components/ui/button/Button";
import { useRouter } from "next/navigation";

const cuisines = [
  { value: "mixed", label: "Mixed", image: "mixed" },
  { value: "italian", label: "Italian", image: "it" },
  { value: "chinese", label: "Chinese", image: "cn" },
  { value: "australian", label: "Australian", image: "au" },
  { value: "indian", label: "Indian", image: "in" },
  { value: "thai", label: "Thai", image: "th" },
  { value: "japanese", label: "Japanese", image: "jp" },
  { value: "mexican", label: "Mexican", image: "mx" },
  { value: "middle-eastern", label: "Middle East", image: "middle-eastern" },
  { value: "greek", label: "Greek", image: "gr" },
  { value: "american", label: "American", image: "us" },
  { value: "spanish", label: "Spanish", image: "es" },
  { value: "french", label: "French", image: "fr" },
  { value: "indonesian", label: "Indonesian", image: "id" },
  { value: "english", label: "English", image: "gb" },
  { value: "philippines", label: "Philippines", image: "ph" },
  { value: "singapore", label: "Singapore", image: "sg" },
  { value: "vietnamese", label: "Vietnamese", image: "vn" },
];

export default function CuisineStylePage() {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  const toggleCuisine = (value: string) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Cuisine Style" />
      <div className="flex justify-center items-start min-h-[60vh] mt-8">
        <div className="w-full max-w-4xl">
          <ComponentCard title="Cuisine Style" className="w-full">
            <Form onSubmit={() => {}}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {cuisines.map((cuisine) => (
                  <CuisineCard
                    key={cuisine.value}
                    image={cuisine.image}
                    title={cuisine.label}
                    selected={selected.includes(cuisine.value)}
                    onSelect={() => toggleCuisine(cuisine.value)}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => router.push("/venue-information/venue-type")}
                >
                  Previous
                </Button>
                <Button
                  className="px-8"
                  onClick={() => router.push("/venue-information/venue-photographs")}
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