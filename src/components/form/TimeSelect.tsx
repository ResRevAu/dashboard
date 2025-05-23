import React from "react";
import Select, { StylesConfig } from "react-select";

export interface TimeOption {
  value: string;
  label: string;
}

interface TimeSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: TimeOption[];
  placeholder?: string;
  isDisabled?: boolean;
  inactive?: boolean;
  className?: string;
}

const TimeSelect: React.FC<TimeSelectProps> = ({ value, onChange, options, placeholder = "请选择时间", isDisabled = false, inactive = false, className = "" }) => {
  const customStyles: StylesConfig<TimeOption, false> = {
    control: (provided, state) => ({
      ...provided,
      minHeight: 44, // h-11
      fontSize: '0.875rem', // text-sm
      fontWeight: 400, // font-normal
      borderRadius: 8,
      borderColor: state.isFocused ? '#3B82F6' : '#D1D5DB',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(59,130,246,0.1)' : '',
      backgroundColor: state.isDisabled ? '#F3F4F6' : 'white',
      cursor: state.isDisabled ? 'not-allowed' : 'pointer',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9CA3AF', // text-gray-400
      fontWeight: 400, // font-normal
      fontSize: '0.875rem', // text-sm
    }),
    singleValue: (provided) => ({
      ...provided,
      color: inactive ? '#9CA3AF' : '#1F2937', // text-gray-800
      fontWeight: 400, // font-normal
      fontSize: '0.875rem', // text-sm
    }),
    option: (provided) => ({
      ...provided,
      fontSize: '0.875rem', // text-sm
      fontWeight: 400, // font-normal
      color: '#1F2937', // text-gray-800
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 20,
    }),
  };

  return (
    <div className={className}>
      <Select
        value={options.find((opt) => opt.value === value) || null}
        onChange={(opt) => onChange(opt ? opt.value : "")}
        options={options}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isClearable={false}
        styles={customStyles}
        menuPlacement="auto"
        components={{ IndicatorSeparator: () => null }}
      />
    </div>
  );
};

export default TimeSelect; 