import React from "react";
import { Label } from "@/components/ui/label";

interface FormFileSimpleProps {
  label: string;
  required?: boolean;
  accept?: string;
  value: File | null;
  onChange: (file: File | null) => void;
  className?: string;
}

export const FormFileSimple: React.FC<FormFileSimpleProps> = ({
  label,
  required = false,
  accept,
  value,
  onChange,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Label className="font-semibold text-sm text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <div className="flex items-center gap-0">
        <input
          type="file"
          onChange={(e) => onChange(e.target.files?.[0] || null)}
          accept={accept}
          className="hidden"
          id={`upload-${label.toLowerCase().replace(/\s+/g, '-')}`}
        />
        <label
          htmlFor={`upload-${label.toLowerCase().replace(/\s+/g, '-')}`}
          className="border border-gray-300 p-2 rounded-l-md bg-gray-100 text-sm text-gray-700 cursor-pointer whitespace-nowrap hover:bg-gray-200 transition-colors"
        >
          Pilih File
        </label>
        <div className="border border-gray-300 p-2 rounded-r-md w-full text-sm text-gray-400 truncate bg-white">
          {value ? value.name : "Tidak ada file yang dipilih"}
        </div>
      </div>
    </div>
  );
};