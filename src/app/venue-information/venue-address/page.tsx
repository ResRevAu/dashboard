"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { FaSearch, FaLocationArrow } from "react-icons/fa";
import ComponentCard from "@/components/common/ComponentCard";
import Form from "@/components/form/Form";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import Image from "next/image";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { ArrowRightIcon } from "@/icons";
import { useRouter } from "next/navigation";

const PlacesAutocompleteComponent = dynamic<any>(() => import("react-places-autocomplete"), { ssr: false });

const countries = [
  { code: "+61", label: "Australia" },
  { code: "+1", label: "USA" },
  { code: "+86", label: "China" },
];

export default function VenueAddressPage() {
  const [manual, setManual] = useState(false);
  const [address, setAddress] = useState("");
  const [useCurrent, setUseCurrent] = useState(false);
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [fields, setFields] = useState({
    streetNumber: "",
    streetName: "",
    suburb: "",
    city: "",
    state: "",
    postcode: "",
    country: "Australia",
  });
  const router = useRouter();

  // 动态加载 Google Maps 脚本
  useEffect(() => {
    if (typeof window !== "undefined") {
      // 检查是否已存在 Google Maps 脚本
      const existingScript = document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]');
      if (!existingScript && !window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDES-RSspkFObeLgRJtTcECNed63U-kM60&libraries=places`;
        script.async = true;
        script.onload = () => setMapsLoaded(true);
        document.body.appendChild(script);
      } else if (window.google) {
        setMapsLoaded(true);
      } else if (existingScript) {
        // 如果脚本已存在但 window.google 还没 ready，监听 onload
        existingScript.addEventListener('load', () => setMapsLoaded(true));
      }
    }
  }, []);

  // 获取当前位置
  const handleUseCurrentLocation = () => {
    setUseCurrent(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // 使用 Google Maps Geocoding API 获取详细地址
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDES-RSspkFObeLgRJtTcECNed63U-kM60`,
          );
          const data = await response.json();
          console.log(data);
          if (data.status === "OK" && data.results.length > 0) {
            setAddress(
              data.results[0].formatted_address ||
                data.results[0].vicinity ||
                `Lat: ${latitude}, Lng: ${longitude}`,
            );
          } else {
            setAddress(`Lat: ${latitude}, Lng: ${longitude}`);
          }
        },
        (error) => {
          alert("无法获取当前位置");
        },
      );
    }
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/venue-information/venue-address');
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Venue Address" />
      <div className="flex justify-center items-start min-h-[60vh] mt-8">
        <div className="w-full max-w-4xl">
          <ComponentCard title="Venue Address" className="w-full">
            <Form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 w-full">
                {!manual ? (
                  <div className="mb-4">
                    <Label htmlFor="address">Address:</Label>
                    <div className="relative w-full">
                      {mapsLoaded && (
                        <PlacesAutocompleteComponent
                          value={address}
                          onChange={setAddress}
                          onSelect={setAddress}
                          searchOptions={{ componentRestrictions: { country: "au" } }}
                        >
                          {({ getInputProps, suggestions, getSuggestionItemProps, loading }: { getInputProps: any; suggestions: any[]; getSuggestionItemProps: any; loading: boolean }) => (
                            <>
                              <div className="relative w-full">
                                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10">
                                  <Image src="/images/icons/location1.png" alt="Location Icon" width={26} height={26} className="opacity-50 grayscale" />
                                </span>
                                <Input
                                  {...getInputProps({
                                    placeholder: "Search address or enter manually",
                                    className: "pl-16 pr-12 bg-transparent",
                                  })}
                                />
                                <button
                                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-500"
                                  tabIndex={-1}
                                  type="button"
                                  aria-label="Use current location"
                                  onClick={handleUseCurrentLocation}
                                >
                                  <FaLocationArrow />
                                </button>
                              </div>
                              {(loading || suggestions.length > 0) && (
                                <div className="bg-white border border-gray-200 rounded-lg mt-1 shadow z-10">
                                  {loading && <div className="p-2 text-gray-400">Loading...</div>}
                                  {suggestions.map((suggestion: any) => (
                                    <div
                                      {...getSuggestionItemProps(suggestion, {
                                        className: "p-2 cursor-pointer hover:bg-gray-100" + (suggestion.active ? " bg-gray-100" : ""),
                                      })}
                                      key={suggestion.placeId}
                                    >
                                      {suggestion.description}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </>
                          )}
                        </PlacesAutocompleteComponent>
                      )}
                    </div>
                    <div className="flex items-center mt-2">
                      <input
                        type="radio"
                        checked={useCurrent}
                        onChange={handleUseCurrentLocation}
                        className="mr-2"
                      />
                      <span className="font-medium text-sm text-gray-700 dark:text-gray-400">Use Current Location</span>
                    </div>
                    <div className="text-gray-500 text-sm mt-2">
                      If the address can't be found,{' '}
                      <button
                        className="text-brand-600 underline"
                        onClick={() => setManual(true)}
                        type="button"
                      >
                        enter it manually
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="streetNumber">Street Number</Label>
                        <Input
                          name="streetNumber"
                          placeholder="123"
                          value={fields.streetNumber}
                          onChange={handleFieldChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="streetName">Street Name</Label>
                        <Input
                          name="streetName"
                          placeholder="Main St"
                          value={fields.streetName}
                          onChange={handleFieldChange}
                        />
                      </div>
                    </div>
                    <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="suburb">Suburb</Label>
                        <Input
                          name="suburb"
                          placeholder="Robina"
                          value={fields.suburb}
                          onChange={handleFieldChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          name="city"
                          placeholder="Gold Coast"
                          value={fields.city}
                          onChange={handleFieldChange}
                        />
                      </div>
                    </div>
                    <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          name="state"
                          placeholder="QLD"
                          value={fields.state}
                          onChange={handleFieldChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="postcode">Postcode</Label>
                        <Input
                          name="postcode"
                          placeholder="4227"
                          value={fields.postcode}
                          onChange={handleFieldChange}
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        name="country"
                        placeholder="Australia"
                        value={fields.country}
                        onChange={handleFieldChange}
                      />
                    </div>
                    <div className="flex justify-between mt-4">
                      <Button
                        htmlType="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setManual(false)}
                      >
                        Back to search
                      </Button>
                      <Button htmlType="submit" size="sm">
                        Save Address
                      </Button>
                    </div>
                  </>
                )}
              </div>
              {manual ? (
                <div className="flex justify-between mt-4">
                
                 
                </div>
              ) : (
                <div className="flex justify-between mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      window.history.length > 1 ? window.history.back() : window.location.href = "/venue-information/register-venue-name";
                    }}
                  >
                    Previous Page
                  </Button>
                  <Button size="sm">
                    Save & Next<ArrowRightIcon />
                  </Button>
                </div>
              )}
            </Form>
          </ComponentCard>
        </div>
      </div>
    </div>
  );
}
