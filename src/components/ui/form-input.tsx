import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormInputProps {
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  id?: string;
  error?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  required = false,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  id,
  error,
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Label className="font-semibold text-sm text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-[42px] bg-white ${error ? "border-red-500" : ""}`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};