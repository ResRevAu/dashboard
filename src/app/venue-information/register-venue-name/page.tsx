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
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Image from 'next/image';
import Select, { components } from "react-select";
import CountryFlag from "react-country-flag";
import dynamic from "next/dynamic";
import NoSSR from "@/components/NoSSR";
import { countries } from 'countries-list';

// Generate country options with phone codes
const countryOptions = Object.entries(countries).map(([code, country]) => ({
  value: `+${country.phone}`,
  code: code,
  label: country.name,
})).sort((a, b) => a.label.localeCompare(b.label));

const CustomOption = (props: any) => (
  <components.Option {...props}>
    <CountryFlag countryCode={props.data.code} svg style={{ width: 20, height: 20, marginRight: 8 }} />
    {props.data.label} ({props.data.value})
  </components.Option>
);
const CustomSingleValue = (props: any) => (
  <components.SingleValue {...props}>
    <CountryFlag countryCode={props.data.code} svg style={{ width: 20, height: 20, marginRight: 2 }} />
    <span style={{
      fontSize: '14px',
      color: '#374151',
      fontWeight: 400,
      letterSpacing: '0.02em',
      lineHeight: '1.5',
    }}>
      {props.data.value}
    </span>
  </components.SingleValue>
);

export default function RegisterVenueNamePage() {
  const [venueName, setVenueName] = useState("");
  const [venuePhone, setVenuePhone] = useState("");
  const [venueWebsite, setVenueWebsite] = useState("");
  const [venueEmail, setVenueEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [websiteError, setWebsiteError] = useState("");
  const [emailError, setEmailError] = useState("");
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState(countryOptions.find(country => country.code === 'AU') || countryOptions[0]);
  const [customPhone, setCustomPhone] = useState("");

  // 电话号码格式化函数，4-3-3分组（如0433 333 222）
  function formatPhoneInput(value: string) {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 4) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 10)}`;
  }

  // 实时校验函数
  function validateName(value: string) {
    return value.trim().length > 0;
  }
  function validatePhone(value: string) {
    return value.replace(/\D/g, '').length >= 8;
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

  // 更严格的网站和邮箱正则
  const isValidWebsite =
    venueWebsite.trim() === '' ||
    /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/.test(venueWebsite.trim()) &&
    /\./.test(venueWebsite.trim()) &&
    !/^((https?:\/\/)?(www\.)?)?$/i.test(venueWebsite.trim());

  const isValidEmail =
    venueEmail.trim() === '' ||
    /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(venueEmail.trim());

  // 电话校验：8位及以上纯数字
  const isValidVenuePhone = customPhone.replace(/\D/g, '').length >= 8;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (!venueName.trim()) {
      setNameError("Venue name is required");
      hasError = true;
    }

    if (!customPhone.replace(/\D/g, '')) {
      setPhoneError("Phone number is required");
      hasError = true;
    } else if (!isValidVenuePhone) {
      setPhoneError("Please enter a valid phone number (at least 8 digits)");
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
                      zIndex: 20,
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
                  <div
                    style={{
                      position: 'absolute',
                      left: 40,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 20,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ width: 44 }}>
                      <NoSSR>
                        <Select
                          options={countryOptions}
                          value={selectedCountry}
                          onChange={(option) => option && setSelectedCountry(option)}
                          isSearchable
                          classNamePrefix="country-select"
                          components={{
                            IndicatorSeparator: () => null,
                            Option: CustomOption,
                            SingleValue: CustomSingleValue,
                          }}
                          styles={{
                            control: (base) => ({
                              ...base,
                              minHeight: '32px',
                              border: 'none',
                              boxShadow: 'none',
                              background: 'transparent',
                              width: 85,
                            }),
                            menu: (base) => ({
                              ...base,
                              borderRadius: 8,
                              boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                              border: '1px solid #E5E7EB',
                              marginTop: 4,
                              zIndex: 30,
                              padding: 0,
                              background: '#fff',
                              minWidth: 180,
                              width: 370,
                            }),
                            option: (base, state) => ({
                              ...base,
                              display: 'flex',
                              alignItems: 'center',
                              fontSize: '15px',
                              color: state.isSelected ? '#2563eb' : '#374151',
                              background: state.isSelected
                                ? '#eff6ff'
                                : state.isFocused
                                ? '#f3f4f6'
                                : '#fff',
                              fontWeight: state.isSelected ? 600 : 400,
                              cursor: 'pointer',
                              padding: '8px 12px',
                              minWidth: 180,
                            }),
                            singleValue: (base) => ({
                              ...base,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 2,
                              fontSize: '16px',
                              color: '#374151',
                              fontWeight: 400,
                            }),
                            indicatorsContainer: (base) => ({ ...base, padding: 0 }),
                            valueContainer: (base) => ({ ...base, padding: 0 }),
                            menuList: (base) => ({
                              ...base,
                              padding: 0,
                              scrollbarWidth: 'auto',
                              scrollbarColor: '#d1d5db #f3f4f6',
                              '::-webkit-scrollbar': {
                                width: '10px',
                                background: '#f3f4f6',
                                borderRadius: '8px',
                              },
                              '::-webkit-scrollbar-thumb': {
                                background: '#d1d5db',
                                borderRadius: '8px',
                                minHeight: '24px',
                              },
                              '::-webkit-scrollbar-thumb:hover': {
                                background: '#9ca3af',
                              },
                              '::-webkit-scrollbar-track': {
                                background: '#f3f4f6',
                              },
                            }),
                            input: (base) => ({
                              ...base,
                              margin: 0,
                              padding: 0,
                              color: '#374151',
                              fontSize: '14px',
                            }),
                            dropdownIndicator: (base) => ({
                              ...base,
                              padding: '0 4px',
                              color: '#6B7280',
                            }),
                            clearIndicator: (base) => ({
                              ...base,
                              padding: '0 4px',
                              color: '#6B7280',
                            }),
                          }}
                        />
                      </NoSSR>
                    </div>
                  </div>
                  <Input
                    id="venue-phone"
                    placeholder="0411 222 333"
                    value={customPhone}
                    onChange={(e) => {
                      const formatted = formatPhoneInput(e.target.value);
                      setCustomPhone(formatted);
                      if (phoneError) setPhoneError("");
                    }}
                    className={
                      (!validatePhone(customPhone) && customPhone)
                        ? 'border-red-500 focus:border-brand-300 ring-brand-500/20 pl-[125px]'
                        : (validatePhone(customPhone) && customPhone)
                          ? 'border-green-500 focus:border-brand-300 ring-brand-500/20 pl-[125px]'
                          : 'border-gray-300 focus:border-brand-300 ring-brand-500/20 pl-[125px]'
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
