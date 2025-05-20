"use client";
import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Form from "@/components/form/Form";
import Button from "@/components/ui/button/Button";
import { useRouter } from "next/navigation";
import VenueTypeCard from "@/components/cards/VenueTypeCard";

const venueTypes = [
  { value: "family-restaurant", label: "Family Restaurant", image: "family-restaurant" },
  { value: "fine-dining", label: "Fine Dining", image: "fine-dining" },
  { value: "casual-dining", label: "Casual Dining", image: "casual-dining" },
  { value: "fast-food", label: "Fast Food", image: "fast-food" },
  { value: "cafe", label: "Café / Coffee Shop", image: "cafe" },
  { value: "buffet", label: "Buffet", image: "buffet" },
  { value: "food-truck", label: "Food Truck", image: "food-truck" },
  { value: "steakhouse", label: "Steakhouse", image: "steakhouse" },
  { value: "seafood-restaurant", label: "Seafood Restaurant", image: "seafood-restaurant" },
  { value: "healthy-vegan-vegetarian", label: "Healthy / Vegan / Vegetarian", image: "healthy-vegan-vegetarian" },
  { value: "dessert-bar", label: "Dessert Bar", image: "dessert-bar" },
  { value: "breakfast-brunch", label: "Breakfast / Brunch", image: "breakfast-brunch" },
  { value: "tapas-small-plates", label: "Tapas / Small Plates", image: "tapas-small-plates" },
  { value: "bar-grill-hotel-pub-gastropub", label: "Bar & Grill / Hotel/Pub/Gastropub", image: "bar-grill-hotel-pub-gastropub" },
  { value: "surf-club-rsl-clubs", label: "Surf Club / RSL / Clubs", image: "surf-club-rsl-clubs" },
];

export default function VenueTypePage() {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  const toggleVenueType = (value: string) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Venue Type" />
      <div className="flex justify-center items-start min-h-[60vh] mt-8">
        <div className="w-full max-w-4xl">
          <ComponentCard title="Venue Type" className="w-full">
            <Form onSubmit={() => {}}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {venueTypes.map((venue) => (
                  <VenueTypeCard
                    key={venue.value}
                    image={venue.image}
                    title={venue.label}
                    selected={selected.includes(venue.value)}
                    onSelect={() => toggleVenueType(venue.value)}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => router.push("/venue-information/venue-address")}
                >
                  Previous
                </Button>
                <Button
                  className="px-8"
                  onClick={() => router.push("/venue-information/cuisine-style")}
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