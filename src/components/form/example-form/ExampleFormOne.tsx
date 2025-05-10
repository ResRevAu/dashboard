"use client";
import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Form from "../Form";
import Label from "../Label";
import Input from "../input/InputField";
import Button from "../../ui/button/Button";
import { ArrowRightIcon } from "../../../icons";
import Image from 'next/image';

export default function ExampleFormOne() {
  const [venueName, setVenueName] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:");
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
                className={`w-full pl-10 ${venueName ? 'border-green-500 focus:border-green-600 ring-green-200 focus:ring-green-300' : ''}`}
                value={venueName}
                onChange={e => setVenueName(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <Label htmlFor="venue-phone">Venue Phone:</Label>
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
                  src="/images/icons/phone.svg"
                  alt="Phone Icon"
                  width={20}
                  height={20}
                  className="opacity-50 grayscale"
                />
              </span>
              <Input
                type="text"
                placeholder="+61 (0438 111 222)"
                id="venue-phone"
                className="w-full pl-10"
              />
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
                className="w-full pl-10"
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
                className="w-full pl-10"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button size="sm">
              Save & Next<ArrowRightIcon />
            </Button>
          </div>
        </div>
      </Form>
    </ComponentCard>
  );
}
