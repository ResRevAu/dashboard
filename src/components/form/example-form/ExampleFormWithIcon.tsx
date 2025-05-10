"use client";
import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Form from "../Form";
import Input from "../input/InputField";
import {
  ArrowRightIcon,
  EnvelopeIcon,
  LockIcon,
  UserIcon,
} from "../../../icons";
import Checkbox from "../input/Checkbox";
import Label from "../Label";
import Button from "../../ui/button/Button";

export default function ExampleFormWithIcon() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:");
  };

  const [isChecked, setIsChecked] = useState(false);
  return (
    <ComponentCard title="Example Form With Icons" className="w-full max-w-2xl mx-auto">
      <Form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 w-full">
          <div className="mb-4">
            <label htmlFor="username" className="block mb-1 font-medium">Username</label>
            <div className="flex items-center relative">
              <span className="absolute left-4 text-gray-500 dark:text-gray-400 pointer-events-none">
                <UserIcon />
              </span>
              <Input
                type="text"
                placeholder="Username"
                id="username"
                className="pl-11 w-full"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium">Email Address</label>
            <div className="flex items-center relative">
              <span className="absolute left-4 text-gray-500 dark:text-gray-400 pointer-events-none">
                <EnvelopeIcon />
              </span>
              <Input
                type="text"
                placeholder="Email Address"
                id="email"
                className="pl-11 w-full"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-medium">Password</label>
            <div className="flex items-center relative">
              <span className="absolute left-4 text-gray-500 dark:text-gray-400 pointer-events-none">
                <LockIcon />
              </span>
              <Input
                type="password"
                placeholder="Password"
                id="password"
                className="pl-11 w-full"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block mb-1 font-medium">Confirm Password</label>
            <div className="flex items-center relative">
              <span className="absolute left-4 text-gray-500 dark:text-gray-400 pointer-events-none">
                <LockIcon />
              </span>
              <Input
                type="password"
                placeholder="Confirm Password"
                id="confirm-password"
                className="pl-11 w-full"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <Checkbox checked={isChecked} onChange={setIsChecked} />
              <Label className="mb-0"> Remember me</Label>
            </div>
            <div>
              <Button size="sm">
                Create Account <ArrowRightIcon />
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </ComponentCard>
  );
}
