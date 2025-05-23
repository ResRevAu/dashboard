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
  { value: "australian", label: "Australian", image: "au" },
  { value: "canadian", label: "Canadian", image: "ca" },
  { value: "chinese", label: "Chinese", image: "cn" },
  { value: "czech", label: "Czech", image: "cz" },
  { value: "french", label: "French", image: "fr" },
  { value: "hong-kong", label: "Hong Kong", image: "hk" },
  { value: "indian", label: "Indian", image: "in" },
  { value: "indonesian", label: "Indonesian", image: "id" },
  { value: "italian", label: "Italian", image: "it" },
  { value: "japanese", label: "Japanese", image: "jp" },
  { value: "korean", label: "Korean", image: "kr" },
  { value: "malaysian", label: "Malaysian", image: "my" },
  { value: "mexican", label: "Mexican", image: "mx" },
  { value: "middle-eastern", label: "Middle East", image: "middle-eastern" },
  { value: "moroccan", label: "Moroccan", image: "ma" },
  { value: "mozambican", label: "Mozambican", image: "mz" },
  { value: "peruvian", label: "Peruvian", image: "pe" },
  { value: "philippines", label: "Philippines", image: "ph" },
  { value: "polish", label: "Polish", image: "pl" },
  { value: "portuguese", label: "Portuguese", image: "pt" },
  { value: "singapore", label: "Singapore", image: "sg" },
  { value: "south-african", label: "South African", image: "za" },
  { value: "spanish", label: "Spanish", image: "es" },
  { value: "swiss", label: "Swiss", image: "ch" },
  { value: "thai", label: "Thai", image: "th" },
  { value: "uk", label: "English", image: "gb" },
  { value: "us", label: "American", image: "us" },
  { value: "venezuelan", label: "Venezuelan", image: "ve" },
  { value: "vietnamese", label: "Vietnamese", image: "vn" }
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