import React from "react";
import { Label } from "@/components/ui/label";

interface FormTextareaProps {
  label: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  className?: string;
  id?: string;
  error?: string;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  required = false,
  placeholder,
  value,
  onChange,
  rows = 3,
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
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className={`border border-gray-300 rounded-md px-3 py-2 bg-white text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${error ? "border-red-500" : ""}`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};