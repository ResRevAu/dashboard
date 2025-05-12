"use client";
import React, { useState } from "react";
import Image from 'next/image';

interface CountryCode {
  code: string;
  label: string;
  // short: string; // Add short code for display (e.g., AU, US, CN)
}

interface PhoneInputProps {
  countries: CountryCode[];
  placeholder?: string;
  id?: string;
  onChange?: (phoneNumber: string) => void;
  className?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  countries,
  placeholder = "+1 (555) 000-0000",
  onChange,
  className = "",
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>(countries[0]?.code || "");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value;
    setSelectedCountry(newCountry);
    if (onChange) {
      onChange(newCountry + phoneNumber);
    }
  };

  // Helper: format phone number with a space every 4 digits (e.g., 0438 111 222)
  function formatPhoneNumber(value: string) {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");
    // Group as 4-3-3 (for AU mobile), fallback to 4-4-4 for others
    if (digits.length <= 4) return digits;
    if (digits.length <= 7) return digits.slice(0, 4) + ' ' + digits.slice(4);
    return digits.slice(0, 4) + ' ' + digits.slice(4, 7) + ' ' + digits.slice(7, 10);
  }

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value;
    // Only allow digits and spaces
    raw = raw.replace(/[^\d ]/g, "");
    const formatted = formatPhoneNumber(raw);
    setPhoneNumber(formatted);
    if (onChange) {
      onChange(selectedCountry + formatted.replace(/ /g, "")); // pass E.164-like
    }
  };

  const handlePhoneNumberBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Format on blur as well
    setPhoneNumber(formatPhoneNumber(e.target.value));
  };

  return (
    <div className={`relative flex items-center h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus-within:outline-hidden focus-within:ring-3 focus-within:border-brand-300 focus-within:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 dark:placeholder:text-white/30 dark:bg-gray-900 dark:focus-within:border-brand-800 ${className}`}>
      {/* Phone Icon at the far left (use public/images/icons/phone.svg) */}
      <span className="flex items-center pr-2 text-gray-500">
        <Image
          src="/images/icons/phone.svg"
          alt="Phone Icon"
          width={28}
          height={28}
          className="opacity-80"
        />
      </span>
      {/* Country select dropdown with short code */}
      <div className="relative flex items-center">
        <select
          value={selectedCountry}
          onChange={handleCountryChange}
          className="appearance-none bg-transparent border-0 border-r border-gray-200 py-0 pl-1 pr-1 h-full text-gray-700 text-sm focus:outline-none dark:border-gray-800 dark:text-gray-400 min-w-[60px] w-[80px] text-left"
        >
          {countries.map((country) => (
            <option
              key={country.code}
              value={country.code}
              className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
            >
              {country.label}
            </option>
          ))}
        </select>
        {/* Dropdown arrow for select */}
        <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 flex items-center">
          <svg width="16" height="16" fill="none" viewBox="0 0 20 20">
            <path d="M5 8l5 5 5-5" stroke="#222E3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      {/* Country code display */}
      <span className="ml-0.5 text-gray-700 dark:text-gray-400 min-w-[36px] text-sm">{selectedCountry}</span>
      {/* User input for phone number */}
      <input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        onBlur={handlePhoneNumberBlur}
        placeholder={placeholder}
        className="border-0 bg-transparent py-0 px-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-0 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 w-full"
        style={{ height: '100%' }}
      />
    </div>
  );
};

export default PhoneInput;
