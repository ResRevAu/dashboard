"use client";
import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Form from "@/components/form/Form";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { ArrowRightIcon, ArrowLeftIcon } from "@/icons";
import { useRouter } from "next/navigation";
import Image from 'next/image';

export default function RegisterVenueNamePage() {
  const [venueName, setVenueName] = useState("");
  const [venueWebsite, setVenueWebsite] = useState("");
  const [venueEmail, setVenueEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [websiteError, setWebsiteError] = useState("");
  const [emailError, setEmailError] = useState("");
  const router = useRouter();

  // Real-time validation functions
  function validateName(value: string) {
    return value.trim().length > 0;
  }
  function validateWebsite(value: string) {
    if (!value.trim()) return true;
    return (
      /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/.test(value.trim()) &&
      /\./.test(value.trim()) &&
      !/^((https?:\/\/)?(www\.)?)?$/i.test(value.trim())
    );
  }
  function validateEmail(value: string) {
    if (!value.trim()) return true;
    return /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(value.trim());
  }

  // Stricter regex for website and email
  const isValidWebsite =
    venueWebsite.trim() === '' ||
    /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/.test(venueWebsite.trim()) &&
    /\./.test(venueWebsite.trim()) &&
    !/^((https?:\/\/)?(www\.)?)?$/i.test(venueWebsite.trim());

  const isValidEmail =
    venueEmail.trim() === '' ||
    /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(venueEmail.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (!venueName.trim()) {
      setNameError("Venue name is required");
      hasError = true;
    }

    if (venueWebsite && !isValidWebsite) {
      setWebsiteError("Please enter a valid website URL");
      hasError = true;
    }

    if (venueEmail && !isValidEmail) {
      setEmailError("Please enter a valid email address");
      hasError = true;
    }

    if (!hasError) {
      router.push('/venue-information/venue-address');
    }
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Register Venue Name" />
      <div className="flex justify-center items-start min-h-[60vh] mt-8">
        <div className="w-full max-w-4xl">
          <ComponentCard title="Register Venue Name" className="w-full">
            <Form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label htmlFor="venue-name">Venue Name:</Label>
                <div className="relative w-full">
                  <span
                    style={{
                      position: 'absolute',
                      left: 12,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#ccc',
                      fontSize: 16,
                      zIndex: 10,
                    }}
                  >
                    <Image
                      src="/images/icons/restaurant.svg"
                      alt="Restaurant Icon"
                      width={20}
                      height={20}
                      className="opacity-50 grayscale"
                    />
                  </span>
                  <Input
                    id="venue-name"
                    placeholder="Moo Moo Restaurant"
                    value={venueName}
                    onChange={(e) => {
                      setVenueName(e.target.value);
                      if (nameError) setNameError("");
                    }}
                    className={
                      (!validateName(venueName) && venueName)
                        ? 'border-red-500 focus:border-brand-300 ring-brand-500/20 pl-10'
                        : (validateName(venueName) && venueName)
                          ? 'border-green-500 focus:border-brand-300 ring-brand-500/20 pl-10'
                          : 'border-gray-300 focus:border-brand-300 ring-brand-500/20 pl-10'
                    }
                  />
                  {nameError && <div className="text-red-500 text-xs mt-1">{nameError}</div>}
                </div>
              </div>
              <div className="mb-4">
                <Label htmlFor="website">Website:</Label>
                <div className="relative w-full">
                  <span
                    style={{
                      position: 'absolute',
                      left: 12,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#ccc',
                      fontSize: 16,
                      zIndex: 10,
                    }}
                  >
                    <Image
                      src="/images/icons/website.svg"
                      alt="Website Icon"
                      width={20}
                      height={20}
                      className="opacity-50 grayscale"
                    />
                  </span>
                  <Input
                    id="website"
                    placeholder="https://example.com.au"
                    value={venueWebsite}
                    onChange={(e) => {
                      setVenueWebsite(e.target.value);
                      if (websiteError) setWebsiteError("");
                    }}
                    className={
                      (!validateWebsite(venueWebsite) && venueWebsite)
                        ? 'border-red-500 focus:border-brand-300 ring-brand-500/20 pl-10'
                        : (validateWebsite(venueWebsite) && venueWebsite)
                          ? 'border-green-500 focus:border-brand-300 ring-brand-500/20 pl-10'
                          : 'border-gray-300 focus:border-brand-300 ring-brand-500/20 pl-10'
                    }
                  />
                  {websiteError && <div className="text-red-500 text-xs mt-1">{websiteError}</div>}
                </div>
              </div>
              <div className="mb-4">
                <Label htmlFor="email">Email:</Label>
                <div className="relative w-full">
                  <span
                    style={{
                      position: 'absolute',
                      left: 12,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#ccc',
                      fontSize: 16,
                      zIndex: 10,
                    }}
                  >
                    <Image
                      src="/images/icons/email.svg"
                      alt="Email Icon"
                      width={20}
                      height={20}
                      className="opacity-50 grayscale"
                    />
                  </span>
                  <Input
                    id="email"
                    type="email"
                    placeholder="venue@example.com"
                    value={venueEmail}
                    onChange={(e) => {
                      setVenueEmail(e.target.value);
                      if (emailError) setEmailError("");
                    }}
                    className={
                      (!validateEmail(venueEmail) && venueEmail)
                        ? 'border-red-500 focus:border-brand-300 ring-brand-500/20 pl-10'
                        : (validateEmail(venueEmail) && venueEmail)
                          ? 'border-green-500 focus:border-brand-300 ring-brand-500/20 pl-10'
                          : 'border-gray-300 focus:border-brand-300 ring-brand-500/20 pl-10'
                    }
                  />
                  {emailError && <div className="text-red-500 text-xs mt-1">{emailError}</div>}
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  className=""
                  onClick={() => {
                    router.push('/venue-information/register-venue-name');
                  }}
                >
                  <ArrowLeftIcon />Previous
                </Button>
                <Button 
                  size="sm"
                  onClick={() => {
                    router.push('/venue-information/venue-address');
                  }}
                >
                  Save & Next<ArrowRightIcon />
                </Button>
              </div>
            </Form>
          </ComponentCard>
        </div>
      </div>
    </div>
  );
}
