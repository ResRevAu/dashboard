import Button from "@/components/ui/button/Button";
import { ArrowLeftIcon, ArrowRightIcon } from "@/icons";
import React from "react";

interface FormNavigationButtonsProps {
  onPrevious: () => void;
  nextLabel?: string;
  previousLabel?: string;
  loading?: boolean;
  disableNext?: boolean;
  disablePrevious?: boolean;
}

const FormNavigationButtons: React.FC<FormNavigationButtonsProps> = ({
  onPrevious,
  nextLabel = "Save & Continue",
  previousLabel = "Previous",
  loading = false,
  disableNext = false,
  disablePrevious = false,
}) => {
  return (
    <div className="flex justify-between mt-8">
      <Button
        variant="outline"
        size="sm"
        htmlType="button"
        onClick={onPrevious}
        disabled={disablePrevious}
      >
        <ArrowLeftIcon />
        {previousLabel}
      </Button>
      <Button
        size="sm"
        htmlType="submit"
        disabled={disableNext || loading}
      >
        {nextLabel}
        <ArrowRightIcon />
      </Button>
    </div>
  );
};

export default FormNavigationButtons; 