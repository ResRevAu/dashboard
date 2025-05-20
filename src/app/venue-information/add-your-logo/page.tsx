"use client";
import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Form from "@/components/form/Form";
import Button from "@/components/ui/button/Button";
import { useRouter } from "next/navigation";

export default function AddYourLogoPage() {
  const router = useRouter();

  return (
    <div>
      <PageBreadcrumb pageTitle="Add Your Logo" />
      <div className="flex justify-center items-start min-h-[60vh] mt-8">
        <div className="w-full max-w-4xl">
          <ComponentCard title="Add Your Logo" className="w-full">
            <Form onSubmit={() => {}}>
              {/* 这里可以放上传logo的内容，暂时留空 */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => router.push("/venue-information/venue-photographs")}
                >
                  Previous
                </Button>
                <Button
                  className="px-8"
                  onClick={() => router.push("/venue-information/hours-of-operation")}
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
