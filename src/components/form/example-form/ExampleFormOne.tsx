"use client";
import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Form from "../Form";
import Label from "../Label";
import Input from "../input/InputField";
import Button from "../../ui/button/Button";
import { ArrowRightIcon } from "../../../icons";
import Image from 'next/image';
import PhoneInput from "../group-input/PhoneInput";
import { useRouter } from "next/navigation";

export default function ExampleFormOne() {
  const [venueName, setVenueName] = useState("");
  const [venuePhone, setVenuePhone] = useState<string>("+61");
  const [phoneError, setPhoneError] = useState<string>("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  // Country/area code list
  // Add more as needed
  const countries = [
    { code: "+61", label: "Australia" },
    { code: "+1", label: "USA" },
    { code: "+86", label: "China" },
    // 可按需添加更多
  ];

  // Validation function
  const isValidVenueName = venueName.trim().length > 0;
  const isValidVenuePhone = venuePhone.replace(/\D/g, "").length >= 8;
  const isValidWebsite = /^https?:\/\/.+\..+/.test(website.trim()) || website.trim().length === 0;
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || email.trim().length === 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!venuePhone || venuePhone.length <8) {
      setPhoneError("Please enter a valid phone number");
      return;
    }
    setPhoneError("");
    router.push("/venue-information/venue-address");
  };
  return (
    <ComponentCard title="Register Venue Name" className="w-full">
      <Form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 w-full">
          <div className="mb-4">
            <Label htmlFor="venue-name">Venue Name :</Label>
            <div className="relative w-full">
              <span
                style={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#ccc',
                  fontSize: 16,
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
                type="text"
                placeholder="Enter Venue Name"
                id="venue-name"
                className={`w-full pl-10 ${
                  venueName.trim().length > 0
                    ? (isValidVenueName
                        ? 'border-green-500 focus:border-green-600 ring-green-200 focus:ring-green-300'
                        : 'border-red-500 focus:border-red-600 ring-red-200 focus:ring-red-300')
                    : ''
                }`}
                value={venueName}
                onChange={e => setVenueName(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <Label htmlFor="venue-phone">Venue Phone:</Label>
            <div className="relative w-full">
              <PhoneInput
                countries={countries}
                placeholder="0438 111 222"
                id="venue-phone"
                onChange={value => {
                  setVenuePhone(value);
                  if (phoneError) setPhoneError("");
                }}
                className={
                  venuePhone.replace(/\D/g, "").length > countries[0].code.replace(/\D/g, "").length
                    ? (isValidVenuePhone
                        ? 'border-green-500 focus:border-green-600 ring-green-200 focus:ring-green-300'
                        : 'border-red-500 focus:border-red-600 ring-red-200 focus:ring-red-300')
                    : 'border-gray-300 focus:border-brand-300 ring-brand-500/20'
                }
              />
              {phoneError && <div className="text-red-500 text-xs mt-1">{phoneError}</div>}
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
                type="text"
                placeholder="Enter Website Address"
                id="website"
                className={`w-full pl-10 ${
                  website.trim().length > 0
                    ? (isValidWebsite
                        ? 'border-green-500 focus:border-green-600 ring-green-200 focus:ring-green-300'
                        : 'border-red-500 focus:border-red-600 ring-red-200 focus:ring-red-300')
                    : ''
                }`}
                value={website}
                onChange={e => setWebsite(e.target.value)}
              />
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
                }}
              >
                <Image
                  src="/images/icons/email.svg"
                  alt="Email Icon"
                  width={20}
                  height={20}
                  className="opacity-80 grayscale"
                />
              </span>
              <Input
                type="text"
                placeholder="Enter Venue Email"
                id="email"
                className={`w-full pl-10 ${
                  email.trim().length > 0
                    ? (isValidEmail
                        ? 'border-green-500 focus:border-green-600 ring-green-200 focus:ring-green-300'
                        : 'border-red-500 focus:border-red-600 ring-red-200 focus:ring-red-300')
                    : ''
                }`}
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button size="sm" htmlType="submit">
              Save & Next<ArrowRightIcon />
            </Button>
          </div>
        </div>
      </Form>
    </ComponentCard>
  );
}
