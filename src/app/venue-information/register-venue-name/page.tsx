import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicForm from "@/components/form/example-form/BasicForm";
import ExampleFormOne from "@/components/form/example-form/ExampleFormOne";
import ExampleFormTwo from "@/components/form/example-form/ExampleFormTwo";
import ExampleFormWithIcon from "@/components/form/example-form/ExampleFormWithIcon";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function FormLayout() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Register Venue Name" />
      <div className="flex justify-center items-start min-h-[60vh] mt-8">
        <div className="w-full max-w-lg">
          <ExampleFormOne />
        </div>
      </div>
    </div>
  );
}
